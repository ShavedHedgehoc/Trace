from app import db


class Barrel(db.Model):
    __tablename__ = "Barrels"

    BarrelsId = db.Column(db.Integer, primary_key=True)
    BarrelsName = db.Column(db.String(50), unique=True, nullable=False)
