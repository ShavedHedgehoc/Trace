from app import db


class BtProduct(db.Model):
    __tablename__ = "BtProducts"

    BtProductPK = db.Column(db.Integer, primary_key=True)
    BatchPK = db.Column(db.Integer, nullable=False)
    ProductId = db.Column(db.String(6), nullable=False)
