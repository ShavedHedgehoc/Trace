from flask import request
from flask_restful import Resource
from werkzeug.exceptions import BadRequest

from app.assets.api_decorators import role_required
from app.assets.user_roles import UserRoles
from app.assets.api_errors import BadJSONError, DatabaseConnectionError, CellsContainError
from app.assets.api_response import api_response
from app.assets.api_messages import ApiMessages
from app.repository.cells_contain import CellsContainRepository
from app.repository.cells_contain_item import CellsContainItemRepository

cells_contain_repository = CellsContainRepository()
cells_contain_item_repository = CellsContainItemRepository()

class CellsContain(Resource):

    @role_required([UserRoles.TECHNOLOGIST, UserRoles.SPECIALIST, UserRoles.ADMIN])
    def post(self):
        try:
            json_data = request.get_json(force=True)
            data = cells_contain_repository.get_cell_contains(json_data)
            return api_response(data, None, 200)
        except DatabaseConnectionError:
            return api_response(None, ApiMessages.DB_ERROR, 500)
        except BadRequest:
            return api_response(None, ApiMessages.EMPTY_JSON_BODY, 500)
        except BadJSONError:
            return api_response(None, ApiMessages.BAD_JSON_BODY, 500)
    
class CellsContainItem(Resource):

    @role_required([UserRoles.SPECIALIST, UserRoles.ADMIN])
    def delete(self, id: int):
        try:
            data = cells_contain_item_repository.delete_by_id(id)
            return api_response(None, ApiMessages.RECORD_DELETE_SUCCESS, 200)
        except DatabaseConnectionError:
            return api_response(None, ApiMessages.DB_ERROR, 500)
        except CellsContainError:
            return api_response(None, ApiMessages.CELLS_CONTAIN_ID_ERROR, 500)