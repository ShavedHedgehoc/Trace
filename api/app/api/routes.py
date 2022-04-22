import operator
from crypt import methods
from datetime import datetime
import operator
from sqlite3 import Date
from flask import abort, jsonify, request
from flask_cors import cross_origin
from sqlalchemy import distinct, select
from sqlalchemy.sql import func, case
from sqlalchemy.sql.sqltypes import String
from sqlalchemy.sql.functions import coalesce

from . import bp
from app import db
from app.models import (
    Acceptance,
    Author,
    Barrel,
    Batch,
    Boil,
    Btproduct,
    Container,
    Doctype,
    Document,
    Load,
    Lot,
    Manufacturer,
    Manufacturerlot,
    Product,
    Seller,
    Trademark,
    Weighting,
)

plant_dict = {
    "П": "Пискаревка",
    "К": "Колпино",
    "XZ": "Нет данных",
}

plant_dict_for_report = {
    "П": "Пискаревка",
    "К": "Колпино",
}

month_dict = {
    "A": "Январь",
    "B": "Февраль",
    "C": "Март",
    "D": "Апрель",
    "E": "Май",
    "F": "Июнь",
    "G": "Июль",
    "H": "Август",
    "I": "Сентябрь",
    "J": "Октябрь",
    "K": "Ноябрь",
    "L": "Декабрь",
    "XZ": "Нет данных",
}


@bp.route("/api/v1/doc_count", methods=['GET'])
def doc_count():
    doc_qry = db.session.query(Document.DoctypePK)
    count = doc_qry.count()
    # response = {'data': count}
    response = count
    return(jsonify(response))


@bp.route("/api/v1/boils", methods=['GET'])
def boils_data():

    page = request.args.get('_page', type=int)
    limit = request.args.get('_limit', type=int)
    batch_search = request.args.get('_batch', type=str)
    marking_search = request.args.get('_marking', type=str)
    date_search = request.args.get('_date', type=str)
    month_search = request.args.get('_month', type=str)
    year_search = request.args.get('_year', type=str)
    plant_search = request.args.get('_plant', type=str)

    offset = page*limit

    boil_qry = db.session.query(
        Batch.BatchPK.label('BatchPK'),
        Batch.BatchName.label('BatchName'),
        Product.ProductMarking.label('batch_marking'),
        Batch.BatchDate.label('BatchDate'),
        Batch.batch_number.label('batch_number'),
        Batch.batch_month.label('batch_month'),
        Batch.batch_year.label('batch_year'),
        Batch.plant_letter.label('plant'),
    ).join(
        Btproduct, Batch.BatchPK == Btproduct.BatchPK, isouter=True
    ).join(
        Product, Btproduct.ProductId == Product.ProductId, isouter=True
    ).order_by(Batch.batch_year, Batch.batch_month, Batch.batch_number)

    # add filters

    filters = []
    year_selector_filters = []
    month_selector_filters = []
    plant_selector_filters = []

    if batch_search != '' and batch_search:
        filters.append(Batch.BatchName.like("%{}%".format(batch_search)))
        year_selector_filters.append(
            Batch.BatchName.like("%{}%".format(batch_search)))
        month_selector_filters.append(
            Batch.BatchName.like("%{}%".format(batch_search)))
        plant_selector_filters.append(
            Batch.BatchName.like("%{}%".format(batch_search)))

    if marking_search != '' and marking_search:
        if marking_search == 'Нет данных':
            filters.append(Product.ProductMarking.is_(None))
        else:
            filters.append(Product.ProductMarking.like(
                "%{}%".format(marking_search)))
        year_selector_filters.append(Product.ProductMarking.like(
            "%{}%".format(marking_search)))
        month_selector_filters.append(Product.ProductMarking.like(
            "%{}%".format(marking_search)))
        plant_selector_filters.append(Product.ProductMarking.like(
            "%{}%".format(marking_search)))

    if date_search != '' and date_search:
        # if date_search:
        split_date_search = date_search.split('-')
        filters.append((func.YEAR(Batch.BatchDate) == split_date_search[0]))
        year_selector_filters.append(
            (func.YEAR(Batch.BatchDate) == split_date_search[0]))
        month_selector_filters.append(
            (func.YEAR(Batch.BatchDate) == split_date_search[0]))
        plant_selector_filters.append(
            (func.YEAR(Batch.BatchDate) == split_date_search[0]))
        filters.append(func.MONTH(Batch.BatchDate) ==
                       split_date_search[1].lstrip('0'))
        year_selector_filters.append(func.MONTH(Batch.BatchDate) ==
                                     split_date_search[1].lstrip('0'))
        month_selector_filters.append(func.MONTH(Batch.BatchDate) ==
                                      split_date_search[1].lstrip('0'))
        plant_selector_filters.append(func.MONTH(Batch.BatchDate) ==
                                      split_date_search[1].lstrip('0'))
        filters.append(func.DAY(Batch.BatchDate) ==
                       split_date_search[2].lstrip('0'))
        year_selector_filters.append(func.DAY(Batch.BatchDate) ==
                                     split_date_search[2].lstrip('0'))
        month_selector_filters.append(func.DAY(Batch.BatchDate) ==
                                      split_date_search[2].lstrip('0'))
        plant_selector_filters.append(func.DAY(Batch.BatchDate) ==
                                      split_date_search[2].lstrip('0'))

    if month_search != '-' and month_search:
        filters.append(Batch.batch_month == month_search)
        year_selector_filters.append(Batch.batch_month == month_search)
        plant_selector_filters.append(Batch.batch_month == month_search)
    if year_search != '-' and year_search:
        filters.append(Batch.batch_year == year_search)
        month_selector_filters.append(Batch.batch_year == year_search)
        plant_selector_filters.append(Batch.batch_year == year_search)

    if plant_search != '-' and plant_search:
        filters.append(Batch.plant_letter.like(
            "%{}%".format(plant_search)))
        year_selector_filters.append(Batch.plant_letter.like(
            "%{}%".format(plant_search)))
        month_selector_filters.append(Batch.plant_letter.like(
            "%{}%".format(plant_search)))

    total_records = boil_qry.count()

    if len(filters) > 0:
        total_filter_records = boil_qry.filter(*filters).count()
        boil_data = boil_qry.filter(
            *filters).offset(offset).limit(limit)
    else:
        total_filter_records = total_records
        boil_data = boil_qry.offset(offset).limit(limit)

    # year selector

    year_sbqry = boil_qry.with_entities(
        Batch.batch_year
    ).filter(*year_selector_filters).subquery()

    distinct_years = db.session.query(year_sbqry).distinct()

    sorted_years = sorted(
        distinct_years, key=operator.attrgetter('batch_year'))

    # year_selector_options = []
    year_selector_options = [{'key': '-', 'value': 'Все'}]

    for r in sorted_years:
        option = {'key': r[0], 'value': r[0]}
        year_selector_options.append(option)

    # month selector

    month_sbqry = boil_qry.with_entities(
        Batch.batch_month
    ).filter(*month_selector_filters).subquery()

    distinct_months = db.session.query(month_sbqry).distinct()

    sorted_months = sorted(
        distinct_months, key=operator.attrgetter('batch_month'))

    # month_selector_options = []
    month_selector_options = [{'key': '-', 'value': 'Все'}]

    for r in sorted_months:
        option = {'key': r[0], 'value': month_dict[r[0]]}
        month_selector_options.append(option)

    # plant selector

    plant_sbqry = boil_qry.with_entities(
        Batch.plant_letter
    ).filter(*plant_selector_filters).subquery()
    distinct_plants = db.session.query(plant_sbqry).distinct()

    # plant_selector_options = []
    plant_selector_options = [{'key': '-', 'value': 'Все'}]

    for r in distinct_plants:
        option = {'key': r[0], 'value': plant_dict[r[0]]}
        plant_selector_options.append(option)

    rows = []

    for row in boil_data:
        rows.append({
            'batch_id': row.BatchPK,
            'name': row.BatchName,
            'marking': row.batch_marking if row.batch_marking
            else 'Нет данных',
            'date':
            row.BatchDate.strftime(
                "%d-%m-%Y") if row.BatchDate else 'Нет данных',
            'plant': plant_dict[row.plant],
            'month': month_dict[row.batch_month],
            'year': row.batch_year,
        })
    response = {'rows': rows,
                'total': total_filter_records,
                'plant_selector_options': plant_selector_options,
                'month_selector_options': month_selector_options,
                'year_selector_options': year_selector_options,
                }

    # print(response)

    return(jsonify(response))


@bp.route("/api/v1/boils/boildata/<string:batch_name>", methods=['GET'])
def boil_detail(batch_name):
    batch = db.session.query(Batch).filter(
        Batch.BatchName == batch_name).one_or_none()
    if batch is None:
        abort(404)
    else:
        batchid = batch.BatchPK
        batch_marking = db.session.query(
            Product
        ).join(
            Btproduct, Product.ProductId == Btproduct.ProductId
        ).filter(
            Btproduct.BatchPK == batchid
        ).one_or_none()

        batch_data = {
            'name': batch_name,
            'date':
            batch.BatchDate.strftime(
                "%d-%m-%Y") if batch.BatchDate else 'Нет данных',

            'plant': plant_dict[batch.Plant] if batch else 'no data',
            'marking': batch_marking.ProductMarking if batch_marking else 'no data'
        }

    response = {'batch_data': batch_data}
    return(jsonify(response))


@bp.route("/api/v1/boils/summary/<string:batch_name>", methods=['GET'])
def boil_summary_detail(batch_name):

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
    ).order_by(case(
        [(boil_subqry.c.product_name != '', boil_subqry.c.product_name), ],
        else_=wght_subqry.c.product_name
    ) .asc())

    boil_rows = boil_qry.all()

    if boil_rows is None:
        abort(404)

    data = []

    for row in boil_rows:
        product_id = row.b_product_id if row.b_product_id\
            else row.w_product_id
        product_name = row.b_product_name if row.b_product_name\
            else row.w_product_name
        state = (row.plan is not None) and (row.fact is not None)
        data.append({
            'product_id': product_id,
            'product_name': product_name,
            'state': state,
            'plan': row.plan,
            'fact':  row.fact
        })

    response = {'boil': {'data': data, }}

    return jsonify(response)


@bp.route("/api/v1/boils/weighting/<string:batch_name>", methods=['GET'])
def boil_weighting_detail(batch_name):

    batch = db.session.query(Batch).filter(
        Batch.BatchName == batch_name).one_or_none()

    if batch is None:
        abort(404)
    else:
        batchid = batch.BatchPK

    wght_qry = db.session.query(
        Weighting.ProductId.label('product_id'),
        Product.ProductName.label('product_name'),
        Weighting.Quantity.label('quantity'),
        Lot.LotPK.label('lot_id'),
        Lot.LotName.label('lot'),
        Author.AuthorName.label('user'),
        Document.CreateDate.label('date')
    ).join(
        Product, Weighting.ProductId == Product.ProductId
    ).join(
        Lot, Weighting.LotPK == Lot.LotPK
    ).join(
        Document, Weighting.DocumentPK == Document.DocumentPK
    ).join(
        Author, Document.AuthorPK == Author.AuthorPK
    ).filter(
        Weighting.BatchPK == batchid
    ).order_by((Product.ProductName).asc())

    weighting_rows = wght_qry.all()

    if weighting_rows is None:
        abort(404)

    data = []

    for row in weighting_rows:
        data.append({
            'product_id': row.product_id,
            'product_name': row.product_name,
            'quantity': str(row.quantity),
            'lot_id': row.lot_id,
            'lot': row.lot,
            'user': row.user,
            'date':
            row.date.strftime("%d-%m-%Y") if row.date else None,
            'time': row.date.strftime("%H:%M:%S") if row.date else None,
        })

    response = {'boil': {'data': data, }}

    return jsonify(response)


@bp.route("/api/v1/boils/load/<string:batch_name>", methods=['GET'])
def boil_load_detail(batch_name):

    batch = db.session.query(Batch).filter(
        Batch.BatchName == batch_name).one_or_none()

    if batch is None:
        abort(404)
    else:
        batchid = batch.BatchPK

    dist_cont_subqry = db.session.query(
        Load.ContainerPK
    ).filter(
        Load.BatchPK == batchid
    ).distinct().subquery()

    cont_subqry = db.session.query(
        Load.ContainerPK.label('container_id'),
        Author.AuthorName.label('user'),
        Document.CreateDate.label('date')
    ).distinct(
        Load.ContainerPK
    ).join(
        Document, Load.DocumentPK == Document.DocumentPK
    ).join(
        Author, Document.AuthorPK == Author.AuthorPK
    ).filter(
        Load.BatchPK == batchid
    ).subquery()

    wght_subqry = db.session.query(
        Weighting.ContainerPK.label('container_id'),
        Weighting.ProductId.label('product_id'),
        Product.ProductName.label('product_name'),
        Lot.LotPK.label('lot_id'),
        Lot.LotName.label('lot')
    ).join(
        Product, Weighting.ProductId == Product.ProductId
    ).join(
        Lot, Weighting.LotPK == Lot.LotPK
    ).filter(
        Weighting.ContainerPK.in_(dist_cont_subqry)
    ).subquery()

    load_qry = db.session.query(
        cont_subqry.c.user.label('user'),
        cont_subqry.c.date.label('date'),
        wght_subqry.c.product_id.label('product_id'),
        wght_subqry.c.product_name.label('product_name'),
        wght_subqry.c.lot_id.label('lot_id'),
        wght_subqry.c.lot.label('lot'),
    ).join(
        wght_subqry,
        cont_subqry.c.container_id == wght_subqry.c.container_id
    ).order_by(
        wght_subqry.c.product_name
    )

    load_data = load_qry.all()

    data = []

    for row in load_data:
        data.append({
            'product_id': row.product_id,
            'product_name': row.product_name,
            'lot': row.lot,
            'lot_id': row.lot_id,
            'user': row.user,
            'date':
            row.date.strftime("%d-%m-%Y") if row.date else None,
            'time': row.date.strftime("%H:%M:%S") if row.date else None,
        })

    response = {'boil': {'data': data}}

    return jsonify(response)


@bp.route("/api/v1/products", methods=['GET'])
def products_data():

    page = request.args.get('_page', type=int)
    limit = request.args.get('_limit', type=int)
    # code_search = request.args.get('code_search', type=str)
    # name_search = request.args.get('name_search', type=str)

    offset = page*limit

    filters = []

    product_qry = db.session.query(
        Product.ProductId,
        Product.ProductName
    ).filter(
        Product.ProductName.is_not(None)
    ).order_by(
        Product.ProductName
    )

    # if code_search != '-':
    #     filters.append(Product.ProductId.like(
    #         "%{}%".format(code_search)))

    # if name_search != '-':
    #     filters.append(Product.ProductName.like(
    #         "%{}%".format(name_search)))

    total_records = product_qry.count()

    # if len(filters) > 0:
    #     total_filter_records = product_qry.filter(*filters).count()
    #     product_data = product_qry.filter(
    #         *filters).offset(offset).limit(limit)
    # else:
    #     total_filter_records = total_records
    #     product_data = product_qry.offset(offset).limit(limit)

    # if product_data is None:
    #     abort(404)

    rows = []
    product_data = product_qry.offset(offset).limit(limit)
    for row in product_data:
        rows.append({
            'product_id': row.ProductId,
            'product_name': row.ProductName,
        })

    response = {'rows': rows, 'total': total_records}
    return(jsonify(response))


@bp.route("/api/v1/products/product_data/<string:product_id>", methods=['GET'])
def product_id_name_data(product_id):
    product = db.session.query(Product).filter(
        Product.ProductId == product_id).one_or_none()
    if product is None:
        abort(404)
    else:
        product_data = {
            'id': product.ProductId,
            'name': product.ProductName,
        }

    response = {'product_data': product_data}
    return(jsonify(response))


@bp.route("/api/v1/products/<string:product_id>", methods=['GET'])
def product_detail(product_id):

    product = db.session.query(Product).filter(
        Product.ProductId == product_id).one_or_none()
    if product is None:
        abort(404)

    page = request.args.get('page', type=int)
    per_page = request.args.get('per_page', type=int)

    # code_search = request.args.get('code_search', type=str)
    # name_search = request.args.get('name_search', type=str)

    offset = page*per_page
    limit = per_page

    # filters = []

    product_qry = db.session.query(
        Lot.LotPK.label('lot_id'),
        Lot.LotName.label('lot_name'),
        Lot.lot_date.label('lot_date'),
        Lot.SellerPK.label('seller_id'),
        Seller.SellerName.label('seller_name'),
        Lot.ManufacturerPK.label('manufacturer_id'),
        Manufacturer.ManufacturerName.label('manufacturer_name'),
        Lot.ManufacturerLotPK.label('manufacturer_lot_id'),
        Manufacturerlot.ManufacturerLotName.label('manufacturer_lot_name'),
        Lot.TradeMarkPK.label('trademark_id'),
        Trademark.TrademarkName.label('trademark_name')
    ).join(
        Seller, Seller.SellerPK == Lot.SellerPK,
        isouter=True
    ).join(
        Manufacturer, Manufacturer.ManufacturerPK == Lot.ManufacturerPK,
        isouter=True
    ).join(
        Manufacturerlot,
        Manufacturerlot.ManufacturerLotPK == Lot.ManufacturerLotPK,
        isouter=True
    ).join(
        Trademark, Trademark.TrademarkPK == Lot.TradeMarkPK,
        isouter=True
    ).filter(
        Lot.ProductId == product_id
    ).order_by(
        Lot.lot_date
    )

    total_records = product_qry.count()

    product_data = product_qry.offset(offset).limit(limit)

    data = []

    for row in product_data:
        data.append({
            'lot_id': row.lot_id,
            'lot_name': row.lot_name,
            'lot_date':
            row.lot_date.strftime("%d-%m-%Y") if row.lot_date else None,
            'seller_id': row.seller_id,
            'seller_name': row.seller_name,
            'manufacturer_id': row.manufacturer_id,
            'manufacturer_name': row.manufacturer_name,
            'manufacturer_lot_id': row.manufacturer_lot_id,
            'manufacturer_lot_name': row.manufacturer_lot_name,
            'trademark_id': row.trademark_id,
            'trademark_name': row.trademark_name,
        })

    response = {'product': {
        'data': data,
        'total': total_records,
    }}
    return(jsonify(response))


@bp.route("/api/v1/lots", methods=['GET'])
def lots_data():
    # add filters
    page = request.args.get('_page', type=int)
    limit = request.args.get('_limit', type=int)

    offset = page*limit
    # limit = per_page

    filters = []

    lot_qry = db.session.query(
        Lot.LotPK.label('lot_id'),
        Lot.LotName.label('lot_name'),
        Lot.lot_date.label('lot_date'),
        Lot.ProductId.label('product_id'),
        Product.ProductName.label('product_name'),
        Lot.TradeMarkPK.label('trademark_id'),
        Trademark.TrademarkName.label('trademark_name'),
        Lot.SellerPK.label('seller_id'),
        Seller.SellerName.label('seller_name'),
        Lot.ManufacturerPK.label('manufacturer_id'),
        Manufacturer.ManufacturerName.label('manufacturer_name'),
        Lot.ManufacturerLotPK.label('manufacturer_lot_id'),
        Manufacturerlot.ManufacturerLotName.label('manufacturer_lot_name'),
    ).join(
        Product, Product.ProductId == Lot.ProductId
    ).join(
        Trademark, Trademark.TrademarkPK == Lot.TradeMarkPK
    ).join(
        Seller, Seller.SellerPK == Lot.SellerPK
    ).join(
        Manufacturer, Manufacturer.ManufacturerPK == Lot.ManufacturerPK
    ).join(
        Manufacturerlot,
        Manufacturerlot.ManufacturerLotPK == Lot.ManufacturerLotPK
    ).order_by(Product.ProductName, Lot.lot_date)

    total_records = lot_qry.count()
    lot_data = lot_qry.offset(offset).limit(limit)

    rows = []

    for row in lot_data:
        rows.append({
            'lot_id': row.lot_id,
            'lot_name': row.lot_name,
            'lot_date':
            row.lot_date.strftime("%d-%m-%Y") if row.lot_date else None,
            'product_id': row.product_id,
            'product_name': row.product_name,
            'trademark_id': row.trademark_id,
            'trademark_name': row.trademark_name,
            'seller_id': row.seller_id,
            'seller_name': row.seller_name,
            'manufacturer_id': row.manufacturer_id,
            'manufacturer_name': row.manufacturer_name,
            'manufacturer_lot_id': row.manufacturer_lot_id,
            'manufacturer_lot_name': row.manufacturer_lot_name,
        })

    response = {'rows': rows, 'total': total_records, }
    return(jsonify(response))


@bp.route("/api/v1/lots/<string:_lot_id>", methods=['GET'])
def lot_detail(_lot_id):

    page = request.args.get('_page', type=int)
    limit = request.args.get('_limit', type=int)

    offset = page*limit

    lot = db.session.query(
        Lot.LotName.label('lot_name'),
        Product.ProductId.label('product_id'),
        Product.ProductName.label('product_name'),
        Trademark.TrademarkPK.label('trademark_id'),
        Trademark.TrademarkName.label('trademark_name'),
        Manufacturerlot.ManufacturerLotPK.label('manufacturer_lot_id'),
        Manufacturerlot.ManufacturerLotName.label('manufacturer_lot_name'),
    ).join(
        Product, Lot.ProductId == Product.ProductId, isouter=True
    ).join(
        Trademark, Lot.TradeMarkPK == Trademark.TrademarkPK, isouter=True
    ).join(
        Manufacturerlot,
        Lot.ManufacturerLotPK == Manufacturerlot.ManufacturerLotPK,
        isouter=True
    ).filter(
        Lot.LotPK == _lot_id
    ).one_or_none()

    if lot is None:
        abort(404)

    header_data = {
        'lot_name': lot.lot_name,
        'product_id': lot.product_id,
        'product_name': lot.product_name,
        'trademark_id': lot.trademark_id,
        'trademark_name': lot.trademark_name,
        'manufacturer_lot_id': lot.manufacturer_lot_id,
        'manufacturer_lot_name': lot.manufacturer_lot_name,
    }

    # filters = []

    lot_sbqry = db.session.query(
        Weighting.WeightingsPK.label('weightink_pk'),
        Batch.BatchName.label('batch_name'),
        Batch.BatchPK.label('batch_pk'),
        Batch.BatchDate.label('batch_date'),
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
    ).filter(
        Lot.LotPK == _lot_id
    ).subquery()

    lot_qry = db.session.query(
        lot_sbqry.c.batch_name.label('batch_name'),
        lot_sbqry.c.batch_date.label('batch_date'),
        lot_sbqry.c.product_name.label('product_name'),
        lot_sbqry.c.year.label('year'),
        lot_sbqry.c.month.label('month'),
        lot_sbqry.c.number.label('number')
    ).distinct(
        lot_sbqry.c.batch_name
    ).order_by(
        lot_sbqry.c.year,
        lot_sbqry.c.month,
        lot_sbqry.c.number
    )

    total_records = lot_qry.count()

    lot_data = lot_qry.offset(offset).limit(limit)

    rows = []

    for row in lot_data:
        rows.append({
            'name': row.batch_name,
            'date':
            row.batch_date.strftime("%d-%m-%Y") if row.batch_date else None,
            'product_name': row.product_name,
        })

    response = {
        'rows': rows,
        'header': header_data,
        'total': total_records,
    }
    return(jsonify(response))


@bp.route("/api/v1/trademarks", methods=['GET'])
def trademarks_data():

    # add filters
    page = request.args.get('_page', type=int)
    limit = request.args.get('_limit', type=int)

    offset = page*limit

    filters = []

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

    return(jsonify(response))


@ bp.route("/api/v1/trademarks/<string:trademark_id>", methods=['GET'])
def trademark_detail(trademark_id):

    trademark = db.session.query(
        Trademark.TrademarkName
    ).filter(
        Trademark.TrademarkPK == trademark_id
    ).one_or_none()

    if trademark is None:
        abort(404)

    page = request.args.get('page', type=int)
    per_page = request.args.get('per_page', type=int)

    offset = page*per_page
    limit = per_page

    trademark_sbqry = db.session.query(
        Weighting.WeightingsPK.label('weightink_pk'),
        Batch.BatchName.label('batch_name'),
        Batch.BatchPK.label('batch_pk'),
        Batch.BatchDate.label('batch_date'),
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
        trademark_sbqry.c.batch_date.label('batch_date'),
        trademark_sbqry.c.product_name.label('product_name'),
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

    data = []

    for row in trademark_data:
        data.append({
            'name': row.batch_name,
            'date':
            row.batch_date.strftime("%d-%m-%Y") if row.batch_date else None,
            'product_name': row.product_name,
        })

    response = {
        'data': data,
        # 'header_data': header_data,
        'total': total_records,
    }
    return(jsonify(response))


@ bp.route("/api/v1/products_trademarks/<string:product_id>", methods=['GET'])
def product_trademark_detail(product_id):

    product = db.session.query(
        Product.ProductId
    ).filter(
        Product.ProductId == product_id
    ).one_or_none()

    if product is None:
        abort(404)

    page = request.args.get('page', type=int)
    per_page = request.args.get('per_page', type=int)

    offset = page*per_page
    limit = per_page

    product_sbqry = db.session.query(
        Weighting.WeightingsPK.label('weightink_pk'),
        Batch.BatchName.label('batch_name'),
        Batch.BatchPK.label('batch_pk'),
        Batch.BatchDate.label('batch_date'),
        Batch.batch_year.label('year'),
        Batch.batch_month.label('month'),
        Batch.batch_number.label('number'),
        Lot.LotName.label('lot_name'),
        Product.ProductMarking.label('product_name'),
        Trademark.TrademarkName.label('trademark_name')
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
        Weighting.ProductId == product_id
    ).subquery()

    product_qry = db.session.query(
        product_sbqry.c.batch_name.label('batch_name'),
        product_sbqry.c.batch_date.label('batch_date'),
        product_sbqry.c.product_name.label('product_name'),
        product_sbqry.c.trademark_name.label('trademark_name'),
        product_sbqry.c.lot_name.label('lot_name'),
        product_sbqry.c.year.label('year'),
        product_sbqry.c.month.label('month'),
        product_sbqry.c.number.label('number')
    ).distinct(
        product_sbqry.c.batch_name,
        product_sbqry.c.lot_name,
    ).order_by(
        product_sbqry.c.year,
        product_sbqry.c.month,
        product_sbqry.c.number
    )

    total_records = product_qry.count()

    product_data = product_qry.offset(offset).limit(limit)

    data = []

    for row in product_data:
        data.append({
            'batch_name': row.batch_name,
            'date':
            row.batch_date.strftime("%d-%m-%Y") if row.batch_date else None,
            'lot_name': row.lot_name,
            'product_name': row.product_name,
            'trademark': row.trademark_name
        })

    response = {
        'data': data,
        'header_data': '',
        'total': total_records,
    }
    return(jsonify(response))


@ bp.route("/api/v1/sellers", methods=['GET'])
def sellers_data():
    pass


@ bp.route("/api/v1/sellers/<string:seller_id>", methods=['GET'])
def seller_detail(seller_id):
    pass


@ bp.route("/api/v1/manufacturers", methods=['GET'])
def manufacturers_data():
    pass


@ bp.route("/api/v1/manufacturers/<string:manufacturer_id>", methods=['GET'])
def manufacturer_detail(manufacturer_id):
    pass


@ bp.route("/api/v1/boils_report", methods=['GET'])
def boil_report():

    # insert check arguments
    plant_arg = request.args.get('_plant', type=str)
    start_arg = request.args.get('_start_date', type=str)
    end_arg = request.args.get('_end_date', type=str)
    # page = request.args.get('page', type=int)
    page = request.args.get('_page', type=int)
    # per_page = request.args.get('per_page', type=int)
    limit = request.args.get('_limit', type=int)

    offset = page*limit
    # limit = per_page

    filters = []

    if None in (plant_arg, start_arg, end_arg, page, limit):
        abort(500, 'Missing required request argument(s)')

    if (plant_arg not in plant_dict) and plant_arg != '-':
        abort(500, 'Plant isn`t in plant list')

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

    wght_total_sbqry = db.session.query(
        Weighting.BatchPK.label('batch_id'),
        Weighting.ProductId.label('product_id'),
        func.sum(Weighting.Quantity).label('total')
    ).group_by(
        Weighting.BatchPK,
        Weighting.ProductId
    ).subquery()

    report_sbqry = db.session.query(
        Boil.BatchPK.label('batch_id'),
        Batch.Plant.label('plant'),
        Batch.BatchName.label('batch_name'),
        Batch.BatchDate.label('batch_date'),
        Batch.batch_year.label('batch_year'),
        Batch.batch_month.label('batch_month'),
        Batch.batch_number.label('batch_number'),
        Batch.plant_letter.label('plant_letter')
    ).outerjoin(
        wght_total_sbqry, ((wght_total_sbqry.c.batch_id == Boil.BatchPK) & (
            wght_total_sbqry.c.product_id == Boil.ProductId))
    ).join(
        Batch, Batch.BatchPK == Boil.BatchPK
    ).filter(
        wght_total_sbqry.c.total.is_(None)
    ).filter(
        *filters
    ).subquery()

    report_qry = db.session.query(
        report_sbqry.c.batch_id.label('batch_id'),
        report_sbqry.c.batch_name.label('batch_name'),
        report_sbqry.c.batch_date.label('batch_date'),
        report_sbqry.c.batch_year,
        report_sbqry.c.batch_month,
        report_sbqry.c.batch_number,
        report_sbqry.c.plant_letter.label('plant_letter'),
    ).distinct(
        report_sbqry.c.batch_id
    ).order_by(
        report_sbqry.c.batch_year,
        report_sbqry.c.batch_month,
        report_sbqry.c.batch_number
    )

    total_records = report_qry.count()

    report_data = report_qry.offset(offset).limit(limit)

    plant_selector_options = []

    for rec in plant_dict_for_report:
        option = {'key': rec, 'value': plant_dict_for_report[rec]}
        plant_selector_options.append(option)

    rows = []

    for row in report_data:
        rows.append({
            'batch_id': row.batch_id,
            'batch_name': row.batch_name,
            'batch_date':
            row.batch_date.strftime("%d-%m-%Y") if row.batch_date else None,
            'plant': plant_dict_for_report[row.plant_letter]
        })

    response = {
        'rows': rows,

        'plant_selector_options': plant_selector_options,
        'total': total_records,
    }
    return(jsonify(response))


@bp.route("/api/v1/boils_report/<string:batch_name>", methods=['GET'])
def boil_card(batch_name):

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
        wght_subqry.c.fact.is_(None)
    ).order_by(case(
        [(boil_subqry.c.product_name != '', boil_subqry.c.product_name), ],
        else_=wght_subqry.c.product_name
    ) .asc())

    boil_rows = boil_qry.all()

    if boil_rows is None:
        abort(404)

    data = []

    for row in boil_rows:
        product_id = row.b_product_id if row.b_product_id\
            else row.w_product_id
        product_name = row.b_product_name if row.b_product_name\
            else row.w_product_name

        data.append({
            'product_id': product_id,
            'product_name': product_name,
            'plan': row.plan,
            'fact':  0
        })

    response = {'boil': {'data': data, }}

    return jsonify(response)
