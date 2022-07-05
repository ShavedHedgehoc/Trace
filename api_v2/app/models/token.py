from app import db


class RefreshToken(db.Model):

    __tablename__ = "Tokens"

    TokenPK = db.Column(db.Integer, primary_key=True)
    UserPK = db.Column(db.Integer, nullable=False)
    TokenData = db.Column(db.String(1000), unique=True, nullable=False)
