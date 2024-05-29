from dataclasses import dataclass
from marshmallow import Schema, fields, INCLUDE, post_load


@dataclass
class TokenData:
    id: int
    name: str
    email: str
    session: str


class SubSchema(Schema):
    class Meta:
        unknown = INCLUDE
    
    id = fields.Integer()
    name = fields.String()
    email = fields.String()
    session = fields.String()
    # roles = fields.List(fields.Str())


class TokenSchema(Schema):
    class Meta:
        unknown = INCLUDE

    sub = fields.Nested(SubSchema)

    @post_load
    def make_token_data(self, data, **kwargs) -> TokenData:
        return TokenData(
            id=data["sub"]["id"],
            name=data["sub"]["name"],
            email=data["sub"]["email"],
            session=data["sub"]["session"]
        )
