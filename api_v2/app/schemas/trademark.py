from datetime import datetime
from marshmallow import Schema, fields, missing, post_dump, post_load


from app.assets.api_dataclasses import TrademarkFilter, TrademarkItemRequestOptions, TrademarkRequestOptions


class TrademarkFilterSchema(Schema):
    trademark_name = fields.Str(missing="")
    product_id = fields.Str(missing="")
    product_name = fields.Str(missing="")

    @post_load
    def post_load_hook(self, data, **kwargs):
        return TrademarkFilter(**data)


class TrademarkRequestSchema(Schema):
    page = fields.Int(missing=0)
    limit = fields.Int(missing=10)
    filter = fields.Nested(TrademarkFilterSchema)

    @post_load
    def make_options(self, data, **kwargs) -> TrademarkRequestOptions:
        return TrademarkRequestOptions(**data)


class TrademarkRowSchema(Schema):
    trademark_id = fields.Int()
    trademark_name = fields.Str()
    product_id = fields.Str()
    product_name = fields.Str()


class TrademarkItemRequestSchema(Schema):
    page = fields.Int(missing=0)
    limit = fields.Int(missing=10)

    @post_load
    def make_options(self, data, **kwargs) -> TrademarkRequestOptions:
        return TrademarkItemRequestOptions(**data)


class TrademarkItemRowSchema(Schema):
    boil_id = fields.Int()
    boil_name = fields.Str()
    date = fields.DateTime()
    plant = fields.Str()
    product_name = fields.Str()

    @post_dump(pass_many=True)
    def handle_values(self, data, **kwargs):
        for item in data:
            if item["date"]:
                date_string = datetime.strptime(
                    item["date"], "%Y-%m-%dT%H:%M:%S")
                item["date"] = datetime.strftime(date_string, "%d-%m-%Y")
            else:
                item["date"] = "Нет данных"
        return data


class TrademarkItemHeaderSchema(Schema):
    product_id = fields.Str()
    trademark_name = fields.Str()
    product_name = fields.Str()
