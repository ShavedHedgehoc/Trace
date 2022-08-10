from typing import List
from flask import jsonify
from marshmallow import ValidationError
from sqlalchemy.exc import OperationalError

from app import db
from app.assets.api_dataclasses import TrademarkRequestOptions
from app.assets.api_errors import DatabaseConnectionError, BadJSONError
from app.schemas.trademark import TrademarkRequestSchema, TrademarkRowSchema
from app.models.lot import Lot
from app.models.trademark import Trademark
from app.models.product import Product


class TrademarkRepository:
    request_schema = TrademarkRequestSchema()
    rows_schema = TrademarkRowSchema()

    def __init__(self) -> None:
        self.filters: List[str] = []

    def __request_data(self, data: dict) -> TrademarkRequestOptions:
        req_options = self.request_schema.load(data)
        return req_options

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

    def __query(self):
        trademark_qry = db.session.query(
            Trademark.TrademarkName.label('trademark_name'),
            Trademark.TrademarkPK.label('trademark_id'),
            Lot.ProductId.label('product_id'),
            Product.ProductName.label('product_name')
        ).join(
            Lot, Lot.TradeMarkPK == Trademark.TrademarkPK
        ).join(
            Product, Product.ProductId == Lot.ProductId
        ).filter(
            *self.filters
        ).distinct(
            Trademark.TrademarkName
        ).order_by(
            Trademark.TrademarkName
        )        
        return trademark_qry

    def __rows(self, query, options: TrademarkRequestOptions):
        offset = options.page * options.limit
        data = query.offset(offset).limit(options.limit)
        rows = self.rows_schema.dump(data, many=True)
        return rows

    def get_trademarks(self, data: dict):
        try:
            req_options = self.__request_data(data)
            self.__process_filters(req_options)
            query = self.__query()
            rows = self.__rows(query, req_options)
            total = query.count()
            response = {'rows': rows, 'total': total}
            return jsonify(response)
        except OperationalError:
            raise DatabaseConnectionError
        except ValidationError:
            raise BadJSONError
        except TypeError:
            raise BadJSONError
