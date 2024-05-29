from datetime import datetime
from marshmallow import Schema, fields, post_dump, post_load

from app.assets.api_dataclasses import CellsContainFilter, CellsContainRequestOptions


class CellsContainFilterSchema(Schema):
    cell = fields.Str()
    product_id = fields.Str()
    product_name = fields.Str()

    @post_load
    def post_load_hook(self, data, **kwargs):
        return CellsContainFilter(**data)


class CellsContainRequestSchema(Schema):
    page = fields.Int(missing=0)
    limit = fields.Int(missing=10)
    filter = fields.Nested(CellsContainFilterSchema)
    order = fields.Str(missing="by_cells")

    @post_load
    def make_options(self, data, **kwargs) -> CellsContainRequestOptions:
        return CellsContainRequestOptions(**data)


class CellsContainRowSchema(Schema):
    id = fields.Int()
    cell_id = fields.Int()
    cell_name = fields.Str()
    product_id = fields.Str()
    product_name = fields.Str()
    lot_id = fields.Int()
    lot_name = fields.Str()
    exp = fields.DateTime()

    @post_dump(pass_many=True)
    def handle_values(self, data, **kwargs):
        for item in data:
            if item["exp"]:
                date_string = datetime.strptime(
                    item["exp"], "%Y-%m-%dT%H:%M:%S")
                item["exp"] = datetime.strftime(date_string, "%d-%m-%Y")
            else:
                item["exp"] = "Нет данных"
        return data
