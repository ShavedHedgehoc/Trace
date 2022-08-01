from flask import request
from flask_restful import Resource
from werkzeug.exceptions import BadRequest

from app.assets.api_decorators import role_required
from app.assets.user_roles import UserRoles
from app.assets.api_errors import BadJSONError, DatabaseConnectionError, ProductNotExistsError
from app.assets.api_response import api_response
from app.assets.api_messages import ApiMessages
from app.repository.product import ProductRepository
from app.repository.product_item import ProductItemRepository
from app.repository.product_trademarks import ProductTrademarksRepository


product_repository = ProductRepository()
product_item_repository  = ProductItemRepository()
product_trademark_repository = ProductTrademarksRepository()


class Products(Resource):

    # @role_required([UserRoles.USER])
    def post(self):
        try:
            json_data = request.get_json(force=True)
            data = product_repository.get_products(json_data)
            return api_response(data, None, 200)
        except DatabaseConnectionError:
            return api_response(None, ApiMessages.DB_ERROR, 500)
        except BadRequest:
            return api_response(None, ApiMessages.EMPTY_JSON_BODY, 500)
        except BadJSONError:
            return api_response(None, ApiMessages.BAD_JSON_BODY, 500)


class ProductItem(Resource):
    def post(self, id):
        try:
            json_data = request.get_json(force=True)
            data = product_item_repository.get_product_item(id, json_data)
            return api_response(data, None,  200)
        except DatabaseConnectionError:
            return api_response(None, ApiMessages.DB_ERROR, 500)
        except BadRequest:
            return api_response(None, ApiMessages.EMPTY_JSON_BODY, 500)
        except BadJSONError:
            return api_response(None, ApiMessages.BAD_JSON_BODY, 500)
        except ProductNotExistsError:
            return api_response(None, ApiMessages.PRODUCT_NOT_EXISTS, 404)


class ProductTrademarks(Resource):
    def post(self, id):
        try:
            json_data = request.get_json(force=True)
            data = product_trademark_repository.get_product_trademarks(id, json_data)
            return api_response(data, None,  200)
        except DatabaseConnectionError:
            return api_response(None, ApiMessages.DB_ERROR, 500)
        except BadRequest:
            return api_response(None, ApiMessages.EMPTY_JSON_BODY, 500)
        except BadJSONError:
            return api_response(None, ApiMessages.BAD_JSON_BODY, 500)
