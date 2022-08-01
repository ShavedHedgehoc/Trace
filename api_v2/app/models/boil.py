from app import db


class Boil(db.Model):
    __tablename__ = "Boils"

    BoilPK = db.Column(db.Integer, primary_key=True)
    BatchPK = db.Column(db.Integer, nullable=False)
    ProductId = db.Column(db.String(6), nullable=False)
    Quantity = db.Column(db.Numeric(
        precision=9, scale=5), nullable=False)
