from flask_restful import Resource

from app.repository.document import DocumentsRepository
from app.assets.api_errors import DatabaseConnectionError
from app.assets.api_response import api_response
from app.assets.api_messages import ApiMessages


documents_repository = DocumentsRepository()


class Documents(Resource):

    def get(self):
        try:
            result = documents_repository.get()
            return api_response(result, None, 200)            
        except DatabaseConnectionError:
            return api_response(None, ApiMessages.DB_ERROR, 500)
            
