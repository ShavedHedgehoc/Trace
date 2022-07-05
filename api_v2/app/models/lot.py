from app import db
from sqlalchemy.ext.hybrid import hybrid_property
from sqlalchemy.dialects.mssql import DATE
from sqlalchemy.sql import func, case, and_


class Lot(db.Model):
    __tablename__ = "Lots"

    LotPK = db.Column(db.Integer, primary_key=True)
    LotName = db.Column(db.String(50), unique=True, nullable=False)
    ProductId = db.Column(db.String(6), nullable=False)
    SellerPK = db.Column(db.Integer, nullable=False)
    ManufacturerPK = db.Column(db.Integer, nullable=False)
    ManufacturerLotPK = db.Column(db.Integer, nullable=False)
    TradeMarkPK = db.Column(db.Integer, nullable=False)

    @ hybrid_property
    def lot_date(self):
        name = self.LotName
        if len(name) == 20:
            if name != 'Партия не определена':
                return (name[11:12]+'/'+name[13:14]+'/'+name[15:18])
        return None

    @ lot_date.expression
    def lot_date(cls):

        name_length = func.length(cls.LotName)

        return case(
            [(and_(
                name_length == 20,
                cls.LotName != 'Партия не определена'),
                func.cast(
                    (func.substring(cls.LotName, 15, 4) +
                     '-'+func.substring(cls.LotName, 13, 2) +
                     '-'+func.substring(cls.LotName, 11, 2)), DATE)
              ), ],
            else_=None
        )
