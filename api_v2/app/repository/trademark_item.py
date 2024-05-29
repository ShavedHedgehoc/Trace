from flask import jsonify
from marshmallow import ValidationError
from sqlalchemy import func
from sqlalchemy.exc import OperationalError

from app import db
from app.assets.api_dataclasses import TrademarkItemRequestOptions
from app.assets.api_errors import DatabaseConnectionError, BadJSONError
from app.schemas.trademark import TrademarkItemRequestSchema, TrademarkItemRowSchema, TrademarkItemHeaderSchema
from app.models.batch import Batch
from app.models.bt_product import BtProduct
from app.models.weighting import Weighting
from app.models.lot import Lot
from app.models.trademark import Trademark
from app.models.product import Product
from app.models.plant import Plant


class TrademarkItemRepository:
    
    request_schema = TrademarkItemRequestSchema()
    rows_schema = TrademarkItemRowSchema()
    header_schema = TrademarkItemHeaderSchema()

    def __request_data(self, data: dict) -> TrademarkItemRequestOptions:        
        req_options = self.request_schema.load(data)
        return req_options      
        
    def __query(self, id:int):
        trademark_query = db.session.query(
            func.min(Weighting.WeightingsPK),
            Batch.BatchPK.label('boil_id'),
            Batch.BatchName.label('boil_name'),            
            Batch.BatchDate.label('date'),
            Batch.batch_year,
            Batch.batch_month,
            Batch.batch_number,
            Product.ProductMarking.label('product_name'),
            Plant.PlantName.label('plant')            
        ).join(
            Lot, Weighting.LotPK == Lot.LotPK, isouter=True    
        ).join(
            Trademark, Lot.TradeMarkPK == Trademark.TrademarkPK, isouter=True
        ).join(
            Batch, Weighting.BatchPK == Batch.BatchPK, isouter=True
        ).join(
            Plant, Plant.PlantAlias == Batch.plant_letter, isouter=True        
        ).join(
            BtProduct, Batch.BatchPK == BtProduct.BatchPK, isouter=True
        ).join(
            Product, BtProduct.ProductId == Product.ProductId, isouter=True        
        ).filter(
            Trademark.TrademarkPK == id
        ).group_by(
            Batch.BatchPK,
            Batch.BatchName,
            Batch.BatchDate,
            Batch.batch_year,
            Batch.batch_month,
            Batch.batch_number,
            Product.ProductMarking,
            Plant.PlantName            
        ).order_by(
            Batch.batch_year,
            Batch.batch_month,
            Batch.batch_number
        )        
        return trademark_query
    

    def __header(self, id: int):
        data = db.session.query(
            Trademark.TrademarkName.label('trademark_name'),
            func.min(Product.ProductId).label('product_id'),
            func.min(Product.ProductName).label('product_name')
        ).join(
            Lot, Lot.TradeMarkPK == Trademark.TrademarkPK
        ).join(
            Product, Product.ProductId == Lot.ProductId
        ).filter(
            Trademark.TrademarkPK == id
        ).group_by(
            Trademark.TrademarkName
        ).one_or_none()        
        header = self.header_schema.dump(data)
        return header

    def __rows(self, query, options: TrademarkItemRequestOptions):
        offset = options.page*options.limit
        data = query.offset(offset).limit(options.limit)
        rows = self.rows_schema.dump(data, many=True)
        return rows

    def get_trademark_item(self, id: int, data: dict):
        try:
            req_options = self.__request_data(data)
            query = self.__query(id)
            header = self.__header(id)
            rows = self.__rows(query, req_options)
            total = query.count()
            response = {'rows': rows, 'header': header, 'total': total}
            return jsonify(response)
        except OperationalError:
            raise DatabaseConnectionError
        except ValidationError:
            raise BadJSONError
        except TypeError:
            raise BadJSONError
