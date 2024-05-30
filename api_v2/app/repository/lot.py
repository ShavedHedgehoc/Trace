from flask import jsonify

# from flask_sqlalchemy import BaseQuery
from marshmallow import ValidationError
from sqlalchemy.exc import OperationalError
from app.models.seller import Seller

from app import db
from app.assets.api_dataclasses import LotRequestOptions
from app.assets.api_errors import DatabaseConnectionError, BadJSONError
from app.schemas.lot import LotRequestSchema, LotRowSchema
from app.models.lot import Lot
from app.models.product import Product
from app.models.manufacturer_lot import ManufacturerLot
from app.models.trademark import Trademark
from app.models.manufacturer import Manufacturer


class LotRepository:

    request_schema = LotRequestSchema()
    rows_schema = LotRowSchema()

    def __request_data(self, data: dict) -> LotRequestOptions:
        req_options = self.request_schema.load(data)
        return req_options

    def __query(self):
        lot_qry = (
            db.session.query(
                Lot.LotPK.label("lot_id"),
                Lot.LotName.label("lot_name"),
                Lot.lot_date.label("lot_date"),
                Lot.ProductId.label("product_id"),
                Product.ProductName.label("product_name"),
                Lot.TradeMarkPK.label("trademark_id"),
                Trademark.TrademarkName.label("trademark_name"),
                Lot.SellerPK.label("seller_id"),
                Seller.SellerName.label("seller_name"),
                Lot.ManufacturerPK.label("manufacturer_id"),
                Manufacturer.ManufacturerName.label("manufacturer_name"),
                Lot.ManufacturerLotPK.label("manufacturer_lot_id"),
                ManufacturerLot.ManufacturerLotName.label("manufacturer_lot_name"),
            )
            .join(Product, Product.ProductId == Lot.ProductId)
            .join(Trademark, Trademark.TrademarkPK == Lot.TradeMarkPK)
            .join(Seller, Seller.SellerPK == Lot.SellerPK)
            .join(Manufacturer, Manufacturer.ManufacturerPK == Lot.ManufacturerPK)
            .join(
                ManufacturerLot,
                ManufacturerLot.ManufacturerLotPK == Lot.ManufacturerLotPK,
            )
            .order_by(Product.ProductName, Lot.lot_date)
        )
        return lot_qry

    def __rows(self, query, options: LotRequestOptions):
        offset = options.page * options.limit
        data = query.offset(offset).limit(options.limit)
        rows = self.rows_schema.dump(data, many=True)
        return rows

    def get_lots(self, data: dict):
        try:
            req_options = self.__request_data(data)
            query = self.__query()
            rows = self.__rows(query, req_options)
            total = query.count()
            response = {"rows": rows, "total": total}
            return jsonify(response)
        except OperationalError:
            raise DatabaseConnectionError
        except ValidationError:
            raise BadJSONError
        except TypeError:
            raise BadJSONError
