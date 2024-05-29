from app import db


class Plant(db.Model):
    __tablename__ = "Plants"

    PlantPK = db.Column(db.Integer, primary_key=True)
    PlantName = db.Column(db.String(50))
    PlantAlias = db.Column(db.String(1))
    