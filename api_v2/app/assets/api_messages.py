from enum import Enum


class ApiMessages(str, Enum):
    MISSING_CREDENTIALS = "Некоторые ключевые поля не заполнены"
    USER_EXISTS = "Пользователь с таким именем или почтой уже существует"
    USER_NOT_EXISTS = "Пользователя с таким адресом почты не существует"
    PASS_NOT_EQUAL = "Пара email и пароль не совпадают"
    DB_ERROR = "Ошибка соединения с базой данных"
    TOKEN_NOT_EXISTS = "Токен отсутствует в базе данных"
    LOGOUT = "Пользователь успешно вышел"
