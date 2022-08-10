from datetime import datetime

from marshmallow import Schema, fields, missing, post_dump, post_load, pre_dump

from app.assets.api_dataclasses import ConvergenceFilter, ConvergenceItemRequestOptions, ConvergenceRequestOptions


class ConvergenceFilterSchema(Schema):
    plant = fields.Str(missing="-")
    exactly = fields.Boolean(missing=False)
    start_date = fields.Date()
    end_date = fields.Date()

    @post_load
    def post_load_hook(self, data, **kwargs):
        # try:
        return ConvergenceFilter(**data)
        # except TypeError:
        #     raise


class ConvergenceRequestSchema(Schema):
    page = fields.Int(missing=0)
    limit = fields.Int(missing=10)
    filter = fields.Nested(ConvergenceFilterSchema)

    @post_load
    def make_options(self, data, **kwargs) -> ConvergenceRequestOptions:
        return ConvergenceRequestOptions(**data)


class ConvergenceItemRequestSchema(Schema):
    exactly = fields.Boolean(missing=False)

    @post_load
    def make_options(self, data, **kwargs) -> ConvergenceItemRequestOptions:
        return ConvergenceItemRequestOptions(**data)


class ConvergenceRowSchema(Schema):
    batch_id = fields.Str()
    batch_name = fields.Str()
    marking = fields.Str()
    batch_date = fields.Date()
    plant = fields.Str()

    @post_dump(pass_many=True)
    def handle_values(self, data, **kwargs):
        for item in data:
            if item["batch_date"]:
                date_string = datetime.strptime(
                    item["batch_date"], "%Y-%m-%d")
                item["batch_date"] = datetime.strftime(date_string, "%d-%m-%Y")
            else:
                item["batch_date"] = "Нет данных"
        return data


class ConvergenceItemRowSchema(Schema):
    b_product_id = fields.Str()
    b_product_name = fields.Str()
    plan = fields.Decimal()
    w_product_id = fields.Str()
    w_product_name = fields.Str()
    fact = fields.Decimal()

    @post_dump(pass_many=True)
    def handle_values(self, data, **kwargs):
        for item in data:
            if item["b_product_id"]:
                item["product_id"] = item["b_product_id"]
            else:
                item["product_id"] = item["w_product_id"]
            if item["b_product_name"]:
                item["product_name"] = item["b_product_name"]
            else:
                item["product_name"] = item["w_product_name"]
            del item["b_product_id"]
            del item["b_product_name"]
            del item["w_product_id"]
            del item["w_product_name"]
        return data
