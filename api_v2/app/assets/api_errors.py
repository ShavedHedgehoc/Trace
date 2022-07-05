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
