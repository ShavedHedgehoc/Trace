from datetime import datetime
from marshmallow import Schema, fields, post_dump, post_load
from app.assets.api_dataclasses import LotItemRequestOptions


class LotRequestSchema(Schema):
    page = fields.Int(missing=0)
    limit = fields.Int(missing=10)

    @post_load
    def make_options(self, data, **kwargs) -> LotItemRequestOptions:
        return LotItemRequestOptions(**data)


class LotRowSchema(Schema):

    lot_id = fields.Int()
    lot_name = fields.Str()
    lot_date = fields.DateTime()
    product_id = fields.Str()
    product_name = fields.Str()
    trademark_id = fields.Int()
    trademark_name = fields.Str()
    seller_id = fields.Int()
    seller_name = fields.Str()
    manufacturer_id = fields.Int()
    manufacturer_name = fields.Str()
    manufacturer_lot_id = fields.Int()
    manufacturer_lot_name = fields.Str()

    @post_dump(pass_many=True)
    def handle_values(self, data, **kwargs):
        for item in data:
            if item["lot_date"]:
                date_string = datetime.strptime(item["lot_date"], "%Y-%m-%d")
                item["lot_date"] = datetime.strftime(date_string, "%d-%m-%Y")
            else:
                item["lot_date"] = "Нет данных"
        return data


class LotItemRequestSchema(Schema):
    page = fields.Int(missing=0)
    limit = fields.Int(missing=10)

    @post_load
    def make_options(self, data, **kwargs) -> LotItemRequestOptions:
        return LotItemRequestOptions(**data)


class LotItemHeaderSchema(Schema):
    lot_name = fields.Str()
    product_id = fields.Str()
    product_name = fields.Str()
    trademark_id = fields.Str()
    trademark_name = fields.Str()
    manufacturer_lot_id = fields.Str()
    manufacturer_lot_name = fields.Str()


class LotItemRowSchema(Schema):

    boil_id = fields.Int()
    boil_name = fields.Str()
    date = fields.DateTime()
    plant = fields.Str()
    product_name = fields.Str()

    @post_dump(pass_many=True)
    def handle_values(self, data, **kwargs):
        for item in data:
            item["plant"] = item["plant"] if item["plant"] else "Нет данных"
            if item["date"]:
                date_string = datetime.strptime(
                    item["date"], "%Y-%m-%dT%H:%M:%S")
                item["date"] = datetime.strftime(date_string, "%d-%m-%Y")
            else:
                item["date"] = "Нет данных"
        return data
