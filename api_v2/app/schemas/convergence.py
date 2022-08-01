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