from enum import Enum


class ApiRoutes(str, Enum):

    DOC_COUNTER = "/doc_count"
    REGISTER = "/auth/register"
    LOGIN = "/auth/login"
    REFRESH = "/auth/refresh"
    LOGOUT = "/auth/logout"
    BOILS = "/boils"
    BOIL_ITEM = "/boils/<id>"
    CONVERGENCE = "/boils_report"
    CONVERGENCE_ITEM = "/boils_report/<name>"
    LOTS = "/lots"
    LOT_ITEM = "/lots/<id>"
    PRODUCTS = "/products"
    PRODUCT_ITEM = "/products/id"
    TRADEMARKS = "/trademarks"
    TRAADEMARK_ITEM = "/trademarks/id"
