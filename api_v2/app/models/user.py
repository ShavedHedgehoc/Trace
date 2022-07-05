from app import db


class User(db.Model):
    __tablename__ = "Users"

    UserPK = db.Column(db.Integer, primary_key=True)
    UserName = db.Column(db.String(100), unique=True, nullable=False)
    UserEmail = db.Column(db.String(100), unique=True, nullable=False)
    UserPassword = db.Column(db.String(100), nullable=False)
