from app import db


class ManufacturerLot(db.Model):
    __tablename__ = "ManufacturerLots"

    ManufacturerLotPK = db.Column(db.Integer, primary_key=True)
    ManufacturerLotName = db.Column(
        db.String(200), unique=True, nullable=False)
