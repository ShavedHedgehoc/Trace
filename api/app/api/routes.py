from flask import jsonify

from . import bp
from app import db
from app.models import Document


@bp.route("/api/v1/doc_count", methods=['GET'])
def doc_count():
    doc_qry = db.session.query(Document.DoctypePK)
    count = doc_qry.count()
    response = count
    return jsonify(response)


@bp.route("/api/v1/sellers", methods=['GET'])
def sellers_data():
    pass


@bp.route("/api/v1/sellers/<string:seller_id>", methods=['GET'])
def seller_detail(seller_id):
    pass


@bp.route("/api/v1/manufacturers", methods=['GET'])
def manufacturers_data():
    pass


@bp.route("/api/v1/manufacturers/<string:manufacturer_id>", methods=['GET'])
def manufacturer_detail(manufacturer_id):
    pass
