from marshmallow import Schema, fields


class SessionSchema(Schema):

    SessionPK = fields.Str()
    UserPK = fields.Str()
    StartTime = fields.DateTime()
    EndTime = fields.DateTime()
    