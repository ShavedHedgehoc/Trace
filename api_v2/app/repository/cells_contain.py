from typing import List
from flask import jsonify
from marshmallow import ValidationError
from sqlalchemy.exc import OperationalError


from app import db
from app.assets.api_errors import DatabaseConnectionError, BadJSONError
from app.assets.api_dataclasses import CellsContainRequestOptions
from app.schemas.cells_contain import CellsContainRequestSchema, CellsContainRowSchema
from app.models.cell import Cell
from app.models.cells_contain import CellsContain
from app.models.product import Product
from app.models.lot import Lot


class CellsContainRepository:

    request_schema = CellsContainRequestSchema()
    rows_schema = CellsContainRowSchema()

    def __init__(self) -> None:
        self.filters: List[str] = []
        self.orders: List[str] = []

    def __load_request_options(self, data: dict) -> CellsContainRequestOptions:
        req_options = self.request_schema.load(data)
        return req_options

    def __query(self):
        query = db.session.query(
            CellsContain.CellContainPK.label('id'),
            CellsContain.CellPK.label('cell_id'),
            Cell.CellName.label('cell_name'),
            CellsContain.ProductId.label('product_id'),
            Product.ProductName.label('product_name'),
            CellsContain.LotId.label('lot_id'),
            Lot.LotName.label('lot_name'),
            CellsContain.Expire.label('exp')
        ).join(
            Cell, Cell.CellPK == CellsContain.CellPK
        ).join(
            Product, Product.ProductId == CellsContain.ProductId
        ).join(
            Lot, Lot.LotPK == CellsContain.LotId
        ).filter(
            *self.filters
        )  .order_by(
            *self.orders
        )
        return query

    def __process_filters(self, options) -> None:
        # self.filters = []
        self.orders = []
        # self.orders.append(Cell.CellName)
        # self.orders.append(Product.ProductId)
        self.orders.append(Product.ProductName)
        pass
    def __process_orders(self, options) -> None:
        pass

    def __rows(self, query, options):
        offset = options.page*options.limit
        data = query.offset(offset).limit(options.limit)
        # data = query.all()
        rows = self.rows_schema.dump(data, many=True)
        return rows

    def get_cell_contains(self, data: dict):
        try:
            req_options = self.__load_request_options(data)
            self.__process_filters(req_options)
            self.__process_orders(req_options)
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
