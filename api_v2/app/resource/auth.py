from flask import request
from flask_restful import Resource
from flask_jwt_extended import decode_token, get_jwt_identity
from flask_jwt_extended import jwt_required
from flask_jwt_extended import set_refresh_cookies
from flask_jwt_extended import unset_refresh_cookies


from app.assets.api_messages import ApiMessages
from app.assets.api_response import api_response
from app.assets.api_dataclasses import Payload

from app.repository.token import TokenRepository
from app.repository.session import SessionRepository
from app.repository.user import UserRepository

from app.assets.api_errors import DatabaseConnectionError
from app.assets.api_errors import TokenNotExistsError
from app.assets.api_errors import UserExistsError
from app.assets.api_errors import UserNotExistsError
from app.assets.api_errors import MissingCredentialsError
from app.assets.api_errors import PassNotEqualError

token_repository = TokenRepository()
user_repository = UserRepository()
session_repository = SessionRepository()


class Register(Resource):
    def post(self):
        try:
            json_data = request.get_json(force=True)            
            data, token = user_repository.register(json_data)            
            resp = api_response(data, None, 201)
            set_refresh_cookies(resp, token)
            return resp
        except MissingCredentialsError:
            return api_response(None, ApiMessages.MISSING_CREDENTIALS, 500)
        except UserExistsError:
            return api_response(None, ApiMessages.USER_EXISTS, 500)
        except DatabaseConnectionError:
            return api_response(None, ApiMessages.DB_ERROR, 500)


class Login(Resource):
    def post(self):
        try:
            json_data = request.get_json(force=True)
            data, token = user_repository.login(json_data)            
            resp = api_response(data, None, 200)
            set_refresh_cookies(resp, token)
            return resp
        except MissingCredentialsError:
            return api_response(None, ApiMessages.MISSING_CREDENTIALS, 500)
        except UserNotExistsError:
            return api_response(None, ApiMessages.USER_NOT_EXISTS, 404)
        except PassNotEqualError:
            return api_response(None, ApiMessages.PASS_NOT_EQUAL, 401)
        except DatabaseConnectionError:
            return api_response(None, ApiMessages.DB_ERROR, 500)        


class Refresh(Resource):
    @jwt_required(refresh=True, locations="cookies")
    def post(self):
        try:
            token = request.cookies.get("refresh_token_cookie")
            identity = get_jwt_identity()
            user_data = Payload(**identity)
            data, token = user_repository.refresh(token, user_data)            
            resp = api_response(data, None, 200)
            set_refresh_cookies(resp, token)
            return resp
        except TokenNotExistsError:
            resp = api_response(None, ApiMessages.TOKEN_NOT_EXISTS, 401)
            unset_refresh_cookies(resp)
            return resp
        except DatabaseConnectionError:
            return api_response(None, ApiMessages.DB_ERROR, 500)


class Logout(Resource):
    def post(self):
        try:
            token = request.cookies.get("refresh_token_cookie")
            if token:
                d_token = decode_token(token, allow_expired=True)
                user_repository.logout(token, d_token)
            resp = api_response(None, ApiMessages.LOGOUT, 200)
            unset_refresh_cookies(resp)
            return resp
        except DatabaseConnectionError:
            return api_response(None, ApiMessages.DB_ERROR, 500)
