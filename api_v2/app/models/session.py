from app import db
# from sqlalchemy.dialects.mssql import BINARY


class SessionData(db.Model):

    __tablename__ = "Sessions"

    SessionPK = db.Column(  
        db.String,      
        primary_key=True,
        server_default='newid()'
    )
    UserPK = db.Column(db.Integer)
    StartTime = db.Column(db.DateTime)
    EndTime = db.Column(db.DateTime)
