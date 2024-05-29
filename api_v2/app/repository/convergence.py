from flask import jsonify
from flask_sqlalchemy import BaseQuery
from marshmallow import ValidationError
from sqlalchemy import func
from sqlalchemy.exc import OperationalError

from app import db
from app.models.batch import Batch
from app.models.boil import Boil
from app.models.bt_product import BtProduct
from app.models.plant import Plant
from app.models.product import Product
from app.models.weighting import Weighting
from app.assets.api_dataclasses import ConvergenceRequestOptions
from app.schemas.boil import PlantSchema
from app.schemas.convergence import ConvergenceRequestSchema, ConvergenceRowSchema
from app.assets.api_dataclasses import ConvergenceRequestOptions
from app.assets.api_errors import DatabaseConnectionError, BadJSONError


class ConvergenceRepository:

    plant_schema = PlantSchema()
    request_schema = ConvergenceRequestSchema()
    rows_schema = ConvergenceRowSchema()

    def __request_data(self, data: dict) -> ConvergenceRequestOptions:
        req_options = self.request_schema.load(data)
        return req_options

    def __plant_options(self):
        plants = db.session.query(
            Plant.PlantAlias.label("key"),
            Plant.PlantName.label("value")
        ).all()
        plant_options = self.plant_schema.dump(plants, many=True)
        return plant_options

    def __query(self, options: ConvergenceRequestOptions) -> BaseQuery:

        filters = []
        filter = options.filter
        filters.append(Weighting.Quantity.is_(None))
        filters.append(Batch.BatchDate.between(
            filter.start_date, filter.end_date))
        if filter.plant != '-':
            filters.append(Batch.Plant == filter.plant)

        report_subquery = db.session.query(
            Boil.BatchPK.label('batch_id'),
            Batch.BatchName.label('batch_name'),
            Batch.BatchDate.label('batch_date'),
            Batch.batch_year.label('batch_year'),
            Batch.batch_month.label('batch_month'),
            Batch.batch_number.label('batch_number'),
            Product.ProductMarking.label('marking'),
            Plant.PlantName.label('plant')
        ).join(
            Batch, Batch.BatchPK == Boil.BatchPK
        ).join(
            Plant, Plant.PlantAlias == Batch.Plant
        ).join(
            BtProduct, BtProduct.BatchPK == Boil.BatchPK
        ).join(
            Product, Product.ProductId == BtProduct.ProductId
        ).join(
            Weighting,
            ((Weighting.BatchPK == Boil.BatchPK) & (
                Weighting.ProductId == Boil.ProductId)),
            isouter=True
        ).filter(
            *filters
        ).group_by(
            Boil.BatchPK,
            Batch.BatchName,
            Batch.BatchDate,
            Batch.batch_year,
            Batch.batch_month,
            Batch.batch_number,
            Product.ProductMarking,
            Plant.PlantName
        ).subquery()

        query = db.session.query(
            report_subquery.c.batch_id.label('batch_id'),
            report_subquery.c.batch_name.label('batch_name'),
            report_subquery.c.batch_date.label('batch_date'),
            report_subquery.c.batch_year,
            report_subquery.c.batch_month,
            report_subquery.c.batch_number,
            report_subquery.c.marking.label('marking'),
            report_subquery.c.plant.label('plant')
        ).order_by(
            report_subquery.c.batch_year,
            report_subquery.c.batch_month,
            report_subquery.c.batch_number
        )
        return query

    def __query_ex(self, options: ConvergenceRequestOptions) -> BaseQuery:
        filters = []
        filter = options.filter

        filters.append(Batch.BatchDate.between(
            filter.start_date, filter.end_date))
        if filter.plant != '-':
            filters.append(Batch.Plant == filter.plant)

        report_subquery = db.session.query(
            Boil.BatchPK.label('batch_id'),
            Batch.BatchName.label('batch_name'),
            Batch.BatchDate.label('batch_date'),
            Product.ProductMarking.label('marking'),
            Batch.batch_year.label('batch_year'),
            Batch.batch_month.label('batch_month'),
            Batch.batch_number.label('batch_number'),
            Plant.PlantName.label('plant'),
            Boil.Quantity.label('plan'),
            func.sum(Weighting.Quantity).label('fact')
        ).join(
            Batch, Batch.BatchPK == Boil.BatchPK
        ).join(
            Plant, Plant.PlantAlias == Batch.Plant
        ).join(
            BtProduct, BtProduct.BatchPK == Boil.BatchPK
        ).join(
            Product, Product.ProductId == BtProduct.ProductId
        ).join(
            Weighting,
            ((Weighting.BatchPK == Boil.BatchPK) & (
                Weighting.ProductId == Boil.ProductId)),
            isouter=True
        ).filter(
            *filters
        ).group_by(
            Boil.BatchPK,
            Batch.BatchName,
            Batch.BatchDate,
            Product.ProductMarking,
            Plant.PlantName,
            Boil.Quantity
        ).subquery()

        query = db.session.query(
            report_subquery.c.batch_id.label('batch_id'),
            report_subquery.c.batch_name.label('batch_name'),
            report_subquery.c.batch_date.label('batch_date'),
            report_subquery.c.batch_year,
            report_subquery.c.batch_month,
            report_subquery.c.batch_number,
            report_subquery.c.marking.label('marking'),
            report_subquery.c.plant.label('plant'),
        ).distinct(
            report_subquery.c.batch_id
        ).order_by(
            report_subquery.c.batch_year,
            report_subquery.c.batch_month,
            report_subquery.c.batch_number
        )
        return query

    def __rows(self, query: BaseQuery, options: ConvergenceRequestOptions):
        offset = options.page*options.limit
        data = query.offset(offset).limit(options.limit)
        rows = self.rows_schema.dump(data, many=True)
        return rows

    def get_convergenses(self, data: dict):
        try:
            req_options = self.__request_data(data)
            if req_options.filter.exactly:
                query = self.__query_ex(req_options)
            else:
                query = self.__query(req_options)
            rows = self.__rows(query, req_options)
            total = query.count()
            plant_options = self.__plant_options()
            result = {'rows': rows, 'total': total,
                      'plant_selector_options': plant_options}
            return jsonify(result)
        except OperationalError:
            raise DatabaseConnectionError
        except ValidationError:
            raise BadJSONError
        except TypeError:
            raise BadJSONError
