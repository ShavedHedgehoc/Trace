from datetime import datetime
from flask import jsonify, request, abort
from sqlalchemy import func, or_, case

from .bp import bp
from app import db
from .constants import plant_dict_for_report
from app.models import Batch, Weighting, Boil, Product, Btproduct


@bp.route("/api/v1/boils_report", methods=['GET'])
def boil_report():
    plant_arg = request.args.get('_plant', type=str)
    start_arg = request.args.get('_start_date', type=str)
    end_arg = request.args.get('_end_date', type=str)
    exactly = request.args.get('_exactly', type=str)
    page = request.args.get('_page', type=int)
    limit = request.args.get('_limit', type=int)

    offset = page * limit

    filters = []

    if None in (plant_arg, start_arg, end_arg, exactly, page, limit):
        abort(500, 'Missing required request argument(s)')

    if plant_arg != '-':
        filters.append(Batch.Plant == plant_arg)

    try:
        start_date = datetime.strptime(start_arg, '%Y-%m-%d')
    except ValueError:
        abort(500, 'Can`t parse start date')

    filters.append(Batch.BatchDate >= start_date)

    try:
        end_date = datetime.strptime(end_arg, '%Y-%m-%d')
    except ValueError:
        abort(500, 'Can`t parse end date')

    filters.append(Batch.BatchDate <= end_date)

    wght_total_subquery = db.session.query(
        Weighting.BatchPK.label('batch_id'),
        Weighting.ProductId.label('product_id'),
        func.sum(Weighting.Quantity).label('total')
    ).group_by(
        Weighting.BatchPK,
        Weighting.ProductId
    ).subquery()

    if exactly == 'true':
        filters.append(wght_total_subquery.c.total != Boil.Quantity)
    else:
        filters.append(wght_total_subquery.c.total.is_(None))

    report_subquery = db.session.query(
        Boil.BatchPK.label('batch_id'),
        Batch.Plant.label('plant'),
        Batch.BatchName.label('batch_name'),
        Batch.BatchDate.label('batch_date'),
        Batch.batch_year.label('batch_year'),
        Batch.batch_month.label('batch_month'),
        Batch.batch_number.label('batch_number'),
        Batch.plant_letter.label('plant_letter'),
        Product.ProductMarking.label('marking'),
    ).outerjoin(
        wght_total_subquery,
        ((wght_total_subquery.c.batch_id == Boil.BatchPK) & (
            wght_total_subquery.c.product_id == Boil.ProductId))
    ).join(
        Batch, Batch.BatchPK == Boil.BatchPK
    ).join(
        Btproduct, Btproduct.BatchPK == Boil.BatchPK
    ).join(
        Product, Product.ProductId == Btproduct.ProductId
    ).filter(
        *filters
    ).subquery()

    report_qry = db.session.query(
        report_subquery.c.batch_id.label('batch_id'),
        report_subquery.c.batch_name.label('batch_name'),
        report_subquery.c.batch_date.label('batch_date'),
        report_subquery.c.batch_year.label('batch_year'),
        report_subquery.c.batch_month,
        report_subquery.c.batch_number,
        report_subquery.c.marking.label('marking'),
        report_subquery.c.plant_letter.label('plant_letter'),
    ).distinct(
        report_subquery.c.batch_id
    ).order_by(
        report_subquery.c.batch_year,
        report_subquery.c.batch_month,
        report_subquery.c.batch_number
    )

    total_records = report_qry.count()
    report_data = report_qry.offset(offset).limit(limit)
    plant_selector_options = [{'key': '-', 'value': 'Все'}]

    for rec in plant_dict_for_report:
        option = {'key': rec, 'value': plant_dict_for_report[rec]}
        plant_selector_options.append(option)

    rows = []

    for row in report_data:
        rows.append({
            'batch_id': row.batch_id,
            'batch_name': row.batch_name,
            'marking': row.marking,
            'batch_date':
                row.batch_date.strftime(
                    "%d-%m-%Y") if row.batch_date else None,
            'plant': plant_dict_for_report[row.plant_letter]
        })

    response = {
        'rows': rows,
        'plant_selector_options': plant_selector_options,
        'total': total_records,
    }
    return jsonify(response)


@bp.route("/api/v1/boils_report/<string:batch_name>", methods=['GET'])
def boil_card(batch_name):

    exactly = request.args.get('_exactly', type=str)

    batch = db.session.query(Batch).filter(
        Batch.BatchName == batch_name).one_or_none()

    if batch is None:
        abort(404)
    else:
        batchid = batch.BatchPK

    boil_subqry = db.session.query(
        Boil.BatchPK.label('batch_id'),
        Boil.ProductId.label('product_id'),
        Product.ProductName.label('product_name'),
        func.sum(Boil.Quantity).label('plan'),
    ).join(
        Product, Boil.ProductId == Product.ProductId
    ).filter(
        Boil.BatchPK == batchid
    ).group_by(
        Boil.BatchPK,
        Boil.ProductId,
        Product.ProductName
    ).subquery()

    wght_subqry = db.session.query(
        Weighting.BatchPK,
        Weighting.ProductId.label('product_id'),
        Product.ProductName.label('product_name'),
        func.sum(Weighting.Quantity).label('fact')
    ).join(
        Product, Weighting.ProductId == Product.ProductId
    ).filter(
        Weighting.BatchPK == batchid
    ).group_by(
        Weighting.BatchPK,
        Weighting.ProductId,
        Product.ProductName
    ).subquery()

    filters = []

    if exactly == 'true':
        filters.append(
            or_(wght_subqry.c.fact != boil_subqry.c.plan,
                wght_subqry.c.fact.is_(None))
        )

    else:
        filters.append(wght_subqry.c.fact.is_(None))

    boil_qry = db.session.query(
        boil_subqry.c.product_id.label('b_product_id'),
        boil_subqry.c.product_name.label('b_product_name'),
        boil_subqry.c.plan.label('plan'),
        wght_subqry.c.product_id.label('w_product_id'),
        wght_subqry.c.product_name.label('w_product_name'),
        wght_subqry.c.fact.label('fact')
    ).join(
        wght_subqry,
        boil_subqry.c.product_id == wght_subqry.c.product_id,
        full=True
    ).filter(
        *filters
    ).order_by(case(
        [(boil_subqry.c.product_name != '', boil_subqry.c.product_name), ],
        else_=wght_subqry.c.product_name
    ).asc())

    boil_rows = boil_qry.all()

    # if boil_rows is None:
    #     abort(404)

    rows = []

    for row in boil_rows:
        product_id = row.b_product_id if row.b_product_id \
            else row.w_product_id
        product_name = row.b_product_name if row.b_product_name \
            else row.w_product_name

        rows.append({
            'product_id': product_id,
            'product_name': product_name,
            'plan': row.plan,
            'fact': row.fact or 0
        })

    response = {'rows': rows, 'batch_id':batchid}

    return jsonify(response)
