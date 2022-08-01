from datetime import datetime

from marshmallow import Schema, fields, missing, post_dump, post_load

from app.assets.api_dataclasses import BoilFilter, BoilRequestOptions

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


class BoilsFilterSchema(Schema):
    batch = fields.Str(missing="")
    marking = fields.Str(missing="")
    date = fields.Str(missing="")
    month = fields.Str(missing="-")
    year = fields.Str(missing="-")
    plant = fields.Str(missing="-")
    
    @post_load
    def post_load_hook(self, data, **kwargs):
        return BoilFilter(**data)

class BoilsRequestSchema(Schema):
    page = fields.Int(missing=0)
    limit = fields.Int(missing=10)
    filter = fields.Nested(BoilsFilterSchema)    

    @post_load
    def make_options(self, data, **kwargs) -> BoilRequestOptions:
        return BoilRequestOptions(**data)


class BoilRowSchema(Schema):
    

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
            item["month"] = month_dict[item["month"]]            
            item["plant"] = item["plant"] if item["plant"] else "Нет данных"
            item["marking"] = item["marking"] if item["marking"]else "Нет данных"
            if item["date"]:
                date_string = datetime.strptime(
                    item["date"], "%Y-%m-%dT%H:%M:%S")
                item["date"] = datetime.strftime(date_string, "%d-%m-%Y")
            else:
                item["date"] = "Нет данных"
        return data


class MonthSchema(Schema):
    
    key = fields.Str()
    value = fields.Str()    

    @post_dump(pass_many=True)
    def add_months(self, data, **kwargs):        
        data.append({"key": "-", "value": "Все"})
        for item in data:
            if item["key"] != "-":
                item["value"] = month_dict[item["key"]]
        data.sort(key=lambda x: x["key"])
        return data

class PlantSchema(Schema):    

    key = fields.Str()
    value = fields.Str()    

    @post_dump(pass_many=True)
    def add_plants(self, data, **kwargs):        
        data.append({"key": "-", "value": "Все"})
        for item in data:            
            if not item["value"]:
                item["value"] = "Нет данных"
        data.sort(key=lambda x: x["key"])
        return data

    
    
class YearSchema(Schema):    

    key = fields.Str()
    value = fields.Str()    

    @post_dump(pass_many=True)
    def add_yearss(self, data, **kwargs):        
        data.append({"key": "-", "value": "Все"})
        for item in data:
            if item["key"] != "-":
                item["value"] = item["key"]
        data.sort(key=lambda x: x["key"])
        return data


