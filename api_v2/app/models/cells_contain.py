from app import db


class CellsContain(db.Model):
    __tablename__ = "CellsContains"

    CellContainPK = db.Column(db.Integer, primary_key=True)
    CellPK = db.Column(db.Integer, nullable=False)
    ProductId = db.Column(db.String(6), nullable=False)
    LotId = db.Column(db.Integer, nullable=False)
    Expire = db.Column(db.DateTime, nullable=False)
