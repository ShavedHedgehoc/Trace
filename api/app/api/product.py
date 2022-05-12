from flask import jsonify, request

from .bp import bp
from app import db
from app.models import (
    Batch,
    Btproduct,
    Lot,
    Manufacturer,
    Manufacturerlot,
    Product,
    Seller,
    Trademark,
    Weighting
)

from .constants import plant_dict


@bp.route("/api/v1/products", methods=['GET'])
def products_data():

    page = request.args.get('_page', type=int)
    limit = request.args.get('_limit', type=int)
    product_id = request.args.get('_product_id', type=str)
    product_name = request.args.get('_product_name', type=str)
    offset = page * limit

    filters = []

    product_qry = db.session.query(
        Product.ProductId,
        Product.ProductName
    ).filter(
        Product.ProductName.is_not(None)
    ).order_by(
        Product.ProductName
    )

    if product_id:
        filters.append(Product.ProductId.like("%{}%".format(product_id)))
    if product_name:
        filters.append(Product.ProductName.like("%{}%".format(product_name)))

    total_records = product_qry.count()

    if len(filters) > 0:
        total = product_qry.filter(*filters).count()
        product_data = product_qry.filter(
            *filters).offset(offset).limit(limit)
    else:
        total = total_records
        product_data = product_qry.offset(offset).limit(limit)

    rows = []

    for row in product_data:
        rows.append({
            'product_id': row.ProductId,
            'product_name': row.ProductName,
        })

    response = {'rows': rows, 'total': total}
    return jsonify(response)


@bp.route("/api/v1/products/<string:product_id>", methods=['GET'])
def product_detail(product_id):

    page = request.args.get('_page', type=int)
    limit = request.args.get('_limit', type=int)
    lot_name = request.args.get('_lot_name', type=str)
    seller_name = request.args.get('_seller_name', type=str)
    manufacturer_name = request.args.get('_manufacturer_name', type=str)
    manufacturer_lot_name = request.args.get(
        '_manufacturer_lot_name', type=str)
    trademark_name = request.args.get('_trademark_name', type=str)

    offset = page * limit

    product = db.session.query(Product).filter(
        Product.ProductId == product_id).one_or_none()

    header = {
        'product_id': product_id,
        'product_name': product.ProductName if product else 'Нет данных'
    }

    filters = []

    filters.append(Lot.ProductId == product_id)

    if lot_name:
        filters.append(Lot.LotName.like("%{}%".format(lot_name)))

    if seller_name:
        filters.append(Seller.SellerName.like("%{}%".format(seller_name)))

    if manufacturer_name:
        filters.append(Manufacturer.ManufacturerName.like(
            "%{}%".format(manufacturer_name)))

    if manufacturer_lot_name:
        filters.append(
            Manufacturerlot.ManufacturerLotName.like(
                "%{}%".format(manufacturer_lot_name))
        )

    if trademark_name:
        filters.append(Trademark.TrademarkName.like(
            "%{}%".format(trademark_name)))

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
        *filters
    ).order_by(
        Lot.lot_date
    )

    total = product_qry.count()

    product_data = product_qry.offset(offset).limit(limit)

    rows = []

    for row in product_data:
        rows.append({
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

    response = {
        'header': header,
        'rows': rows,
        'total': total
    }
    return jsonify(response)


@bp.route("/api/v1/products_trademarks/<string:product_id>", methods=['GET'])
def product_trademark_detail(product_id):

    page = request.args.get('_page', type=int)
    limit = request.args.get('_limit', type=int)

    offset = page * limit

    product = db.session.query(Product).filter(
        Product.ProductId == product_id).one_or_none()

    header = {
        'product_id': product_id,
        'product_name': product.ProductName if product else 'Нет данных'
    }

    product_sbqry = db.session.query(
        Weighting.WeightingsPK.label('weightink_pk'),
        Batch.BatchName.label('batch_name'),
        Batch.BatchPK.label('batch_id'),
        Batch.BatchDate.label('batch_date'),
        Batch.Plant.label('plant'),
        Batch.batch_year.label('year'),
        Batch.batch_month.label('month'),
        Batch.batch_number.label('number'),
        Lot.LotPK.label('lot_id'),
        Lot.LotName.label('lot_name'),
        Product.ProductMarking.label('product_name'),
        Trademark.TrademarkPK.label('trademark_id'),
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
        product_sbqry.c.batch_id.label('batch_id'),
        product_sbqry.c.batch_name.label('batch_name'),
        product_sbqry.c.plant.label('plant'),
        product_sbqry.c.batch_date.label('batch_date'),
        product_sbqry.c.product_name.label('product_name'),
        product_sbqry.c.trademark_id.label('trademark_id'),
        product_sbqry.c.trademark_name.label('trademark_name'),
        product_sbqry.c.lot_id.label('lot_id'),
        product_sbqry.c.lot_name.label('lot_name'),
        product_sbqry.c.year.label('year'),
        product_sbqry.c.month.label('month'),
        product_sbqry.c.number.label('number')
    ).distinct(
        product_sbqry.c.batch_id,
        product_sbqry.c.batch_name,
        product_sbqry.c.lot_id,
        product_sbqry.c.lot_name,
    ).order_by(
        product_sbqry.c.year,
        product_sbqry.c.month,
        product_sbqry.c.number
    )

    total = product_qry.count()

    product_qry_rows = product_qry.offset(offset).limit(limit)

    product_trademark_rows = []

    for row in product_qry_rows:
        product_trademark_rows.append({
            'boil_id': row.batch_id,
            'boil_name': row.batch_name,
            'boil_date':
                row.batch_date.strftime(
                    "%d-%m-%Y") if row.batch_date else None,
            'plant':
            plant_dict[row.plant] if row.plant else 'Нет данных',
            'lot_id': row.lot_id,
            'lot_name': row.lot_name,
            'product_name': row.product_name,
            'trademark_id': row.trademark_id,
            'trademark_name': row.trademark_name
        })

    response = {
        'header': header,
        'rows': product_trademark_rows,
        'total': total
    }
    return jsonify(response)
