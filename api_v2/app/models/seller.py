from app import db

class Seller(db.Model):
    __tablename__ = "Sellers"

    SellerPK = db.Column(db.Integer, primary_key=True)
    SellerName = db.Column(db.String(200), unique=True, nullable=False)