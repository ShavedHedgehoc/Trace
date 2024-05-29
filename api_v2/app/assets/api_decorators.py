from functools import wraps
from typing import List
from flask import jsonify
from flask_jwt_extended import get_jwt_identity, verify_jwt_in_request
from app.assets.api_messages import ApiMessages
from app.assets.api_response import api_response

from app.repository.role import RoleRepository

role_repository = RoleRepository()


def role_required(roles: List[str]):
    def wrapper(fn):
        @wraps(fn)
        def decorator(*args, **kwargs):
            verify_jwt_in_request(locations="headers")
            identity = get_jwt_identity()
            user_roles = role_repository.get_user_roles(identity["id"])
            list_intersect = [val for val in user_roles if val in roles]
            if len(list_intersect) > 0:
                return fn(*args, **kwargs)
            else:
                return api_response(None, ApiMessages.ROLE_REQUIRED, 403)
        return decorator
    return wrapper
