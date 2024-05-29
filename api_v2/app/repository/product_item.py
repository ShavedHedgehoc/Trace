from typing import List
from flask import jsonify
from marshmallow import ValidationError
from sqlalchemy.exc import OperationalError

from app import db
from app.assets.api_dataclasses import ProductItemRequestOptions
from app.assets.api_errors import DatabaseConnectionError, BadJSONError, ProductNotExistsError
from app.schemas.product import ProductItemHeaderSchema, ProductItemRequestSchema, ProductItemRowSchema
from app.models.lot import Lot
from app.models.manufacturer import Manufacturer
from app.models.manufacturer_lot import ManufacturerLot
from app.models.seller import Seller
from app.models.trademark import Trademark
from app.models.product import Product


class ProductItemRepository:

    request_schema = ProductItemRequestSchema()
    header_schema = ProductItemHeaderSchema()
    rows_schema = ProductItemRowSchema()

    def __init__(self) -> None:
        self.filters: List[str] = []

    def __load_request_options(self, data: dict) -> ProductItemRequestOptions:
        try:
            req_options = self.request_schema.load(data)
            return req_options
        except ValidationError:
            raise BadJSONError
        except TypeError:
            raise BadJSONError

    def __process_filters(self, id: str, options: ProductItemRequestOptions) -> None:
        self.filters = []
        filter = options.filter
        self.filters.append(Lot.ProductId == id)
        if filter.lot_name:
            self.filters.append(Lot.LotName.like(f"%{filter.lot_name}%"))
        if filter.seller_name:
            self.filters.append(Seller.SellerName.like(
                f"%{filter.seller_name}%"))
        if filter.manufacturer_name:
            self.filters.append(Manufacturer.ManufacturerName.like(
                f"%{filter.manufacturer_name}%"))
        if filter.manufacturer_lot_name:
            self.filters.append(
                ManufacturerLot.ManufacturerLotName.like(f"%{filter.manufacturer_lot_name}%"))
        if filter.trademark_name:
            self.filters.append(Trademark.TrademarkName.like(
                f"%{filter.trademark_name}%"))

    def __header_data(self, id: str):
        product = db.session.query(
            Product.ProductId.label('product_id'),
            Product.ProductName.label('product_name')
        ).filter(
            Product.ProductId == id
        ).one_or_none()
        return product

    def __header(self, id: str):
        product = self.__header_data(id)
        if product is None:
            raise ProductNotExistsError
        header = self.header_schema.dump(product)
        return header

    def __query(self):
        product_qry = db.session.query(
            Lot.LotPK.label('lot_id'),
            Lot.LotName.label('lot_name'),
            Lot.lot_date.label('lot_date'),
            Lot.SellerPK.label('seller_id'),
            Seller.SellerName.label('seller_name'),
            Lot.ManufacturerPK.label('manufacturer_id'),
            Manufacturer.ManufacturerName.label('manufacturer_name'),
            Lot.ManufacturerLotPK.label('manufacturer_lot_id'),
            ManufacturerLot.ManufacturerLotName.label('manufacturer_lot_name'),
            Lot.TradeMarkPK.label('trademark_id'),
            Trademark.TrademarkName.label('trademark_name')
        ).join(
            Seller, Seller.SellerPK == Lot.SellerPK,
            isouter=True
        ).join(
            Manufacturer, Manufacturer.ManufacturerPK == Lot.ManufacturerPK,
            isouter=True
        ).join(
            ManufacturerLot,
            ManufacturerLot.ManufacturerLotPK == Lot.ManufacturerLotPK,
            isouter=True
        ).join(
            Trademark, Trademark.TrademarkPK == Lot.TradeMarkPK,
            isouter=True
        ).filter(
            *self.filters
        ).order_by(
            Lot.lot_date
        )
        return product_qry

    def __get_rows(self, query, options):
        offset = options.page*options.limit
        data = query.offset(offset).limit(options.limit)
        rows = self.rows_schema.dump(data, many=True)
        return rows

    def get_product_item(self, id: str, data: dict):
        try:
            req_options = self.__load_request_options(data)
            self.__process_filters(id, req_options)
            query = self.__query()
            header = self.__header(id)
            rows = self.__get_rows(query, req_options)
            total = query.count()
            response = {'header': header, 'rows': rows, 'total': total}
            return jsonify(response)
        except OperationalError:
            raise DatabaseConnectionError
