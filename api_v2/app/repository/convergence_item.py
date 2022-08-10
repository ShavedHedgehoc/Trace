from typing import Optional
from flask import jsonify
from flask_sqlalchemy import BaseQuery
from marshmallow import ValidationError

from sqlalchemy import case, func, or_
from sqlalchemy.exc import OperationalError


from app import db
from app.models.batch import Batch
from app.models.boil import Boil
from app.models.product import Product
from app.models.weighting import Weighting
from app.assets.api_dataclasses import ConvergenceItemRequestOptions
from app.schemas.convergence import ConvergenceItemRequestSchema, ConvergenceItemRowSchema
from app.assets.api_errors import DatabaseConnectionError, BadJSONError


class ConvergenceItemRepository:

    request_schema = ConvergenceItemRequestSchema()
    rows_schema = ConvergenceItemRowSchema()

    def __request_data(self, data: dict) -> ConvergenceItemRequestOptions:
        req_options = self.request_schema.load(data)
        return req_options

    def __batch_id(self, name: str) -> Optional[int]:
        batch = db.session.query(Batch).filter(
            Batch.BatchName == name).one_or_none()
        return batch.BatchPK if batch else None

    def __query(self, options: ConvergenceItemRequestOptions, id: int) -> BaseQuery:

        filters = []

        boil_subqry = db.session.query(
            Boil.BatchPK.label('batch_id'),
            Boil.ProductId.label('product_id'),
            Product.ProductName.label('product_name'),
            func.sum(Boil.Quantity).label('plan'),
        ).join(
            Product, Boil.ProductId == Product.ProductId
        ).filter(
            Boil.BatchPK == id
        ).group_by(
            Boil.BatchPK,
            Boil.ProductId,
            Product.ProductName
        ).subquery()

        wght_subqry = db.session.query(
            Weighting.BatchPK,
            Weighting.ProductId.label('product_id'),
            Product.ProductName.label('product_name'),
            func.sum(Weighting.Quantity).label('fact')
        ).join(
            Product, Weighting.ProductId == Product.ProductId
        ).filter(
            Weighting.BatchPK == id
        ).group_by(
            Weighting.BatchPK,
            Weighting.ProductId,
            Product.ProductName
        ).subquery()

        if options.exactly:
            filters.append(
                or_(wght_subqry.c.fact != boil_subqry.c.plan,
                    wght_subqry.c.fact.is_(None))
            )
        else:
            filters.append(wght_subqry.c.fact.is_(None))

        query = db.session.query(
            boil_subqry.c.product_id.label('b_product_id'),
            boil_subqry.c.product_name.label('b_product_name'),
            boil_subqry.c.plan.label('plan'),
            wght_subqry.c.product_id.label('w_product_id'),
            wght_subqry.c.product_name.label('w_product_name'),
            wght_subqry.c.fact.label('fact')
        ).join(
            wght_subqry,
            boil_subqry.c.product_id == wght_subqry.c.product_id,
            full=True
        ).filter(
            *filters
        ).order_by(case(
            [(boil_subqry.c.product_name != '', boil_subqry.c.product_name), ],
            else_=wght_subqry.c.product_name
        ).asc())
        return query

    def __rows(self, query: BaseQuery):
        data = query.all()
        rows = self.rows_schema.dump(data, many=True)
        return rows

    def get_convergense_item(self, name: str, data: dict):
        try:
            req_options = self.__request_data(data)
            id = self.__batch_id(name)
            if id is None:
                raise BadJSONError
            query = self.__query(req_options, id)
            rows = self.__rows(query)
            response = {'rows': rows, 'batch_id': id}
            return jsonify(response)
        except OperationalError:
            raise DatabaseConnectionError
        except ValidationError:
            raise BadJSONError
        except TypeError:
            raise BadJSONError
