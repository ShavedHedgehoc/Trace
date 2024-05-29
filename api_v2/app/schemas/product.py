from datetime import datetime
from marshmallow import Schema, fields, missing, post_dump, post_load


from app.assets.api_dataclasses import ProductFilter, ProductItemFilter, ProductItemRequestOptions, ProductRequestOptions, ProductTrademarksItemRequestOptions, TrademarkFilter, TrademarkItemRequestOptions, TrademarkRequestOptions


class ProductFilterSchema(Schema):
    product_id = fields.Str(missing="")
    product_name = fields.Str(missing="")

    @post_load
    def post_load_hook(self, data, **kwargs):
        return ProductFilter(**data)


class ProductRequestSchema(Schema):
    page = fields.Int(missing=0)
    limit = fields.Int(missing=10)
    filter = fields.Nested(ProductFilterSchema)

    @post_load
    def make_options(self, data, **kwargs) -> ProductRequestOptions:
        return ProductRequestOptions(**data)


class ProductRowSchema(Schema):
    product_id = fields.Str()
    product_name = fields.Str()


class ProductItemFilterSchema(Schema):
    lot_name = fields.Str(missing="")
    seller_name = fields.Str(missing="")
    manufacturer_name = fields.Str(missing="")
    manufacturer_lot_name = fields.Str(missing="")
    trademark_name = fields.Str(missing="")

    @post_load
    def post_load_hook(self, data, **kwargs):
        return ProductItemFilter(**data)


class ProductItemRequestSchema(Schema):
    page = fields.Int(missing=0)
    limit = fields.Int(missing=10)
    filter = fields.Nested(ProductItemFilterSchema)

    @post_load
    def make_options(self, data, **kwargs) -> ProductItemRequestOptions:
        return ProductItemRequestOptions(**data)


class ProductItemRowSchema(Schema):
    lot_id = fields.Str()
    lot_name = fields.Str()
    lot_date = fields.DateTime()
    seller_id = fields.Int()
    seller_name = fields.Str()
    manufacturer_id = fields.Int()
    manufacturer_name = fields.Str()
    manufacturer_lot_id = fields.Int()
    manufacturer_lot_name = fields.Str()
    trademark_id = fields.Int()
    trademark_name = fields.Str()

    @post_dump(pass_many=True)
    def handle_values(self, data, **kwargs):
        for item in data:
            if item["lot_date"]:
                date_string = datetime.strptime(
                    item["lot_date"], "%Y-%m-%d")
                item["lot_date"] = datetime.strftime(date_string, "%d-%m-%Y")
            else:
                item["lot_date"] = "Нет данных"
        return data


class ProductItemHeaderSchema(Schema):
    product_id = fields.Str()
    product_name = fields.Str(missing="Нет данных")


class ProductTrademarkItemRequestSchema(Schema):
    page = fields.Int(missing=0)
    limit = fields.Int(missing=10)

    @post_load
    def make_options(self, data, **kwargs) -> ProductItemRequestOptions:
        return ProductTrademarksItemRequestOptions(**data)


class ProductTrademarkItemRowSchema(Schema):
    boil_id = fields.Int()
    boil_name = fields.Str()
    boil_date = fields.DateTime()
    plant = fields.Str()
    lot_id = fields.Int()
    lot_name = fields.Str()
    product_name = fields.Str()
    trademark_id = fields.Int()
    trademark_name = fields.Str()
    
    @post_dump(pass_many=True)
    def handle_values(self, data, **kwargs):
        for item in data:
            if item["boil_date"]:
                date_string = datetime.strptime(
                    item["boil_date"], "%Y-%m-%dT%H:%M:%S")
                item["boil_date"] = datetime.strftime(date_string, "%d-%m-%Y")
            else:
                item["boil_date"] = "Нет данных"
        return data    
    
class ProductTrademarkItemHeaderSchema(Schema):
    product_id = fields.Str()
    product_name = fields.Str(missing="Нет данных")
