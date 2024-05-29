from enum import Enum


class UserRoles(str, Enum):

    USER = "User"
    ADMIN = "Admin"
    TECHNOLOGIST = "Technologist"
    SPECIALIST = "Specialist"
    