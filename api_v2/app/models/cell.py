from app import db


class Cell(db.Model):
    __tablename__ = "Cells"

    CellPK = db.Column(db.Integer, primary_key=True)
    CellName = db.Column(db.String(50), unique=True, nullable=False)
    CellBarcode = db.Column(db.String(13), nullable=False)
    PlantPK = db.Column(db.Integer, nullable=False)
