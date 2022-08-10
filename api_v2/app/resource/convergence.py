from flask import request
from flask_restful import Resource

from app.assets.api_messages import ApiMessages
from app.assets.api_errors import DatabaseConnectionError, BadJSONError
from app.assets.api_response import api_response
from app.repository.convergence import ConvergenceRepository
from app.repository.convergence_item import ConvergenceItemRepository

from werkzeug.exceptions import BadRequest

convergence_repository = ConvergenceRepository()
convergence_item_repository = ConvergenceItemRepository()


class Convergence(Resource):
    def post(self):
        try:
            json_data = request.get_json(force=True)
            data = convergence_repository.get_convergenses(json_data)
            return api_response(data, None, 200)
        except DatabaseConnectionError:
            return api_response(None, ApiMessages.DB_ERROR, 500)
        except BadRequest:
            return api_response(None, ApiMessages.EMPTY_JSON_BODY, 500)
        except BadJSONError:
            return api_response(None, ApiMessages.BAD_JSON_BODY, 500)


class ConvergenceItem(Resource):    
    def post(self, name):
        try:
            json_data = request.get_json(force=True)                            
            data = convergence_item_repository.get_convergense_item(name, json_data)
            return api_response(data, None,  200)
        except DatabaseConnectionError:
            return api_response(None, ApiMessages.DB_ERROR, 500)
        except BadJSONError:
            return api_response(None, ApiMessages.BAD_JSON_BODY, 500)
