from flask import request
from flask_restful import Resource
from werkzeug.exceptions import BadRequest

from app.assets.api_decorators import role_required
from app.assets.user_roles import UserRoles
from app.assets.api_errors import BadJSONError, DatabaseConnectionError, LotNotExistsError
from app.assets.api_response import api_response
from app.assets.api_messages import ApiMessages
from app.repository.lot import LotRepository
from app.repository.lot_item import LotItemRepository


lot_repository = LotRepository()
lot_item_repository = LotItemRepository()


class Lots(Resource):

    @role_required([UserRoles.USER])
    def post(self):
        try:
            json_data = request.get_json(force=True)
            data = lot_repository.get_lots(json_data)
            return api_response(data, None, 200)
        except DatabaseConnectionError:
            return api_response(None, ApiMessages.DB_ERROR, 500)
        except BadRequest:
            return api_response(None, ApiMessages.EMPTY_JSON_BODY, 500)
        except BadJSONError:
            return api_response(None, ApiMessages.BAD_JSON_BODY, 500)


class LotItem(Resource):
    def post(self, id):
        try:
            json_data = request.get_json(force=True)
            data = lot_item_repository.get_lot_item(id, json_data)
            return api_response(data, None,  200)
        except DatabaseConnectionError:
            return api_response(None, ApiMessages.DB_ERROR, 500)
        except BadRequest:
            return api_response(None, ApiMessages.EMPTY_JSON_BODY, 500)
        except BadJSONError:
            return api_response(None, ApiMessages.BAD_JSON_BODY, 500)
        except LotNotExistsError:
            return api_response(None, ApiMessages.LOT_NOT_EXISTS, 404)
