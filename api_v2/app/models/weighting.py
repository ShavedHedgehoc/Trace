from app import db
from sqlalchemy.sql import func


class Weighting(db.Model):
    __tablename__ = "Weightings"

    # replace 's' from fieldname 'WeightingsPK' in mssql?
    WeightingsPK = db.Column(db.Integer, primary_key=True)
    DocumentPK = db.Column(db.Integer, nullable=False)
    ContainerPK = db.Column(db.Integer, nullable=False)
    ProductId = db.Column(db.String(6), nullable=False)
    BatchPK = db.Column(db.Integer, nullable=False)
    LotPK = db.Column(db.Integer, nullable=False)
    Quantity = db.Column(db.Numeric(
        precision=9, scale=5), nullable=False)

    @ classmethod
    def get_sum_by_batch_product(cls, batchid, productid):
        sum = db.session.query(func.sum(cls.Quantity).label('sum')).filter(
            cls.BatchPK == batchid).filter(cls.ProductId == productid).scalar()
        if sum is None:
            return 0
        return sum
