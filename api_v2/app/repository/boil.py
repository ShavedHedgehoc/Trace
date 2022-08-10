from typing import List
from flask import jsonify
from marshmallow import ValidationError
from sqlalchemy import func
from sqlalchemy.exc import OperationalError


from app import db
from app.models.batch import Batch
from app.models.bt_product import BtProduct
from app.models.product import Product
from app.models.plant import Plant
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

    def __request_data(self, data: dict) -> BoilRequestOptions:
        req_options = self.request_schema.load(data)
        return req_options

    def __query(self):
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

    def __total(self, query) -> int:
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

    def __rows(self, query, options: BoilRequestOptions):
        offset = options.page*options.limit
        limit = options.limit
        row_data = query.filter(*self.filters).offset(offset).limit(limit)
        rows = self.rows_schema.dump(row_data, many=True)
        return rows

    def __plant_options(self, query):
        plant_sbqry = query.with_entities(
            Batch.plant_letter.label("key"),
            Plant.PlantName.label("value")
        ).filter(*self.plant_filters).subquery()
        distinct_plants = db.session.query(plant_sbqry).distinct()
        plant_options = self.plant_schema.dump(distinct_plants, many=True)
        return plant_options

    def __month_options(self, query):
        month_sbqry = query.with_entities(
            Batch.batch_month.label('key')
        ).filter(*self.month_filters).subquery()
        distinct_months = db.session.query(month_sbqry).distinct()
        month_options = self.month_schema.dump(distinct_months, many=True)
        return month_options

    def __year_options(self, query):
        year_sbqry = query.with_entities(
            Batch.batch_year.label('key')
        ).filter(*self.year_filters).subquery()
        distinct_years = db.session.query(year_sbqry).distinct()
        year_options = self.year_schema.dump(distinct_years, many=True)
        return year_options

    def get_boils(self, data: dict):
        try:
            req_options = self.__request_data(data)
            query = self.__query()
            self.process_filters(req_options)
            total = self.__total(query)
            rows = self.__rows(query, req_options)
            plant_selector_options = self.__plant_options(query)
            month_selector_options = self.__month_options(query)
            year_selector_options = self.__year_options(query)
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
        except TypeError:
            raise BadJSONError
