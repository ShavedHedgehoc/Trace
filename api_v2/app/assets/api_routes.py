from enum import Enum


class ApiRoutes(str, Enum):

    HOME = "/"
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
    PRODUCT_ITEM = "/products/<id>"
    PRODUCT_TRADEMARKS = "/products_trademarks/<id>"
    TRADEMARKS = "/trademarks"
    TRADEMARK_ITEM = "/trademarks/<id>"
    CELLS_CONTAIN = "/cells_contain"
    CELLS_CONTAIN_ITEM = "/cells_contain/<id>"
