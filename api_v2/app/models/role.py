from app import db


class Role(db.Model):
    __tablename__ = "Roles"

    RolePK = db.Column(db.Integer, primary_key=True)
    RoleName = db.Column(db.String(100), unique=True, nullable=False)
    RoleAlias = db.Column(db.String(100), unique=True, nullable=False)
    
