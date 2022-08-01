from flask import request
from flask_restful import Resource
from werkzeug.exceptions import BadRequest

from app.repository.boil import BoilRepository
from app.assets.api_decorators import role_required
from app.assets.user_roles import UserRoles
from app.assets.api_errors import BadJSONError, DatabaseConnectionError
from app.assets.api_response import api_response
from app.assets.api_messages import ApiMessages


boil_repository = BoilRepository()


class Boils(Resource):
    # @role_required([UserRoles.USER])
    def post(self):
        try:
            json_data = request.get_json(force=True)
            data = boil_repository.get_boils(json_data)
            return api_response(data, None, 200)
        except DatabaseConnectionError:
            return api_response(None, ApiMessages.DB_ERROR, 500)
        except BadRequest:
            return api_response(None, ApiMessages.EMPTY_JSON_BODY, 500)
        except BadJSONError:
            return api_response(None, ApiMessages.BAD_JSON_BODY, 500)


class BoilItem(Resource):
    def get(self, id):
        try:
            data = boil_repository.get_boil(id)
            return api_response(data, None,  200)
        except DatabaseConnectionError:
            return api_response(None, ApiMessages.DB_ERROR, 500)
