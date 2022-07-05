from dataclasses import dataclass


@dataclass
class Tokens:
    access_token: str
    refresh_token: str


@dataclass
class Payload:
    id: int
    name: str
    email: str
    session: str


@dataclass
class LoginResponce:
    user: dict
    tokens: Tokens

@dataclass
class UserLoginData():
    email: str
    password: str