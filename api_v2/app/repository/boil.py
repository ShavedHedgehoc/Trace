from typing import List
from flask import jsonify
from marshmallow import ValidationError
from sqlalchemy import case, func
from sqlalchemy.exc import OperationalError


from app import db
from app.models.author import Author
from app.models.batch import Batch
from app.models.boil import Boil
from app.models.bt_product import BtProduct
from app.models.document import Document
from app.models.load import Load
from app.models.lot import Lot
from app.models.product import Product
from app.models.plant import Plant
from app.models.weighting import Weighting
from app.schemas.boil import BoilRowSchema, BoilsRequestSchema, MonthSchema, PlantSchema, YearSchema
from app.assets.api_dataclasses import BoilRequestOptions
from app.assets.api_errors import DatabaseConnectionError, BadJSONError


class BoilRepository:

    request_schema = BoilsRequestSchema()
    rows_schema = BoilRowSchema()
    month_schema = MonthSchema()
    plant_schema = PlantSchema()
    year_schema = YearSchema()

    def __init__(self) -> None:
        self.filters: List[str] = []
        self.year_filters: List[str] = []
        self.month_filters: List[str] = []
        self.plant_filters: List[str] = []
    
    def get_boils_query(self):
        boil_qry = db.session.query(
            Batch.BatchPK.label('batch_id'),
            Batch.BatchName.label('name'),
            Product.ProductMarking.label('marking'),
            Batch.BatchDate.label('date'),
            Plant.PlantName.label('plant'),
            Batch.plant_letter.label('plant_letter'),
            Batch.batch_month.label('month'),
            Batch.batch_year.label('year')
        ).join(
            Plant, Plant.PlantAlias == Batch.plant_letter, isouter=True
        ).join(
            BtProduct, Batch.BatchPK == BtProduct.BatchPK, isouter=True
        ).join(
            Product, BtProduct.ProductId == Product.ProductId, isouter=True
        ).order_by(
            Batch.batch_year, Batch.batch_month, Batch.batch_number
        )
        return boil_qry

    def get_total_records(self, query) -> int:
        count = query.filter(*self.filters).count()
        return count

    def filter_init(self) -> None:
        self.filters = []
        self.year_filters = []
        self.month_filters = []
        self.plant_filters = []

    def process_batch(self, batch: str) -> None:
        self.filters.append(Batch.BatchName.like(f"%{batch}%"))
        self.year_filters.append(Batch.BatchName.like(f"%{batch}%"))
        self.month_filters.append(Batch.BatchName.like(f"%{batch}%"))
        self.plant_filters.append(Batch.BatchName.like(f"%{batch}%"))

    def process_marking(self, marking: str) -> None:

        if marking == 'Нет данных':
            self.filters.append(Product.ProductMarking.is_(None))
        else:
            self.filters.append(Product.ProductMarking.like(f"%{marking}%"))
        self.year_filters.append(Product.ProductMarking.like(f"%{marking}%"))
        self.month_filters.append(Product.ProductMarking.like(f"%{marking}%"))
        self.plant_filters.append(Product.ProductMarking.like(f"%{marking}%"))

    def process_date(self, date: str) -> None:

        [year, month_str, day_str] = date.split('-')
        month = month_str.lstrip('0')
        day = day_str.lstrip('0')

        self.filters.append(func.YEAR(Batch.BatchDate) == year)
        self.filters.append(func.MONTH(Batch.BatchDate) == month)
        self.filters.append(func.DAY(Batch.BatchDate) == day)

        self.year_filters.append(func.YEAR(Batch.BatchDate) == year)
        self.year_filters.append(func.MONTH(Batch.BatchDate) == month)
        self.year_filters.append(func.DAY(Batch.BatchDate) == day)

        self.month_filters.append(func.YEAR(Batch.BatchDate) == year)
        self.month_filters.append(func.MONTH(Batch.BatchDate) == month)
        self.month_filters.append(func.DAY(Batch.BatchDate) == day)

        self.plant_filters.append(func.YEAR(Batch.BatchDate) == year)
        self.plant_filters.append(func.MONTH(Batch.BatchDate) == month)
        self.plant_filters.append(func.DAY(Batch.BatchDate) == day)

    def process_month(self, month: str) -> None:
        self.filters.append(Batch.batch_month == month)
        self.year_filters.append(Batch.batch_month == month)
        self.plant_filters.append(Batch.batch_month == month)

    def process_year(self, year: str) -> None:
        self.filters.append(Batch.batch_year == year)
        self.month_filters.append(Batch.batch_year == year)
        self.plant_filters.append(Batch.batch_year == year)

    def process_plant(self, plant: str) -> None:
        self.filters.append(Batch.plant_letter.like(f"%{plant}%"))
        self.year_filters.append(Batch.plant_letter.like(f"%{plant}%"))
        self.month_filters.append(Batch.plant_letter.like(f"%{plant}%"))

    def process_filters(self, options: BoilRequestOptions) -> None:
        self.filter_init()
        if options.filter.batch != '':
            self.process_batch(options.filter.batch)
        if options.filter.marking != '':
            self.process_marking(options.filter.marking)
        if options.filter.date != '':
            self.process_date(options.filter.date)
        if options.filter.month != '-':
            self.process_month(options.filter.month)
        if options.filter.year != '-':
            self.process_year(options.filter.year)
        if options.filter.plant != '-':
            self.process_plant(options.filter.plant)

    def get_rows(self, query, options: BoilRequestOptions):
        offset = options.page*options.limit
        limit = options.limit
        row_data = query.filter(*self.filters).offset(offset).limit(limit)
        rows = self.rows_schema.dump(row_data, many=True)
        return rows

    def get_plant_options(self, query):
        plant_sbqry = query.with_entities(
            Batch.plant_letter.label("key"),
            Plant.PlantName.label("value")
        ).filter(*self.plant_filters).subquery()
        distinct_plants = db.session.query(plant_sbqry).distinct()
        plant_options = self.plant_schema.dump(distinct_plants, many=True)
        return plant_options

    def get_month_options(self, query):
        month_sbqry = query.with_entities(
            Batch.batch_month.label('key')
        ).filter(*self.month_filters).subquery()
        distinct_months = db.session.query(month_sbqry).distinct()
        month_options = self.month_schema.dump(distinct_months, many=True)
        return month_options

    def get_year_options(self, query):
        year_sbqry = query.with_entities(
            Batch.batch_year.label('key')
        ).filter(*self.year_filters).subquery()
        distinct_years = db.session.query(year_sbqry).distinct()
        year_options = self.year_schema.dump(distinct_years, many=True)
        return year_options

    def get_boils(self, data: dict):
        try:
            req_options = self.request_schema.load(data)            
            query = self.get_boils_query()
            self.process_filters(req_options)
            total = self.get_total_records(query)
            rows = self.get_rows(query, req_options)
            plant_selector_options = self.get_plant_options(query)
            month_selector_options = self.get_month_options(query)
            year_selector_options = self.get_year_options(query)
            result = {'rows': rows,
                      'total': total,
                      'plant_selector_options': plant_selector_options,
                      'month_selector_options': month_selector_options,
                      'year_selector_options': year_selector_options
                      }
            return jsonify(result)
        except OperationalError:
            raise DatabaseConnectionError
        except ValidationError:
            raise BadJSONError

    def get_boil_header(self, boil_id: int):
        boil = db.session.query(
            Batch.BatchName.label('boil_name'),
            Batch.BatchDate.label('boil_date'),
            Plant.PlantName.label('boil_plant')
            # Batch.Plant.label('boil_plant')
        ).join(
            Plant, Plant.PlantAlias == Batch.plant_letter
        ).filter(
            Batch.BatchPK == boil_id
        ).one_or_none()

        boil_marking = db.session.query(
            Product
        ).join(
            BtProduct, Product.ProductId == BtProduct.ProductId
        ).filter(
            BtProduct.BatchPK == boil_id
        ).one_or_none()

        header = {
            'boil_name': boil.boil_name if boil else 'Нет данных',
            'date': (
                boil.boil_date.strftime(
                    "%d-%m-%Y") if boil.boil_date else 'Нет данных'
            )if boil else 'Нет данных',
            'plant': (
                boil.boil_plant if boil.boil_plant else 'Нет данных'
            ) if boil else 'Нет данных',
            'marking': boil_marking.ProductMarking
            if boil_marking else 'Нет данных'
        }
        return header

    def get_summary_boil_sbqry(self, boil_id: int):
        summary_boil_subqry = db.session.query(
            Boil.BatchPK.label('batch_id'),
            Boil.ProductId.label('product_id'),
            Product.ProductName.label('product_name'),
            func.sum(Boil.Quantity).label('plan'),
        ).join(
            Product, Boil.ProductId == Product.ProductId
        ).filter(
            Boil.BatchPK == boil_id
        ).group_by(
            Boil.BatchPK,
            Boil.ProductId,
            Product.ProductName
        ).subquery()
        return summary_boil_subqry

    def get_summary_weighting_sbqry(self, boil_id: int):
        summary_wght_subqry = db.session.query(
            Weighting.BatchPK,
            Weighting.ProductId.label('product_id'),
            Product.ProductName.label('product_name'),
            func.sum(Weighting.Quantity).label('fact')
        ).join(
            Product, Weighting.ProductId == Product.ProductId
        ).filter(
            Weighting.BatchPK == boil_id
        ).group_by(
            Weighting.BatchPK,
            Weighting.ProductId,
            Product.ProductName
        ).subquery()
        return summary_wght_subqry

    def get_summary_query(self, boil_id: int):
        summary_boil_subqry = self.get_summary_boil_sbqry(boil_id)
        summary_wght_subqry = self.get_summary_weighting_sbqry(boil_id)
        summary_qry = db.session.query(
            summary_boil_subqry.c.product_id.label('b_product_id'),
            summary_boil_subqry.c.product_name.label('b_product_name'),
            summary_boil_subqry.c.plan.label('plan'),
            summary_wght_subqry.c.product_id.label('w_product_id'),
            summary_wght_subqry.c.product_name.label('w_product_name'),
            summary_wght_subqry.c.fact.label('fact')
        ).join(
            summary_wght_subqry,
            summary_boil_subqry.c.product_id == summary_wght_subqry.c.product_id,
            full=True
        ).order_by(case(
            [(summary_boil_subqry.c.product_name != '',
              summary_boil_subqry.c.product_name), ],
            else_=summary_wght_subqry.c.product_name
        ).asc())
        return summary_qry

    def get_boil_rows(self, boil_id: int):
        summary_qry_rows = self.get_summary_query(boil_id).all()
        # add schema dump
        summary_rows = []
        for row in summary_qry_rows:
            product_id = row.b_product_id if row.b_product_id \
                else row.w_product_id
            product_name = row.b_product_name if row.b_product_name \
                else row.w_product_name
            summary_rows.append({
                'product_id': product_id,
                'product_name': product_name,
                'plan': row.plan,
                'fact': row.fact
            })
        return summary_rows

    def get_weighting_query(self, boil_id: int):
        weighting_qry = db.session.query(
            Weighting.ProductId.label('product_id'),
            Product.ProductName.label('product_name'),
            Weighting.Quantity.label('quantity'),
            Lot.LotPK.label('lot_id'),
            Lot.LotName.label('lot'),
            Author.AuthorName.label('user'),
            Document.CreateDate.label('date')
        ).join(
            Product, Weighting.ProductId == Product.ProductId
        ).join(
            Lot, Weighting.LotPK == Lot.LotPK
        ).join(
            Document, Weighting.DocumentPK == Document.DocumentPK
        ).join(
            Author, Document.AuthorPK == Author.AuthorPK
        ).filter(
            Weighting.BatchPK == boil_id
        ).order_by((Product.ProductName).asc())
        return weighting_qry

    def get_weighting_rows(self, boil_id: int):

        weighting_qry_rows = self.get_weighting_query(boil_id).all()
        #  add schema dump
        weighting_rows = []

        for row in weighting_qry_rows:
            weighting_rows.append({
                'product_id': row.product_id,
                'product_name': row.product_name,
                'quantity': str(row.quantity),
                'lot_id': row.lot_id,
                'lot': row.lot,
                'user': row.user,
                'date':
                    row.date.strftime("%d-%m-%Y") if row.date else None,
                'time': row.date.strftime("%H:%M:%S") if row.date else None,
            })
        return weighting_rows

    def get_dist_cont_sbqry(self, boil_id: int):
        distinct_container_subqry = db.session.query(
            Load.ContainerPK
        ).filter(
            Load.BatchPK == boil_id
        ).distinct().subquery()
        return distinct_container_subqry

    def get_container_sbqry(self, boil_id: int):
        container_subqry = db.session.query(
            Load.ContainerPK.label('container_id'),
            Author.AuthorName.label('user'),
            Document.CreateDate.label('date')
        ).distinct(
            Load.ContainerPK
        ).join(
            Document, Load.DocumentPK == Document.DocumentPK
        ).join(
            Author, Document.AuthorPK == Author.AuthorPK
        ).filter(
            Load.BatchPK == boil_id
        ).subquery()
        return container_subqry

    def get_load_wght_sbqry(self, boil_id: int):
        distinct_container_subqry = self.get_dist_cont_sbqry(boil_id)
        load_weighting_subqry = db.session.query(
            Weighting.ContainerPK.label('container_id'),
            Weighting.ProductId.label('product_id'),
            Product.ProductName.label('product_name'),
            Lot.LotPK.label('lot_id'),
            Lot.LotName.label('lot')
        ).join(
            Product, Weighting.ProductId == Product.ProductId
        ).join(
            Lot, Weighting.LotPK == Lot.LotPK
        ).filter(
            Weighting.ContainerPK.in_(distinct_container_subqry)
        ).subquery()
        return load_weighting_subqry

    def get_load_query(self, boil_id: int):
        container_subqry = self.get_container_sbqry(boil_id)
        load_weighting_subqry = self.get_load_wght_sbqry(boil_id)
        load_qry = db.session.query(
            container_subqry.c.user.label('user'),
            container_subqry.c.date.label('date'),
            load_weighting_subqry.c.product_id.label('product_id'),
            load_weighting_subqry.c.product_name.label('product_name'),
            load_weighting_subqry.c.lot_id.label('lot_id'),
            load_weighting_subqry.c.lot.label('lot'),
        ).join(
            load_weighting_subqry,
            container_subqry.c.container_id == load_weighting_subqry.c.container_id
        ).order_by(
            load_weighting_subqry.c.product_name
        )
        return load_qry

    def get_load_rows(self, boil_id: int):
        load_qry_rows = self.get_load_query(boil_id).all()
        #  add schema dump
        load_rows = []

        for row in load_qry_rows:
            load_rows.append({
                'product_id': row.product_id,
                'product_name': row.product_name,
                'lot': row.lot,
                'lot_id': row.lot_id,
                'user': row.user,
                'date':
                    row.date.strftime("%d-%m-%Y") if row.date else None,
                'time': row.date.strftime("%H:%M:%S") if row.date else None,
            })
        return load_rows

    def get_boil(self, boil_id: int):
        header = self.get_boil_header(boil_id)
        summary_rows = self.get_boil_rows(boil_id)
        weighting_rows = self.get_weighting_rows(boil_id)
        load_rows = self.get_load_rows(boil_id)
        response = {
            'header': header,
            'summaryRows': summary_rows,
            'weightingRows': weighting_rows,
            'loadRows': load_rows
        }
        return jsonify(response)
