from app import db


class Trademark(db.Model):
    __tablename__ = "Trademarks"

    TrademarkPK = db.Column(db.Integer, primary_key=True)
    TrademarkName = db.Column(
        db.String(200), unique=True, nullable=False)
