from app import db


class UserRole(db.Model):
    __tablename__ = "UserRoles"

    UserRolePK = db.Column(db.Integer, primary_key=True)
    UserPK = db.Column(db.Integer, nullable=False)
    RolePK = db.Column(db.Integer, nullable=False)
    
