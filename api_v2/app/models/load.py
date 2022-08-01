from app import db


class Load(db.Model):
    __tablename__ = "Loads"

    LoadsPK = db.Column(db.Integer, primary_key=True)
    DocumentPK = db.Column(db.Integer, nullable=False)
    ContainerPK = db.Column(db.Integer, nullable=False)
    BatchPK = db.Column(db.Integer, nullable=False)
