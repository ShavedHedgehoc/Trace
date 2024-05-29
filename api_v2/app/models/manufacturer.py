from app import db

class Manufacturer(db.Model):
    __tablename__ = "Manufacturers"

    ManufacturerPK = db.Column(db.Integer, primary_key=True)
    ManufacturerName = db.Column(
        db.String(200), unique=True, nullable=False)