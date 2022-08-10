from dataclasses import dataclass
from datetime import date

from typing import List


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
    roles: List[str]


@dataclass
class LoginResponce:
    user: dict
    # roles: List[str]
    tokens: Tokens


@dataclass
class UserLoginData():
    email: str
    password: str


@dataclass
class BoilFilter:
    batch: str
    marking: str
    date: str
    month: str
    year: str
    plant: str


@dataclass
class BoilRequestOptions:
    page: int
    limit: int
    filter: BoilFilter


@dataclass
class ConvergenceFilter:
    plant: str
    exactly: bool
    start_date: date
    end_date: date


@dataclass
class ConvergenceRequestOptions:
    page: int
    limit: int
    filter: ConvergenceFilter


@dataclass
class ConvergenceItemRequestOptions:
    exactly: bool


@dataclass
class LotRequestOptions:
    page: int
    limit: int


@dataclass
class LotItemRequestOptions:
    page: int
    limit: int


@dataclass
class TrademarkFilter:
    trademark_name: str
    product_id: str
    product_name: str


@dataclass
class TrademarkRequestOptions:
    page: int
    limit: int
    filter: TrademarkFilter


@dataclass
class TrademarkItemRequestOptions:
    page: int
    limit: int


@dataclass
class ProductFilter:
    product_id: str
    product_name: str


@dataclass
class ProductRequestOptions:
    page: int
    limit: int
    filter: ProductFilter


@dataclass
class ProductItemFilter:
    lot_name: str
    seller_name: str
    manufacturer_name: str
    manufacturer_lot_name: str
    trademark_name: str


@dataclass
class ProductItemRequestOptions:
    page: int
    limit: int
    filter: ProductItemFilter
    
    
@dataclass
class ProductTrademarksItemRequestOptions:
    page: int
    limit: int
    # filter: 
    
    
