import operator
from urllib import response
from flask import jsonify, request, abort
from sqlalchemy.sql import func, case


from .bp import bp
from app import db
from app.models import (
    Author,
    Batch,
    Boil,
    Btproduct,
    Document,
    Load,
    Lot,
    Product,
    Weighting
)

from .constants import month_dict, plant_dict


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

    offset = page * limit

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

    year_sbqry = boil_qry.with_entities(
        Batch.batch_year
    ).filter(*year_selector_filters).subquery()

    distinct_years = db.session.query(year_sbqry).distinct()

    sorted_years = sorted(
        distinct_years, key=operator.attrgetter('batch_year'))

    year_selector_options = [{'key': '-', 'value': 'Все'}]

    for r in sorted_years:
        option = {'key': r[0], 'value': r[0]}
        year_selector_options.append(option)

    month_sbqry = boil_qry.with_entities(
        Batch.batch_month
    ).filter(*month_selector_filters).subquery()

    distinct_months = db.session.query(month_sbqry).distinct()

    sorted_months = sorted(
        distinct_months, key=operator.attrgetter('batch_month'))

    month_selector_options = [{'key': '-', 'value': 'Все'}]

    for r in sorted_months:
        option = {'key': r[0], 'value': month_dict[r[0]]}
        month_selector_options.append(option)

    plant_sbqry = boil_qry.with_entities(
        Batch.plant_letter
    ).filter(*plant_selector_filters).subquery()
    distinct_plants = db.session.query(plant_sbqry).distinct()

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
                row.BatchDate.strftime("%d-%m-%Y") if row.BatchDate
                else 'Нет данных',
            'plant': plant_dict[row.plant] if row.plant
            else 'Нет данных',
            'month': month_dict[row.batch_month],
            'year': row.batch_year,
        })
    response = {'rows': rows,
                'total': total_filter_records,
                'plant_selector_options': plant_selector_options,
                'month_selector_options': month_selector_options,
                'year_selector_options': year_selector_options,
                }

    return jsonify(response)


@bp.route("/api/v1/boils/<string:boil_id>", methods=['GET'])
def boil_detail(boil_id):

    boil = db.session.query(
        Batch.BatchName.label('boil_name'),
        Batch.BatchDate.label('boil_date'),
        Batch.Plant.label('boil_plant')
    ).filter(
        Batch.BatchPK == boil_id
    ).one_or_none()

    boil_marking = db.session.query(
        Product
    ).join(
        Btproduct, Product.ProductId == Btproduct.ProductId
    ).filter(
        Btproduct.BatchPK == boil_id
    ).one_or_none()

    header = {
        'boil_name': boil.boil_name if boil else 'Нет данных',
        'date': (
            boil.boil_date.strftime(
                "%d-%m-%Y") if boil.boil_date else 'Нет данных'
        )if boil else 'Нет данных',
        'plant': (
            plant_dict[boil.boil_plant] if boil.boil_plant else 'Нет данных'
        ) if boil else 'Нет данных',
        'marking': boil_marking.ProductMarking
        if boil_marking else 'Нет данных'
    }

    summary_boil_subqry = db.session.query(
        Boil.BatchPK.label('batch_id'),
        Boil.ProductId.label('product_id'),
        Product.ProductName.label('product_name'),
        func.sum(Boil.Quantity).label('plan'),
    ).join(
        Product, Boil.ProductId == Product.ProductId
    ).filter(
        Boil.BatchPK == boil_id
    ).group_by(
        Boil.BatchPK,
        Boil.ProductId,
        Product.ProductName
    ).subquery()

    summary_wght_subqry = db.session.query(
        Weighting.BatchPK,
        Weighting.ProductId.label('product_id'),
        Product.ProductName.label('product_name'),
        func.sum(Weighting.Quantity).label('fact')
    ).join(
        Product, Weighting.ProductId == Product.ProductId
    ).filter(
        Weighting.BatchPK == boil_id
    ).group_by(
        Weighting.BatchPK,
        Weighting.ProductId,
        Product.ProductName
    ).subquery()

    summary_qry = db.session.query(
        summary_boil_subqry.c.product_id.label('b_product_id'),
        summary_boil_subqry.c.product_name.label('b_product_name'),
        summary_boil_subqry.c.plan.label('plan'),
        summary_wght_subqry.c.product_id.label('w_product_id'),
        summary_wght_subqry.c.product_name.label('w_product_name'),
        summary_wght_subqry.c.fact.label('fact')
    ).join(
        summary_wght_subqry,
        summary_boil_subqry.c.product_id == summary_wght_subqry.c.product_id,
        full=True
    ).order_by(case(
        [(summary_boil_subqry.c.product_name != '',
          summary_boil_subqry.c.product_name), ],
        else_=summary_wght_subqry.c.product_name
    ).asc())

    summary_qry_rows = summary_qry.all()

    summary_rows = []

    for row in summary_qry_rows:
        product_id = row.b_product_id if row.b_product_id \
            else row.w_product_id
        product_name = row.b_product_name if row.b_product_name \
            else row.w_product_name
        state = (row.plan is not None) and (row.fact is not None)
        summary_rows.append({
            'product_id': product_id,
            'product_name': product_name,
            'plan': row.plan,
            'fact': row.fact
        })

    weighting_qry = db.session.query(
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
        Weighting.BatchPK == boil_id
    ).order_by((Product.ProductName).asc())

    weighting_qry_rows = weighting_qry.all()

    weighting_rows = []

    for row in weighting_qry_rows:
        weighting_rows.append({
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

    distinct_container_subqry = db.session.query(
        Load.ContainerPK
    ).filter(
        Load.BatchPK == boil_id
    ).distinct().subquery()

    container_subqry = db.session.query(
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
        Load.BatchPK == boil_id
    ).subquery()

    load_weighting_subqry = db.session.query(
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
        Weighting.ContainerPK.in_(distinct_container_subqry)
    ).subquery()

    load_qry = db.session.query(
        container_subqry.c.user.label('user'),
        container_subqry.c.date.label('date'),
        load_weighting_subqry.c.product_id.label('product_id'),
        load_weighting_subqry.c.product_name.label('product_name'),
        load_weighting_subqry.c.lot_id.label('lot_id'),
        load_weighting_subqry.c.lot.label('lot'),
    ).join(
        load_weighting_subqry,
        container_subqry.c.container_id == load_weighting_subqry.c.container_id
    ).order_by(
        load_weighting_subqry.c.product_name
    )

    load_qry_rows = load_qry.all()

    load_rows = []

    for row in load_qry_rows:
        load_rows.append({
            'product_id': row.product_id,
            'product_name': row.product_name,
            'lot': row.lot,
            'lot_id': row.lot_id,
            'user': row.user,
            'date':
                row.date.strftime("%d-%m-%Y") if row.date else None,
            'time': row.date.strftime("%H:%M:%S") if row.date else None,
        })

    response = {
        'header': header,
        'summaryRows': summary_rows,
        'weightingRows': weighting_rows,
        'loadRows': load_rows
    }

    return jsonify(response)
