from app import db


class BoilRecord(db.Model):
    __tablename__ = "BoilRecords"

    BoilRecordPK = db.Column(db.Integer, primary_key=True)
    BatchId = db.Column(db.Integer, nullable=False)
    OperationId = db.Column(db.Integer, nullable=False)
    AuthorId = db.Column(db.Integer, nullable=False)
    Temperature = db.Column(db.Integer)
    CreateDate = db.Column(db.DateTime, nullable=False)
