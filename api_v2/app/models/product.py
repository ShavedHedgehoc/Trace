from app import db


class Product(db.Model):
    __tablename__ = "Products"

    ProductId = db.Column(db.String(6), primary_key=True)
    ProductName = db.Column(db.String(200))
    ProductMarking = db.Column(db.String(50))
    ProductBarcode = db.Column(db.String(13))

    @ classmethod
    def get_name_by_id(cls, id):
        product = db.session.query(cls).filter(
            cls.ProductId == id).one_or_none()
        if product is None:
            return 'Not found'
        return product.ProductName
