from typing import List
from flask import jsonify
from marshmallow import ValidationError
from sqlalchemy.exc import OperationalError


from app import db
from app.assets.api_dataclasses import TrademarkItemRequestOptions, TrademarkRequestOptions
from app.assets.api_errors import DatabaseConnectionError, BadJSONError, TrademarkNotExistsError
from app.schemas.trademark import TrademarkItemRequestSchema, TrademarkRequestSchema, TrademarkRowSchema, TrademarkItemRowSchema, TrademarkItemHeaderSchema
from app.models.batch import Batch
from app.models.bt_product import BtProduct
from app.models.weighting import Weighting
from app.models.lot import Lot
from app.models.trademark import Trademark
from app.models.product import Product
from app.models.plant import Plant


class TrademarkRepository:

    request_schema = TrademarkRequestSchema()
    rows_schema = TrademarkRowSchema()
    request_item_schema = TrademarkItemRequestSchema()
    rows_item_schema = TrademarkItemRowSchema()
    header_item_schema = TrademarkItemHeaderSchema()

    def __init__(self) -> None:
        self.filters: List[str] = []

    def __load_request_options(self, data: dict) -> TrademarkRequestOptions:
        try:
            req_options = self.request_schema.load(data)
            return req_options
        except ValidationError:
            raise BadJSONError
        except TypeError:
            raise BadJSONError

    def __process_filters(self, options: TrademarkRequestOptions) -> None:
        self.filters = []
        filter = options.filter
        if filter.trademark_name:
            self.filters.append(Trademark.TrademarkName.like(
                f"%{filter.trademark_name}%"))
        if filter.product_id:
            self.filters.append(
                Product.ProductId.like(f"%{filter.product_id}%"))
        if filter.product_name:
            self.filters.append(Product.ProductName.like(
                f"%{filter.product_name}%"))

    def __lot_subquery(self):
        lot_sbqry = db.session.query(
            Lot.ProductId.label('product_id'),
            Lot.TradeMarkPK.label('trademark_id')
        ).group_by(
            Lot.ProductId,
            Lot.TradeMarkPK,
        ).subquery()
        return lot_sbqry

    def __query(self):
        lot_sbqry = self.__lot_subquery()
        trademark_qry = db.session.query(
            lot_sbqry.c.product_id.label('product_id'),
            lot_sbqry.c.trademark_id.label('trademark_id'),
            Trademark.TrademarkName.label('trademark_name'),
            Product.ProductName.label('product_name')
        ).join(
            Trademark, Trademark.TrademarkPK == lot_sbqry.c.trademark_id
        ).join(
            Product, Product.ProductId == lot_sbqry.c.product_id
        ).filter(
            *self.filters
        ).order_by(
            Trademark.TrademarkName
        )
        return trademark_qry

    def __get_rows(self, query, options: TrademarkRequestOptions):
        offset = options.page * options.limit
        data = query.offset(offset).limit(options.limit)
        rows = self.rows_schema.dump(data, many=True)
        return rows

    def __total(self, query) -> int:
        total = query.count()
        return total

    def get_trademarks(self, data: dict):
        try:
            req_options = self.__load_request_options(data)
            self.__process_filters(req_options)
            query = self.__query()
            rows = self.__get_rows(query, req_options)
            total = self.__total(query)
            response = {'rows': rows, 'total': total}
            return jsonify(response)
        except OperationalError:
            raise DatabaseConnectionError

    def __load_item_request_options(self, data: dict) -> TrademarkItemRequestOptions:
        try:
            req_options = self.request_item_schema.load(data)
            return req_options
        except ValidationError:
            raise BadJSONError
        except TypeError:
            raise BadJSONError

    def __trademark_item_sbqry(self, id: int):
        trademark_sbqry = db.session.query(
            Weighting.WeightingsPK.label('weightink_pk'),
            Batch.BatchName.label('batch_name'),
            Batch.BatchPK.label('batch_id'),
            Batch.BatchDate.label('batch_date'),
            Plant.PlantName.label('plant'),
            Batch.batch_year.label('year'),
            Batch.batch_month.label('month'),
            Batch.batch_number.label('number'),
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
        ).join(
            Trademark, Lot.TradeMarkPK == Trademark.TrademarkPK, isouter=True
        ).filter(
            Trademark.TrademarkPK == id
        ).subquery()
        return trademark_sbqry

    def __item_query(self, id: int):
        trademark_sbqry = self.__trademark_item_sbqry(id)
        trademark_qry = db.session.query(
            trademark_sbqry.c.batch_name.label('boil_name'),
            trademark_sbqry.c.batch_id.label('boil_id'),
            trademark_sbqry.c.batch_date.label('date'),
            trademark_sbqry.c.product_name.label('product_name'),
            trademark_sbqry.c.plant.label('plant'),
            trademark_sbqry.c.year.label('year'),
            trademark_sbqry.c.month.label('month'),
            trademark_sbqry.c.number.label('number')
        ).distinct(
            trademark_sbqry.c.batch_name
        ).order_by(
            trademark_sbqry.c.year,
            trademark_sbqry.c.month,
            trademark_sbqry.c.number
        )
        return trademark_qry

    def __item_header_data(self, id: int):
        lot_sbqry = self.__lot_subquery()
        trademark = db.session.query(
            lot_sbqry.c.product_id.label('product_id'),
            lot_sbqry.c.trademark_id.label('trademark_id'),
            Trademark.TrademarkName.label('trademark_name'),
            Product.ProductName.label('product_name'),
            Product.ProductId.label('product_id'),
        ).join(
            Trademark, Trademark.TrademarkPK == lot_sbqry.c.trademark_id
        ).join(
            Product, Product.ProductId == lot_sbqry.c.product_id
        ).filter(
            Trademark.TrademarkPK == id
        ).one_or_none()
        return trademark

    def __item_header(self, id: int):
        trademark = self.__item_header_data(id)
        if trademark is None:
            raise TrademarkNotExistsError
        header = self.header_item_schema.dump(trademark)
        return header

    def __item_rows(self, query, options: TrademarkItemRequestOptions):
        offset = options.page*options.limit
        data = query.offset(offset).limit(options.limit)
        rows = self.rows_item_schema.dump(data, many=True)
        return rows

    def get_trademark_item(self, id: int, data: dict):
        try:
            req_options = self.__load_item_request_options(data)
            query = self.__item_query(id)
            header = self.__item_header(id)
            rows = self.__item_rows(query, req_options)
            total = query.count()
            response = {'rows': rows, 'header': header, 'total': total}
            return jsonify(response)
        except OperationalError:
            raise DatabaseConnectionError
