from enum import Enum


class ApiMessages(str, Enum):
    MISSING_CREDENTIALS = "Некоторые ключевые поля не заполнены"
    USER_EXISTS = "Пользователь с таким именем или почтой уже существует"
    USER_NOT_EXISTS = "Пользователя с таким адресом почты не существует"
    PASS_NOT_EQUAL = "Пара email и пароль не совпадают"
    DB_ERROR = "Ошибка соединения с базой данных"
    TOKEN_NOT_EXISTS = "Токен отсутствует в базе данных"
    LOGOUT = "Пользователь успешно вышел"
    ROLE_REQUIRED = "Недостаточно прав для доступа"
    EMPTY_JSON_BODY = "В теле запроса нет параметров"
    BAD_JSON_BODY = "Ошибка в теле запроса"
    LOT_NOT_EXISTS = "Квазипартия не найдена"
    TRADEMARK_NOT_EXISTS = "Торговое название не найдено"
    PRODUCT_NOT_EXISTS = "Сырье не найдено"
    CELLS_CONTAIN_ID_ERROR = "Записи с таким идентификатором не существует"
    RECORD_DELETE_SUCCESS = "Запись успешно удалена"
