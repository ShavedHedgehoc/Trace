from marshmallow import Schema, fields, post_load, pre_dump
from app.assets.api_dataclasses import UserLoginData
from app.models.user import User


class UserRegisterSchema(Schema):
    name = fields.Str(required=True)
    email = fields.Email(required=True)
    password = fields.Str(required=True, load_only=True)

    @post_load
    def make_user(self, data, **kwargs) -> User:
        user = User()
        user.UserEmail = data["email"]
        user.UserPassword = data["password"]
        user.UserName = data["name"]
        return user

    @pre_dump
    def make_responce(self, data: User, **kwargs):
        resp = {"name": data.UserName, "email": data.UserEmail}
        return resp


class UserLoginSchema(Schema):
    id = fields.Str()
    name = fields.Str()
    email = fields.Email(required=True)
    password = fields.Str(required=True, load_only=True)

    @post_load
    def make_user(self, data, **kwargs) -> UserLoginData:
        return UserLoginData(**data)

    @pre_dump
    def make_responce(self, data: User, **kwargs):
        resp = {
            "id": data.UserPK,
            "name": data.UserName,
            "email": data.UserEmail
        }
        return resp
