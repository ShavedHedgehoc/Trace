from datetime import datetime
from marshmallow import Schema, fields, post_dump


class BoilRowSchema(Schema):

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
        "L": "Декабрь"
    }

    batch_id = fields.Str()
    name = fields.Str()
    marking = fields.Str()
    date = fields.DateTime()
    plant = fields.Str()
    month = fields.Str()
    year = fields.Str()

    @post_dump(pass_many=True)
    def handle_values(self, data, **kwargs):
        for item in data:
            item["month"] = self.month_dict[item["month"]]
            item["plant"] = item["plant"] if item["plant"] else "Нет данных"
            item["marking"] = item["marking"] if item["marking"]else "Нет данных"
            if item["date"]:
                date_string = datetime.strptime(
                    item["date"], "%Y-%m-%dT%H:%M:%S")
                item["date"] = datetime.strftime(date_string, "%d-%m-%Y")
            else:
                item["date"] = "Нет данных"
        return data
