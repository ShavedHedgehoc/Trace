# from typing import List
from flask import jsonify
from marshmallow import ValidationError
from sqlalchemy.exc import OperationalError

from app import db
from app.assets.api_dataclasses import ProductTrademarksRequestOptions
from app.assets.api_errors import DatabaseConnectionError, BadJSONError
from app.models.batch import Batch
from app. models.bt_product import BtProduct
from app.models.lot import Lot
from app.models.product import Product
from app.models.trademark import Trademark
from app.models.weighting import Weighting

class ProductTrademarksRepository():
    
    # def __init__(self) -> None:
    #     self.filters: List[str] = []
        
        
    def __load_request_options(self, data: dict) -> ProductTrademarksRequestOptions:
        try:
            req_options = self.request_schema.load(data)
            return req_options
        except ValidationError:
            raise BadJSONError
        except TypeError:
            raise BadJSONError
        
    def __subquery(self, id:str):
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
            BtProduct, Batch.BatchPK == BtProduct.BatchPK, isouter=True
        ).join(
            Product, BtProduct.ProductId == Product.ProductId, isouter=True
        ).join(
            Trademark, Lot.TradeMarkPK == Trademark.TrademarkPK, isouter=True
        ).filter(
            Weighting.ProductId == id
        ).subquery()
        return product_sbqry
    
    def __query(self, id:str):
        product_sbqry = self.__subquery(id)
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
        return product_qry
        
    
    
    def get_product_trademarks(self, id: str, data: dict):
        req_options = self.__load_request_options(data)
        header = ""
        query= self.__query(id)
        rows=self.__get_rows()
        total = query.count()
        
        # product = db.session.query(Product).filter(
        #     Product.ProductId == product_id).one_or_none()

        # header = {
        #     'product_id': product_id,
        #     'product_name': product.ProductName if product else 'Нет данных'
        # }

       

        
        

        # product_qry_rows = product_qry.offset(offset).limit(limit)

        # product_trademark_rows = []

        # for row in product_qry_rows:
        #     product_trademark_rows.append({
        #         'boil_id': row.batch_id,
        #         'boil_name': row.batch_name,
        #         'boil_date':
        #             row.batch_date.strftime(
        #                 "%d-%m-%Y") if row.batch_date else None,
        #         'plant':
        #         plant_dict[row.plant] if row.plant else 'Нет данных',
        #         'lot_id': row.lot_id,
        #         'lot_name': row.lot_name,
        #         'product_name': row.product_name,
        #         'trademark_id': row.trademark_id,
        #         'trademark_name': row.trademark_name
        #     })

        response = {'header': header,'rows': rows,'total': total}
        return jsonify(response)
