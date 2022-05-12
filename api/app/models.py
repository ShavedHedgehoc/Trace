from datetime import date, datetime
from app import db
# from sqlalchemy.sql import func, case
from sqlalchemy.sql.sqltypes import INTEGER, Integer
from sqlalchemy.sql import expression, text, func, case, join, select, and_
from sqlalchemy.ext.hybrid import hybrid_property, hybrid_method
from sqlalchemy.exc import DataError
from sqlalchemy.dialects.mssql import DATE


class Acceptance(db.Model):
    __tablename__ = "Acceptance"

    AcceptancePK = db.Column(db.Integer, primary_key=True)
    DocumentPK = db.Column(db.Integer, nullable=False)
    ProductId = db.Column(db.String(6), nullable=False)
    LotPK = db.Column(db.Integer, nullable=False)
    ExpiredDate = db.Column(db.DateTime, nullable=False)
    BarrelsId = db.Column(db.Integer, nullable=False)
    BarrelsCapacity = db.Column(db.Numeric(
        precision=9, scale=5), nullable=False)
    BarrelsQuantity = db.Column(db.Integer, nullable=False)


class Author(db.Model):
    __tablename__ = "Authors"

    AuthorPK = db.Column(db.Integer, primary_key=True)
    AuthorName = db.Column(db.String(50), unique=True, nullable=False)
    AuthorBarcode = db.Column(db.String(13))


class Barrel(db.Model):
    __tablename__ = "Barrels"

    BarrelsId = db.Column(db.Integer, primary_key=True)
    BarrelsName = db.Column(db.String(50), unique=True, nullable=False)


class Batch(db.Model):
    __tablename__ = "Batchs"

    BatchPK = db.Column(db.Integer, primary_key=True)
    BatchName = db.Column(db.String(10), unique=True, nullable=False)
    BatchDate = db.Column(db.DateTime)
    Plant = db.Column(db.String(1))

    @classmethod
    def get_name_date_plant_by_id(cls, id):
        """Return dictionary {name, date, plant}
        """
        batch = db.session.query(cls).filter(cls.BatchPK == id).one_or_none()
        if batch is None:
            return {
                'name': 'Not found',
                'date': 'Not found',
                'plant': 'Not found'
            }
        return {
            'name': batch.BatchName,
            'date': batch.BatchDate,
            'plant': batch.Plant
        }

    @ hybrid_property
    def batch_month(self):
        month_dict = {
            "A": "Январь",
            "B": "Февраль",
            "C": "Март",
            "D": "Апрель",
            "E": "Май",
            "F": "Июнь",
            "G": "Июль",
            "H": "Август",
            "I": "Сентябрь",
            "J": "Октябрь",
            "K": "Ноябрь",
            "L": "Декабрь",
        }
        return month_dict[self.name[-2]]

    @ batch_month.expression
    def batch_month(cls):
        month_letter = func.substring(
            cls.BatchName, func.length(cls.BatchName)-1, 1)
        return case(
            [
                (month_letter == 'A', 'A'),
                (month_letter == 'B', 'B'),
                (month_letter == 'C', 'C'),
                (month_letter == 'D', 'D'),
                (month_letter == 'E', 'E'),
                (month_letter == 'F', 'F'),
                (month_letter == 'G', 'G'),
                (month_letter == 'H', 'H'),
                (month_letter == 'I', 'I'),
                (month_letter == 'J', 'J'),
                (month_letter == 'K', 'K'),
                (month_letter == 'L', 'L'),
            ],
            else_=case(
                [
                    (func.substring(
                        cls.BatchName,
                        func.length(cls.BatchName), 1) == 'X',
                     func.substring(
                        cls.BatchName,
                        func.length(cls.BatchName)-2, 1)
                     ),
                    (func.substring(cls.BatchName,
                                    func.length(cls.BatchName), 1) == 'Y',
                        func.substring(
                        cls.BatchName,
                        func.length(cls.BatchName)-2, 1)
                     ),
                ],
                else_='XZ'
            )
        )

    @hybrid_property
    def batch_number(self):

        last_symbol = self.BatchName[-1]

        if last_symbol.isdigit():
            return int(self.BatchName[0:-2])
        return int(self.BatchName[0:-3])

    @batch_number.expression
    def batch_number(cls):
        #  insert int validation!!!
        name_lenght = func.length(cls.BatchName)
        last_symbol = func.substring(cls.BatchName, name_lenght, 1)

        return case(
            [
                (last_symbol == 'X', func.cast(func.substring(
                    cls.BatchName, 0, name_lenght-2), Integer)
                 ),
                (last_symbol == 'Y', func.cast(func.substring(
                    cls.BatchName, 0, name_lenght-2), Integer)
                 ),
            ],
            else_=func.cast(func.substring(
                cls.BatchName, 0, name_lenght-1), Integer)
        )

    @ hybrid_property
    def plant_letter(self):
        if self.Plant == 'П':
            return(self.Plant)
        if self.Plant == 'К':
            return(self.Plant)
        return 'XZ'

    @ plant_letter.expression
    def plant_letter(cls):
        return case(
            [
                (cls.Plant == 'П', cls.Plant),
                (cls.Plant == 'К', cls.Plant),
            ],
            else_='XZ'
        )

    @ hybrid_property
    def batch_year(self):
        year_digit = self.BatchName[-1]
        if (year_digit == '3' or
            year_digit == '6' or
            year_digit == '7' or
            year_digit == '8' or
                year_digit == '9'):
            return 2010+int(year_digit)
        if year_digit == 'X':
            return 2020+int(self.BatchName[-2])
        if year_digit == 'Y':
            return 2020+int(self.BatchName[-2])
        return 2020+int(year_digit)

    @ batch_year.expression
    def batch_year(cls):
        name_lenght = func.length(cls.BatchName)
        last_symbol = func.substring(cls.BatchName, name_lenght, 1)
        return case(
            [
                (last_symbol == '3', func.cast('201'+last_symbol, Integer)),
                (last_symbol == '6', func.cast('201'+last_symbol, Integer)),
                (last_symbol == '7', func.cast('201'+last_symbol, Integer)),
                (last_symbol == '8', func.cast('201'+last_symbol, Integer)),
                (last_symbol == '9', func.cast('201'+last_symbol, Integer)),
                (last_symbol == 'X', func.cast(
                    '202'+func.substring(cls.BatchName, name_lenght-1, 1),
                    Integer
                )
                ),
                (last_symbol == 'Y', func.cast(
                    '202'+func.substring(cls.BatchName, name_lenght-1, 1),
                    Integer
                )
                ),
            ],
            else_=func.cast('202'+last_symbol, Integer)
        )


class Boil(db.Model):
    __tablename__ = "Boils"

    BoilPK = db.Column(db.Integer, primary_key=True)
    BatchPK = db.Column(db.Integer, nullable=False)
    ProductId = db.Column(db.String(6), nullable=False)
    Quantity = db.Column(db.Numeric(
        precision=9, scale=5), nullable=False)


class Btproduct(db.Model):
    __tablename__ = "BtProducts"

    BtProductPK = db.Column(db.Integer, primary_key=True)
    BatchPK = db.Column(db.Integer, nullable=False)
    ProductId = db.Column(db.String(6), nullable=False)


class Container(db.Model):
    __tablename__ = "Containers"

    ContainerPK = db.Column(db.Integer, primary_key=True)
    ContainerName = db.Column(db.String(50), unique=True, nullable=False)


class Doctype(db.Model):
    __tablename__ = "Doctypes"

    DoctypePK = db.Column(db.Integer, primary_key=True)
    DoctypeName = db.Column(db.String(50), unique=True, nullable=False)
    DoctypeAlias = db.Column(db.String(200))


class Document(db.Model):
    __tablename__ = "Documents"

    DocumentPK = db.Column(db.Integer, primary_key=True)
    DocumentClid = db.Column(db.String(50), unique=True, nullable=False)
    DoctypePK = db.Column(db.Integer, nullable=False)
    AuthorPK = db.Column(db.Integer, nullable=False)
    CreateDate = db.Column(db.DateTime, nullable=False)
    Plant = db.Column(db.String(1))


class Load(db.Model):
    __tablename__ = "Loads"

    LoadsPK = db.Column(db.Integer, primary_key=True)
    DocumentPK = db.Column(db.Integer, nullable=False)
    ContainerPK = db.Column(db.Integer, nullable=False)
    BatchPK = db.Column(db.Integer, nullable=False)


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


class Manufacturerlot(db.Model):
    __tablename__ = "ManufacturerLots"

    ManufacturerLotPK = db.Column(db.Integer, primary_key=True)
    ManufacturerLotName = db.Column(
        db.String(200), unique=True, nullable=False)


class Manufacturer(db.Model):
    __tablename__ = "Manufacturers"

    ManufacturerPK = db.Column(db.Integer, primary_key=True)
    ManufacturerName = db.Column(
        db.String(200), unique=True, nullable=False)


class Product(db.Model):
    __tablename__ = "Products"

    ProductId = db.Column(db.String(6), primary_key=True)
    ProductName = db.Column(db.String(200))
    ProductMarking = db.Column(db.String(50))
    ProductBarcode = db.Column(db.String(13))

    @ classmethod
    def get_name_by_id(cls, id):
        product = db.session.query(cls).filter(
            cls.ProductId == id).one_or_none()
        if product is None:
            return 'Not found'
        return product.ProductName


class Seller(db.Model):
    __tablename__ = "Sellers"

    SellerPK = db.Column(db.Integer, primary_key=True)
    SellerName = db.Column(db.String(200), unique=True, nullable=False)


class Trademark(db.Model):
    __tablename__ = "Trademarks"

    TrademarkPK = db.Column(db.Integer, primary_key=True)
    TrademarkName = db.Column(
        db.String(200), unique=True, nullable=False)


class Weighting(db.Model):
    __tablename__ = "Weightings"

    # replace 's' from fieldname 'WeightingsPK' in mssql?
    WeightingsPK = db.Column(db.Integer, primary_key=True)
    DocumentPK = db.Column(db.Integer, nullable=False)
    ContainerPK = db.Column(db.Integer, nullable=False)
    ProductId = db.Column(db.String(6), nullable=False)
    BatchPK = db.Column(db.Integer, nullable=False)
    LotPK = db.Column(db.Integer, nullable=False)
    Quantity = db.Column(db.Numeric(
        precision=9, scale=5), nullable=False)

    @ classmethod
    def get_sum_by_batch_product(cls, batchid, productid):
        sum = db.session.query(func.sum(cls.Quantity).label('sum')).filter(
            cls.BatchPK == batchid).filter(cls.ProductId == productid).scalar()
        if sum is None:
            return 0
        return sum
