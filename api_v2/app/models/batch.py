from app import db


from sqlalchemy.sql.sqltypes import Integer
from sqlalchemy.sql import func, case
from sqlalchemy.ext.hybrid import hybrid_property


class Batch(db.Model):
    __tablename__ = "Batchs"

    BatchPK = db.Column(db.Integer, primary_key=True)
    BatchName = db.Column(db.String(10), unique=True, nullable=False)
    BatchDate = db.Column(db.DateTime)
    Plant = db.Column(db.String(1))

    @classmethod
    def get_name_date_plant_by_id(cls, id):
        """Return dictionary {name, date, plant}"""
        batch = db.session.query(cls).filter(cls.BatchPK == id).one_or_none()
        if batch is None:
            return {"name": "Not found", "date": "Not found", "plant": "Not found"}
        return {"name": batch.BatchName, "date": batch.BatchDate, "plant": batch.Plant}

    @hybrid_property
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

    @batch_month.expression
    def batch_month(cls):
        month_letter = func.substring(cls.BatchName, func.length(cls.BatchName) - 1, 1)

        name_lenght = func.length(cls.BatchName)
        last_symbol = func.substring(cls.BatchName, name_lenght, 1)
        last_two_symbols = func.substring(cls.BatchName, name_lenght - 1, 2)

        return case(
            [
                (month_letter == "A", "A"),
                (month_letter == "B", "B"),
                (month_letter == "C", "C"),
                (month_letter == "D", "D"),
                (month_letter == "E", "E"),
                (month_letter == "F", "F"),
                (month_letter == "G", "G"),
                (month_letter == "H", "H"),
                (month_letter == "I", "I"),
                (month_letter == "J", "J"),
                (month_letter == "K", "K"),
                (month_letter == "L", "L"),
            ],
            else_=case(
                [
                    (
                        # func.substring(cls.BatchName, func.length(cls.BatchName), 1)
                        # == "X",
                        last_symbol == "X",
                        func.substring(
                            cls.BatchName, func.length(cls.BatchName) - 2, 1
                        ),
                    ),
                    (
                        # func.substring(cls.BatchName, func.length(cls.BatchName), 1)
                        # == "Y",
                        last_symbol == "Y",
                        func.substring(
                            cls.BatchName, func.length(cls.BatchName) - 2, 1
                        ),
                    ),
                    (
                        # func.substring(cls.BatchName, func.length(cls.BatchName), 1)
                        # == "Z",
                        last_symbol == "Z",
                        func.substring(
                            cls.BatchName, func.length(cls.BatchName) - 2, 1
                        ),
                    ),
                    # r condition
                    (
                        # func.substring(cls.BatchName, func.length(cls.BatchName), 1)
                        # == "R",
                        last_symbol == "R",
                        func.substring(
                            cls.BatchName, func.length(cls.BatchName) - 2, 1
                        ),
                    ),
                    (
                        # func.substring(cls.BatchName, func.length(cls.BatchName) - 1, 2)
                        # == "RS",
                        last_symbol == "S" & last_two_symbols == "RS",
                        func.substring(
                            cls.BatchName, func.length(cls.BatchName) - 3, 1
                        ),
                    ),
                    # ?????
                    (
                        # func.substring(cls.BatchName, func.length(cls.BatchName), 1)
                        # == "S",
                        last_symbol == "S" & last_two_symbols != "RS",
                        func.substring(
                            cls.BatchName, func.length(cls.BatchName) - 2, 1
                        ),
                    ),
                    (
                        # func.substring(cls.BatchName, func.length(cls.BatchName), 1)
                        # == "A",
                        last_symbol == "A",
                        func.substring(
                            cls.BatchName, func.length(cls.BatchName) - 2, 1
                        ),
                    ),
                ],
                else_="XZ",
            ),
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
        last_two_symbols = func.substring(cls.BatchName, name_lenght - 1, 2)

        return case(
            [
                (
                    last_symbol == "X",
                    func.cast(
                        func.substring(cls.BatchName, 0, name_lenght - 2), Integer
                    ),
                ),
                (
                    last_symbol == "Y",
                    func.cast(
                        func.substring(cls.BatchName, 0, name_lenght - 2), Integer
                    ),
                ),
                (
                    last_symbol == "Z",
                    func.cast(
                        func.substring(cls.BatchName, 0, name_lenght - 2), Integer
                    ),
                ),
                # r condition
                (
                    last_symbol == "R",
                    func.cast(
                        func.substring(cls.BatchName, 0, name_lenght - 2), Integer
                    ),
                ),
                # s condition
                (
                    last_symbol == "S" & last_two_symbols != "RS",
                    func.cast(
                        func.substring(cls.BatchName, 0, name_lenght - 2), Integer
                    ),
                ),
                #  rs condition
                (
                    last_symbol == "S" & last_two_symbols == "RS",
                    func.cast(
                        func.substring(cls.BatchName, 0, name_lenght - 3), Integer
                    ),
                ),
                (
                    last_symbol == "A",
                    func.cast(
                        func.substring(cls.BatchName, 0, name_lenght - 2), Integer
                    ),
                ),
            ],
            else_=func.cast(func.substring(cls.BatchName, 0, name_lenght - 1), Integer),
        )

    @hybrid_property
    def plant_letter(self):
        if self.Plant == "П":
            return self.Plant
        if self.Plant == "К":
            return self.Plant
        return "XZ"

    @plant_letter.expression
    def plant_letter(cls):
        return case(
            [
                (cls.Plant == "П", cls.Plant),
                (cls.Plant == "К", cls.Plant),
            ],
            else_="XZ",
        )

    @hybrid_property
    def batch_year(self):
        year_digit = self.BatchName[-1]
        if (
            year_digit == "3"
            or year_digit == "6"
            or year_digit == "7"
            or year_digit == "8"
            or year_digit == "9"
        ):
            return 2010 + int(year_digit)
        if year_digit == "X":
            return 2020 + int(self.BatchName[-2])
        if year_digit == "Y":
            return 2020 + int(self.BatchName[-2])
        if year_digit == "Z":
            return 2020 + int(self.BatchName[-2])
        # add condition rs
        if year_digit == "S":
            last_two_symbols = self.BatchName[-2:]
            if last_two_symbols == "RS":
                return 2020 + int(self.BatchName[-3])
            else:
                return 2020 + int(self.BatchName[-2])
        if year_digit == "A":
            return 2020 + int(self.BatchName[-2])
        # add r symbol
        if year_digit == "R":
            return 2020 + int(self.BatchName[-2])
        return 2020 + int(year_digit)

    @batch_year.expression
    def batch_year(cls):
        name_lenght = func.length(cls.BatchName)
        last_symbol = func.substring(cls.BatchName, name_lenght, 1)
        last_two_symbols = func.substring(cls.BatchName, name_lenght - 1, 2)

        return case(
            [
                (last_symbol == "3", func.cast("201" + last_symbol, Integer)),
                (last_symbol == "6", func.cast("201" + last_symbol, Integer)),
                (last_symbol == "7", func.cast("201" + last_symbol, Integer)),
                (last_symbol == "8", func.cast("201" + last_symbol, Integer)),
                (last_symbol == "9", func.cast("201" + last_symbol, Integer)),
                (
                    last_symbol == "X",
                    func.cast(
                        "202" + func.substring(cls.BatchName, name_lenght - 1, 1),
                        Integer,
                    ),
                ),
                (
                    last_symbol == "Y",
                    func.cast(
                        "202" + func.substring(cls.BatchName, name_lenght - 1, 1),
                        Integer,
                    ),
                ),
                (
                    last_symbol == "Z",
                    func.cast(
                        "202" + func.substring(cls.BatchName, name_lenght - 1, 1),
                        Integer,
                    ),
                ),
                # s condition
                (
                    last_symbol == "S" & last_two_symbols != "RS",
                    func.cast(
                        "202" + func.substring(cls.BatchName, name_lenght - 1, 1),
                        Integer,
                    ),
                ),
                # rs condition
                (
                    last_symbol == "S" & last_two_symbols == "RS",
                    func.cast(
                        "202" + func.substring(cls.BatchName, name_lenght - 2, 1),
                        Integer,
                    ),
                ),
                # r condition
                (
                    last_symbol == "R",
                    func.cast(
                        "202" + func.substring(cls.BatchName, name_lenght - 1, 1),
                        Integer,
                    ),
                ),
                (
                    last_symbol == "A",
                    func.cast(
                        "202" + func.substring(cls.BatchName, name_lenght - 1, 1),
                        Integer,
                    ),
                ),
            ],
            else_=func.cast("202" + last_symbol, Integer),
        )
