from flask import Response, jsonify, make_response

def api_response(data, message: str, status: int) -> Response:
    if data: return make_response(data, status)
    return make_response(jsonify({"msg": message}), status)
