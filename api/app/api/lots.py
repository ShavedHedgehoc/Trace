from flask import jsonify, request, abort

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


@bp.route("/api/v1/lots", methods=['GET'])
def lots_data():

    # unused endpoint !!!

    page = request.args.get('_page', type=int)
    limit = request.args.get('_limit', type=int)

    offset = page * limit

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
    return (jsonify(response))


@bp.route("/api/v1/lots/<string:_lot_id>", methods=['GET'])
def lot_detail(_lot_id):
    page = request.args.get('_page', type=int)
    limit = request.args.get('_limit', type=int)

    offset = page * limit

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
        Batch.BatchPK.label('batch_id'),
        Batch.BatchName.label('batch_name'),
        Batch.BatchPK.label('batch_pk'),
        Batch.BatchDate.label('batch_date'),
        Batch.batch_year.label('year'),
        Batch.batch_month.label('month'),
        Batch.batch_number.label('number'),
        Batch.Plant.label('plant'),
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
        lot_sbqry.c.batch_id.label('batch_id'),
        lot_sbqry.c.batch_date.label('batch_date'),
        lot_sbqry.c.product_name.label('product_name'),
        lot_sbqry.c.year.label('year'),
        lot_sbqry.c.month.label('month'),
        lot_sbqry.c.number.label('number'),
        lot_sbqry.c.plant.label('plant'),
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
            'boil_id': row.batch_id,
            'boil_name': row.batch_name,
            'date':
                row.batch_date.strftime(
                    "%d-%m-%Y") if row.batch_date else None,
            'product_name': row.product_name,
            'plant':
            plant_dict[row.plant]
            if plant_dict[row.plant] else plant_dict['XZ']
        })

    response = {
        'rows': rows,
        'header': header_data,
        'total': total_records,
    }
    return jsonify(response)
