from typing import List
from flask import jsonify
from marshmallow import ValidationError
from sqlalchemy.exc import OperationalError


from app import db
from app.assets.api_dataclasses import ProductRequestOptions
from app.assets.api_errors import DatabaseConnectionError, BadJSONError
from app.schemas.product import ProductRequestSchema, ProductRowSchema
from app.models.product import Product


class ProductRepository:

    request_schema = ProductRequestSchema()
    rows_schema = ProductRowSchema()

    def __init__(self) -> None:
        self.filters: List[str] = []

    def __load_request_options(self, data: dict) -> ProductRequestOptions:
        try:
            req_options = self.request_schema.load(data)
            return req_options
        except ValidationError:
            raise BadJSONError
        except TypeError:
            raise BadJSONError

    def __query(self):
        product_qry = db.session.query(
            Product.ProductId.label('product_id'),
            Product.ProductName.label('product_name')
        ).filter(
            Product.ProductName.is_not(None)
        ).filter(
            *self.filters
        ).order_by(
            Product.ProductName
        )
        return product_qry

    def __process_filters(self, options) -> None:
        self.filters = []
        filter = options.filter
        if filter.product_id:
            self.filters.append(
                Product.ProductId.like(f"%{filter.product_id}%"))
        if filter.product_name:
            self.filters.append(Product.ProductName.like(
                f"%{filter.product_name}%"))

    def __rows(self, query, options):
        offset = options.page*options.limit
        data = query.offset(offset).limit(options.limit)
        rows = self.rows_schema.dump(data, many=True)
        return rows

    def get_products(self, data: dict):
        try:
            req_options = self.__load_request_options(data)
            self.__process_filters(req_options)
            query = self.__query()
            rows = self.__rows(query, req_options)
            total = query.count()
            response = {'rows': rows, 'total': total}
            return jsonify(response)
        except OperationalError:
            raise DatabaseConnectionError    
