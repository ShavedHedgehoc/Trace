from flask import jsonify
from flask_sqlalchemy import BaseQuery
from marshmallow import ValidationError
from sqlalchemy.exc import OperationalError

from app import db
from app.assets.api_dataclasses import LotItemRequestOptions
from app.assets.api_errors import DatabaseConnectionError, BadJSONError
from app.models.batch import Batch
from app.models.bt_product import BtProduct
from app.models.weighting import Weighting
from app.schemas.lot import LotItemHeaderSchema, LotItemRequestSchema, LotItemRowSchema
from app.models.lot import Lot
from app.models.product import Product
from app.models.manufacturer_lot import ManufacturerLot
from app.models.plant import Plant
from app.models.trademark import Trademark


class LotItemRepository:

    request_schema = LotItemRequestSchema()
    header_item_schema = LotItemHeaderSchema()
    rows_schema = LotItemRowSchema()

    def __request_data(self, data: dict) -> LotItemRequestOptions:
        req_options = self.request_schema.load(data)
        return req_options

    def __header(self, id: int):
        data = db.session.query(
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
        header = self.header_item_schema.dump(data)
        return header

    def __query(self, id: int):

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

    def __rows(self, query: BaseQuery, options: LotItemRequestOptions):
        offset = options.page*options.limit
        data = query.offset(offset).limit(options.limit)
        rows = self.rows_schema.dump(data, many=True)
        return rows

    def get_lot_item(self, id: int, data: dict):
        try:
            req_options = self.__request_data(data)
            query = self.__query(id)
            header = self.__header(id)
            rows = self.__rows(query, req_options)
            total = query.count()
            response = {'header': header, 'rows': rows, 'total': total}
            return jsonify(response)
        except OperationalError:
            raise DatabaseConnectionError
        except ValidationError:
            raise BadJSONError
        except TypeError:
            raise BadJSONError
