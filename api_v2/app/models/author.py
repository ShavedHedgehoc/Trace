from app import db

class Author(db.Model):
    __tablename__ = "Authors"

    AuthorPK = db.Column(db.Integer, primary_key=True)
    AuthorName = db.Column(db.String(50), unique=True, nullable=False)
    AuthorBarcode = db.Column(db.String(13))