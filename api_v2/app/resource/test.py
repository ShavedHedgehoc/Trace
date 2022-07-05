import os
from flask import jsonify
from flask_restful import Resource


class Test(Resource):
    def get(self):
        db = os.getenv("SECOND_API_DATABASE_DB")
        return jsonify("New api test route", {"Database": db})
