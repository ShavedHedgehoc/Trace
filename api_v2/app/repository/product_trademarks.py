from flask import jsonify

# from flask_sqlalchemy import BaseQuery
from marshmallow import ValidationError
from sqlalchemy.exc import OperationalError
from app.schemas.product import (
    ProductTrademarkItemHeaderSchema,
    ProductTrademarkItemRequestSchema,
    ProductTrademarkItemRowSchema,
)

from app import db
from app.assets.api_dataclasses import ProductTrademarksItemRequestOptions
from app.assets.api_errors import DatabaseConnectionError, BadJSONError
from app.models.batch import Batch
from app.models.bt_product import BtProduct
from app.models.lot import Lot
from app.models.product import Product
from app.models.trademark import Trademark
from app.models.weighting import Weighting
from app.schemas.product import ProductTrademarkItemRequestSchema
from app.models.plant import Plant


class ProductTrademarksRepository:

    request_schema = ProductTrademarkItemRequestSchema()
    rows_schema = ProductTrademarkItemRowSchema()
    header_schema = ProductTrademarkItemHeaderSchema()

    def __request_data(self, data: dict) -> ProductTrademarksItemRequestOptions:
        req_options = self.request_schema.load(data)
        return req_options

    def __subquery(self, id: str):
        product_sbqry = (
            db.session.query(
                Weighting.WeightingsPK.label("weightink_pk"),
                Batch.BatchName.label("batch_name"),
                Batch.BatchPK.label("batch_id"),
                Batch.BatchDate.label("batch_date"),
                Plant.PlantAlias.label("plant"),
                Batch.batch_year.label("year"),
                Batch.batch_month.label("month"),
                Batch.batch_number.label("number"),
                Lot.LotPK.label("lot_id"),
                Lot.LotName.label("lot_name"),
                Product.ProductMarking.label("product_name"),
                Trademark.TrademarkPK.label("trademark_id"),
                Trademark.TrademarkName.label("trademark_name"),
            )
            .join(Batch, Weighting.BatchPK == Batch.BatchPK, isouter=True)
            .join(Plant, Plant.PlantName == Batch.Plant, isouter=True)
            .join(Lot, Weighting.LotPK == Lot.LotPK, isouter=True)
            .join(BtProduct, Batch.BatchPK == BtProduct.BatchPK, isouter=True)
            .join(Product, BtProduct.ProductId == Product.ProductId, isouter=True)
            .join(Trademark, Lot.TradeMarkPK == Trademark.TrademarkPK, isouter=True)
            .filter(Weighting.ProductId == id)
            .subquery()
        )
        return product_sbqry

    def __query(self, id: str):
        product_sbqry = self.__subquery(id)
        product_qry = (
            db.session.query(
                product_sbqry.c.batch_id.label("batch_id"),
                product_sbqry.c.batch_name.label("boil_name"),
                product_sbqry.c.plant.label("plant"),
                product_sbqry.c.batch_date.label("boil_date"),
                product_sbqry.c.product_name.label("product_name"),
                product_sbqry.c.trademark_id.label("trademark_id"),
                product_sbqry.c.trademark_name.label("trademark_name"),
                product_sbqry.c.lot_id.label("lot_id"),
                product_sbqry.c.lot_name.label("lot_name"),
                product_sbqry.c.year.label("year"),
                product_sbqry.c.month.label("month"),
                product_sbqry.c.number.label("number"),
            )
            .distinct(
                product_sbqry.c.batch_id,
                product_sbqry.c.batch_name,
                product_sbqry.c.lot_id,
                product_sbqry.c.lot_name,
            )
            .order_by(
                product_sbqry.c.year, product_sbqry.c.month, product_sbqry.c.number
            )
        )
        return product_qry

    def __header(self, id: str):
        data = (
            db.session.query(
                Product.ProductId.label("product_id"),
                Product.ProductName.label("product_name"),
            )
            .filter(Product.ProductId == id)
            .one_or_none()
        )
        header = self.header_schema.dump(data)
        return header

    def __rows(self, query, options: ProductTrademarksItemRequestOptions):
        offset = options.page * options.limit
        data = query.offset(offset).limit(options.limit)
        rows = self.rows_schema.dump(data, many=True)
        return rows

    def get_product_trademarks(self, id: str, data: dict):
        try:
            req_options = self.__request_data(data)
            header = self.__header(id)
            query = self.__query(id)
            rows = self.__rows(query, req_options)
            total = query.count()
            response = {"header": header, "rows": rows, "total": total}
            return jsonify(response)
        except OperationalError:
            raise DatabaseConnectionError
        except ValidationError:
            raise BadJSONError
        except TypeError:
            raise BadJSONError
