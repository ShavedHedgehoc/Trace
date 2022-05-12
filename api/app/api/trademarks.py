from flask import jsonify, request

from .bp import bp
from app import db
from app.models import (
    Batch,
    Btproduct,
    Lot,
    Manufacturer,
    Product,
    Seller,
    Trademark,
    Weighting
)

from .constants import plant_dict


@bp.route("/api/v1/trademarks", methods=['GET'])
def trademarks_data():

    page = request.args.get('_page', type=int)
    limit = request.args.get('_limit', type=int)
    trademark_name = request.args.get('_trademark_name', type=str)
    product_id = request.args.get('_product_id', type=str)
    product_name = request.args.get('_product_name', type=str)

    offset = page * limit

    filters = []

    if trademark_name:
        filters.append(Trademark.TrademarkName.like(
            "%{}%".format(trademark_name)))

    if product_id:
        filters.append(Product.ProductId.like("%{}%".format(product_id)))

    if product_name:
        filters.append(Product.ProductName.like(
            "%{}%".format(product_name)))

    lot_sbqry = db.session.query(
        Lot.ProductId.label('product_id'),
        Lot.TradeMarkPK.label('trademark_id')
    ).group_by(
        Lot.ProductId,
        Lot.TradeMarkPK,
    ).subquery()

    trademark_qry = db.session.query(
        lot_sbqry.c.product_id.label('product_id'),
        lot_sbqry.c.trademark_id.label('trademark_id'),
        Trademark.TrademarkName.label('trademark_name'),
        Product.ProductName.label('product_name')
    ).join(
        Trademark, Trademark.TrademarkPK == lot_sbqry.c.trademark_id
    ).join(
        Product, Product.ProductId == lot_sbqry.c.product_id
    ).filter(
        *filters
    ).order_by(
        Trademark.TrademarkName
    )

    total_records = trademark_qry.count()

    trademark_data = trademark_qry.offset(offset).limit(limit)

    data = []

    for row in trademark_data:
        data.append({
            'trademark_id': row.trademark_id,
            'trademark_name': row.trademark_name,
            'product_id': row.product_id,
            'product_name': row.product_name,
        })

    response = {
        'rows': data,
        'total': total_records,
    }

    return jsonify(response)


@bp.route("/api/v1/trademarks/<string:trademark_id>", methods=['GET'])
def trademark_detail(trademark_id):

    page = request.args.get('_page', type=int)
    limit = request.args.get('_limit', type=int)

    offset = page * limit

    lot_sbqry = db.session.query(
        Lot.ProductId.label('product_id'),
        Lot.TradeMarkPK.label('trademark_id'),
    ).group_by(
        Lot.ProductId,
        Lot.TradeMarkPK,
    ).subquery()

    trademark = db.session.query(
        lot_sbqry.c.product_id.label('product_id'),
        lot_sbqry.c.trademark_id.label('trademark_id'),
        Trademark.TrademarkName.label('trademark_name'),
        Product.ProductName.label('product_name'),
        Product.ProductId.label('product_id'),
    ).join(
        Trademark, Trademark.TrademarkPK == lot_sbqry.c.trademark_id
    ).join(
        Product, Product.ProductId == lot_sbqry.c.product_id
    ).filter(
        Trademark.TrademarkPK == trademark_id
    ).one_or_none()

    header = {
        'product_id':
        trademark.product_id if trademark else 'Нет данных',
        'trademark_name':
        trademark.trademark_name if trademark else 'Нет данных',
        'product_name':
        trademark.product_name if trademark else 'Нет данных',
    }

    trademark_sbqry = db.session.query(
        Weighting.WeightingsPK.label('weightink_pk'),
        Batch.BatchName.label('batch_name'),
        Batch.BatchPK.label('batch_id'),
        Batch.BatchDate.label('batch_date'),
        Batch.Plant.label('plant'),
        Batch.batch_year.label('year'),
        Batch.batch_month.label('month'),
        Batch.batch_number.label('number'),
        Lot.LotName.label('lot_name'),
        Product.ProductMarking.label('product_name')
    ).join(
        Batch, Weighting.BatchPK == Batch.BatchPK, isouter=True
    ).join(
        Lot, Weighting.LotPK == Lot.LotPK, isouter=True
    ).join(
        Btproduct, Batch.BatchPK == Btproduct.BatchPK, isouter=True
    ).join(
        Product, Btproduct.ProductId == Product.ProductId, isouter=True
    ).join(
        Trademark, Lot.TradeMarkPK == Trademark.TrademarkPK, isouter=True
    ).filter(
        Trademark.TrademarkPK == trademark_id
    ).subquery()

    trademark_qry = db.session.query(
        trademark_sbqry.c.batch_name.label('batch_name'),
        trademark_sbqry.c.batch_id.label('batch_id'),
        trademark_sbqry.c.batch_date.label('batch_date'),
        trademark_sbqry.c.product_name.label('product_name'),
        trademark_sbqry.c.plant.label('plant'),
        trademark_sbqry.c.year.label('year'),
        trademark_sbqry.c.month.label('month'),
        trademark_sbqry.c.number.label('number')
    ).distinct(
        trademark_sbqry.c.batch_name
    ).order_by(
        trademark_sbqry.c.year,
        trademark_sbqry.c.month,
        trademark_sbqry.c.number
    )

    total_records = trademark_qry.count()

    trademark_data = trademark_qry.offset(offset).limit(limit)

    rows = []

    for row in trademark_data:
        rows.append({
            'boil_id': row.batch_id,
            'boil_name': row.batch_name,
            'date':
                row.batch_date.strftime(
                    "%d-%m-%Y") if row.batch_date else None,
            'plant':
            plant_dict[row.plant] if row.plant else 'Нет данных',
            'product_name': row.product_name,
        })

    response = {
        'rows': rows,
        'header': header,
        'total': total_records,
    }
    return jsonify(response)
