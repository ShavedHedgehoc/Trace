from marshmallow import Schema, fields


class LotRowSchema(Schema):

    boil_id = fields.Str()
    boil_name = fields.Str()
    date = fields.Str()
    product_name = fields.Str()
    plant = fields.Str()


class LotHeaderSchema(Schema):

    lot_name = fields.Str()
    product_id = fields.Str()
    product_name = fields.Str()
    trademark_id = fields.Str()
    trademark_name = fields.Str()
    manufacturer_lot_id = fields.Str()
    manufacturer_lot_name = fields.Str()
