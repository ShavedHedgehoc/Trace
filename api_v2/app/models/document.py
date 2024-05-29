from app import db


class Document(db.Model):
    __tablename__ = "Documents"

    DocumentPK = db.Column(db.Integer, primary_key=True)
    DocumentClid = db.Column(db.String(50), unique=True, nullable=False)
    DoctypePK = db.Column(db.Integer, nullable=False)
    AuthorPK = db.Column(db.Integer, nullable=False)
    CreateDate = db.Column(db.DateTime, nullable=False)
    Plant = db.Column(db.String(1))
