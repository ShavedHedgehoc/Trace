from flask import jsonify
from marshmallow import ValidationError

from sqlalchemy import case, func, or_
from sqlalchemy.exc import OperationalError


from app import db
from app.models.batch import Batch
from app.models.boil import Boil
from app.models.bt_product import BtProduct
from app.models.plant import Plant
from app.models.product import Product
from app.models.weighting import Weighting
from app.assets.api_dataclasses import ConvergenceItemRequestOptions, ConvergenceRequestOptions
from app.schemas.boil import PlantSchema
from app.schemas.convergence import ConvergenceItemRequestSchema, ConvergenceRequestSchema
from app.assets.api_dataclasses import ConvergenceRequestOptions
from app.assets.api_errors import DatabaseConnectionError, BadJSONError


class ConvergenceRepository:
    plant_dict_for_report = {
        "П": "Пискаревка",
        "К": "Колпино",
    }
    plant_schema = PlantSchema()
    request_schema = ConvergenceRequestSchema()
    request_item_schema = ConvergenceItemRequestSchema()

    def __load_request_data(self, data: dict) -> ConvergenceRequestOptions:
        try:
            req_options = self.request_schema.load(data)
            return req_options
        except ValidationError:
            raise BadJSONError
        except TypeError:
            raise BadJSONError
        
    def __load_item_request_data(self, data: dict) -> ConvergenceItemRequestOptions:
        try:
            req_options = self.request_item_schema.load(data)
            return req_options
        except ValidationError:
            raise BadJSONError
        except TypeError:
            raise BadJSONError

    def __get_plant_options(self):
        plants = db.session.query(
            Plant.PlantAlias.label("key"),
            Plant.PlantName.label("value")
        ).all()
        plant_options = self.plant_schema.dump(plants, many=True)
        return plant_options

    def __get_query(self, options: ConvergenceRequestOptions):

        filters = []

        if options.filter.plant != '-':
            filters.append(Batch.Plant == options.filter.plant)
        filters.append(Batch.BatchDate >= options.filter.start_date)
        filters.append(Batch.BatchDate <= options.filter.end_date)

        wght_total_subquery = db.session.query(
            Weighting.BatchPK.label('batch_id'),
            Weighting.ProductId.label('product_id'),
            func.sum(Weighting.Quantity).label('total')
        ).group_by(
            Weighting.BatchPK,
            Weighting.ProductId
        ).subquery()

        if options.filter.exactly:
            filters.append(wght_total_subquery.c.total != Boil.Quantity)
        else:
            filters.append(wght_total_subquery.c.total.is_(None))

        report_subquery = db.session.query(
            Boil.BatchPK.label('batch_id'),
            Batch.Plant.label('plant'),
            Batch.BatchName.label('batch_name'),
            Batch.BatchDate.label('batch_date'),
            Batch.batch_year.label('batch_year'),
            Batch.batch_month.label('batch_month'),
            Batch.batch_number.label('batch_number'),
            Batch.plant_letter.label('plant_letter'),
            Product.ProductMarking.label('marking'),
        ).outerjoin(
            wght_total_subquery,
            ((wght_total_subquery.c.batch_id == Boil.BatchPK) & (
                wght_total_subquery.c.product_id == Boil.ProductId))
        ).join(
            Batch, Batch.BatchPK == Boil.BatchPK
        ).join(
            BtProduct, BtProduct.BatchPK == Boil.BatchPK
        ).join(
            Product, Product.ProductId == BtProduct.ProductId
        ).filter(
            *filters
        ).subquery()

        report_qry = db.session.query(
            report_subquery.c.batch_id.label('batch_id'),
            report_subquery.c.batch_name.label('batch_name'),
            report_subquery.c.batch_date.label('batch_date'),
            report_subquery.c.batch_year.label('batch_year'),
            report_subquery.c.batch_month,
            report_subquery.c.batch_number,
            report_subquery.c.marking.label('marking'),
            report_subquery.c.plant_letter.label('plant_letter'),
        ).distinct(
            report_subquery.c.batch_id
        ).order_by(
            report_subquery.c.batch_year,
            report_subquery.c.batch_month,
            report_subquery.c.batch_number
        )
        return report_qry

    def __get_convergences_rows(self, query, options: ConvergenceRequestOptions):
        offset = options.page * options.limit
        report_data = query.offset(offset).limit(options.limit)
        
        # add marshmallow here
        
        rows = []

        for row in report_data:
            rows.append({
                'batch_id': row.batch_id,
                'batch_name': row.batch_name,
                'marking': row.marking,
                'batch_date':
                    row.batch_date.strftime(
                        "%d-%m-%Y") if row.batch_date else None,
                'plant': self.plant_dict_for_report[row.plant_letter]
            })
        return rows

    def get_convergenses(self, data: dict):
        try:
            req_options = self.__load_request_data(data)
            query = self.__get_query(req_options)
            rows = self.__get_convergences_rows(query, req_options)
            total = query.count()
            plant_selector_options = self.__get_plant_options()
            result = {'rows': rows,
                      'total': total,
                      'plant_selector_options': plant_selector_options
                      }
            return jsonify(result)
        except OperationalError:
            raise DatabaseConnectionError

    def get_convergense_item(self, name: str, data: dict):
        req_options = self.__load_item_request_data(data)
        exactly  = req_options.exactly
        

        batch = db.session.query(Batch).filter(
            Batch.BatchName == name).one_or_none()

        if batch is None:
            raise BadJSONError
        else:
            batchid = batch.BatchPK

        boil_subqry = db.session.query(
            Boil.BatchPK.label('batch_id'),
            Boil.ProductId.label('product_id'),
            Product.ProductName.label('product_name'),
            func.sum(Boil.Quantity).label('plan'),
        ).join(
            Product, Boil.ProductId == Product.ProductId
        ).filter(
            Boil.BatchPK == batchid
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
            Weighting.BatchPK == batchid
        ).group_by(
            Weighting.BatchPK,
            Weighting.ProductId,
            Product.ProductName
        ).subquery()

        filters = []

        if exactly:
            filters.append(
                or_(wght_subqry.c.fact != boil_subqry.c.plan,
                    wght_subqry.c.fact.is_(None))
            )

        else:
            filters.append(wght_subqry.c.fact.is_(None))

        boil_qry = db.session.query(
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

        boil_rows = boil_qry.all()

        # if boil_rows is None:
        #     abort(404)

        rows = []

        for row in boil_rows:
            product_id = row.b_product_id if row.b_product_id \
                else row.w_product_id
            product_name = row.b_product_name if row.b_product_name \
                else row.w_product_name

            rows.append({
                'product_id': product_id,
                'product_name': product_name,
                'plan': row.plan,
                'fact': row.fact or 0
            })

        response = {'rows': rows, 'batch_id': batchid}

        return jsonify(response)
