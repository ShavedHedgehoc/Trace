from flask import jsonify
from pyodbc import OperationalError

from app import db
from app.models.document import Document
from app.assets.api_errors import DatabaseConnectionError


class DocumentsRepository():
    def get(self):
        try:
            doc_count = db.session.query(Document.DoctypePK).count()
            return jsonify(doc_count)
        except OperationalError:
            raise DatabaseConnectionError
