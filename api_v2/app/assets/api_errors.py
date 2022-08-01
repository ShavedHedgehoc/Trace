class PassNotEqualError(Exception):
    pass


class UserNotExistsError(Exception):
    pass


class MissingCredentialsError(Exception):
    pass


class DatabaseConnectionError(Exception):
    pass


class UserExistsError(Exception):
    pass


class TokenNotExistsError(Exception):
    pass


class RoleNotExistsError(Exception):
    pass


class BadJSONError(Exception):
    pass

class LotNotExistsError(Exception):
    pass

class TrademarkNotExistsError(Exception):
    pass

class ProductNotExistsError(Exception):
    pass
