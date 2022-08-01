from flask import jsonify
from marshmallow import ValidationError
from sqlalchemy.exc import OperationalError
from app.models.seller import Seller

from app import db
from app.assets.api_dataclasses import LotRequestOptions, LotItemRequestOptions
from app.assets.api_errors import DatabaseConnectionError, BadJSONError, LotNotExistsError
from app.models.batch import Batch
from app.models.bt_product import BtProduct
from app.models.weighting import Weighting
from app.schemas.lot import LotItemHeaderSchema, LotItemRequestSchema, LotItemRowSchema, LotRequestSchema, LotRowSchema
from app.models.lot import Lot
from app.models.product import Product
from app.models.manufacturer_lot import ManufacturerLot
from app.models.plant import Plant
from app.models.trademark import Trademark
from app.models.manufacturer import Manufacturer


class LotRepository:

    request_schema = LotRequestSchema()
    rows_schema = LotRowSchema()
    request_item_schema = LotItemRequestSchema()
    header_item_schema = LotItemHeaderSchema()
    rows_item_schema = LotItemRowSchema()

    def __load_request_data(self, data: dict) -> LotRequestOptions:
        try:
            req_options = self.request_item_schema.load(data)
            return req_options
        except ValidationError:
            raise BadJSONError

    def __lot_query(self):
        lot_qry = db.session.query(
            Lot.LotPK.label('lot_id'),
            Lot.LotName.label('lot_name'),
            Lot.lot_date.label('lot_date'),
            Lot.ProductId.label('product_id'),
            Product.ProductName.label('product_name'),
            Lot.TradeMarkPK.label('trademark_id'),
            Trademark.TrademarkName.label('trademark_name'),
            Lot.SellerPK.label('seller_id'),
            Seller.SellerName.label('seller_name'),
            Lot.ManufacturerPK.label('manufacturer_id'),
            Manufacturer.ManufacturerName.label('manufacturer_name'),
            Lot.ManufacturerLotPK.label('manufacturer_lot_id'),
            ManufacturerLot.ManufacturerLotName.label('manufacturer_lot_name'),
        ).join(
            Product, Product.ProductId == Lot.ProductId
        ).join(
            Trademark, Trademark.TrademarkPK == Lot.TradeMarkPK
        ).join(
            Seller, Seller.SellerPK == Lot.SellerPK
        ).join(
            Manufacturer, Manufacturer.ManufacturerPK == Lot.ManufacturerPK
        ).join(
            ManufacturerLot,
            ManufacturerLot.ManufacturerLotPK == Lot.ManufacturerLotPK
        ).order_by(Product.ProductName, Lot.lot_date)
        return lot_qry

    def __total(self) -> int:
        qry = self.__lot_query()
        total = qry.count()
        return total

    def __get_lot_rows(self, options: LotRequestOptions):
        qry = self.__lot_query()
        offset = options.page*options.limit
        data = qry.offset(offset).limit(options.limit)
        rows = self.rows_schema.dump(data, many=True)        
        return rows

    def get_lots(self, data: dict):
        req_options = self.__load_request_data(data)
        rows = self.__get_lot_rows(req_options)
        total = self.__total()
        response = {'rows': rows, 'total': total}
        return (jsonify(response))

    def __load_item_request_data(self, data: dict) -> LotItemRequestOptions:
        try:
            req_options = self.request_item_schema.load(data)
            return req_options
        except ValidationError:
            raise BadJSONError

    def __item_header_data(self, id: int):
        lot = db.session.query(
            Lot.LotName.label('lot_name'),
            Product.ProductId.label('product_id'),
            Product.ProductName.label('product_name'),
            Trademark.TrademarkPK.label('trademark_id'),
            Trademark.TrademarkName.label('trademark_name'),
            ManufacturerLot.ManufacturerLotPK.label('manufacturer_lot_id'),
            ManufacturerLot.ManufacturerLotName.label('manufacturer_lot_name'),
        ).join(
            Product, Lot.ProductId == Product.ProductId, isouter=True
        ).join(
            Trademark, Lot.TradeMarkPK == Trademark.TrademarkPK, isouter=True
        ).join(
            ManufacturerLot,
            Lot.ManufacturerLotPK == ManufacturerLot.ManufacturerLotPK,
            isouter=True
        ).filter(
            Lot.LotPK == id
        ).one_or_none()
        return lot

    def __item_header(self, id: int):
        lot = self.__item_header_data(id)
        if lot is None:
            raise LotNotExistsError
        header = self.header_item_schema.dump(lot)
        return header

    def __lot_item_subquery(self, id: int):
        lot_sbqry = db.session.query(
            Weighting.WeightingsPK.label('weightink_pk'),
            Batch.BatchPK.label('batch_id'),
            Batch.BatchName.label('batch_name'),
            Batch.BatchPK.label('batch_pk'),
            Batch.BatchDate.label('batch_date'),
            Batch.batch_year.label('year'),
            Batch.batch_month.label('month'),
            Batch.batch_number.label('number'),
            Plant.PlantName.label('plant'),
            Lot.LotName.label('lot_name'),
            Product.ProductMarking.label('product_name')
        ).join(
            Batch, Weighting.BatchPK == Batch.BatchPK, isouter=True
        ).join(
            Plant, Plant.PlantAlias == Batch.plant_letter, isouter=True
        ).join(
            Lot, Weighting.LotPK == Lot.LotPK, isouter=True
        ).join(
            BtProduct, Batch.BatchPK == BtProduct.BatchPK, isouter=True
        ).join(
            Product, BtProduct.ProductId == Product.ProductId, isouter=True
        ).filter(
            Lot.LotPK == id
        ).subquery()
        return lot_sbqry

    def __lot_item_query(self, id: int):
        lot_sbqry = self.__lot_item_subquery(id)
        lot_qry = db.session.query(
            lot_sbqry.c.batch_name.label('boil_name'),
            lot_sbqry.c.batch_id.label('boil_id'),
            lot_sbqry.c.batch_date.label('date'),
            lot_sbqry.c.product_name.label('product_name'),
            lot_sbqry.c.year.label('year'),
            lot_sbqry.c.month.label('month'),
            lot_sbqry.c.number.label('number'),
            lot_sbqry.c.plant.label('plant'),
        ).distinct(
            lot_sbqry.c.batch_name
        ).order_by(
            lot_sbqry.c.year,
            lot_sbqry.c.month,
            lot_sbqry.c.number
        )
        return lot_qry

    def __item_total(self, id) -> int:
        qry = self.__lot_item_query(id)
        total = qry.count()
        return total

    def __get_lot_item_rows(self, id, options: LotItemRequestOptions):
        qry = self.__lot_item_query(id)
        offset = options.page*options.limit
        data = qry.offset(offset).limit(options.limit)
        rows = self.rows_item_schema.dump(data, many=True)
        return rows

    def get_lot_item(self, id: int, data: dict):
        try:
            req_options = self.__load_item_request_data(data)
            header = self.__item_header(id)
            rows = self.__get_lot_item_rows(id, req_options)
            total = self.__item_total(id)
            response = {'header': header, 'rows': rows, 'total': total}
            return jsonify(response)
        except OperationalError:
            raise DatabaseConnectionError
