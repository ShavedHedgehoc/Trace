import os
from flask import jsonify
from flask_restful import Resource
from app.assets.user_roles import UserRoles

from app.assets.api_decorators import role_required


class Home(Resource):
    # @role_required([UserRoles.USER])
    def get(self):
        db = os.getenv("SECOND_API_DATABASE_DB")
        return jsonify("New api test route", {"Database": db})
