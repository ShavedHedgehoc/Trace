from app import db


class Operation(db.Model):
    __tablename__ = "Operations"

    OperationPK = db.Column(db.Integer, primary_key=True)
    OperationCode = db.Column(db.String(50), nullable=False)
    OperationName = db.Column(db.String(200), nullable=False)
