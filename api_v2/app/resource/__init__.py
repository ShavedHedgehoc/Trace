import os
from flask_restful import Api

from app.resource.test import Test
from app.assets.api_routes import ApiRoutes
from app.resource.auth import Logout, Refresh, Register, Login
from app.resource.document import Documents


api = Api(prefix=os.getenv("SECOND_API_PREFIX"))  # add variable to config

api.add_resource(Test, "/")
api.add_resource(Register, ApiRoutes.REGISTER)
api.add_resource(Login, ApiRoutes.LOGIN)
api.add_resource(Refresh, ApiRoutes.REFRESH)
api.add_resource(Logout, ApiRoutes.LOGOUT)
api.add_resource(Documents, ApiRoutes.DOC_COUNTER)

