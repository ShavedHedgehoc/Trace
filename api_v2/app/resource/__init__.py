import os
from flask_restful import Api

from app.assets.api_routes import ApiRoutes

from app.resource.home import Home
from app.resource.auth import Logout, Refresh, Register, Login
from app.resource.document import Documents
from app.resource.boil import Boils, BoilItem
from app.resource.convergence import Convergence, ConvergenceItem
from app.resource.lot import LotItem, Lots
from app.resource.product import ProductItem, ProductTrademarks, Products
from app.resource.trademark import TrademarkItem, Trademarks
from app.resource.cells_contain import CellsContain, CellsContainItem

api = Api(prefix=os.getenv("SECOND_API_PREFIX"))

api.add_resource(Home, ApiRoutes.HOME)
api.add_resource(Register, ApiRoutes.REGISTER)
api.add_resource(Login, ApiRoutes.LOGIN)
api.add_resource(Refresh, ApiRoutes.REFRESH)
api.add_resource(Logout, ApiRoutes.LOGOUT)
api.add_resource(Documents, ApiRoutes.DOC_COUNTER)
api.add_resource(Boils, ApiRoutes.BOILS)
api.add_resource(BoilItem, ApiRoutes.BOIL_ITEM)
api.add_resource(Convergence, ApiRoutes.CONVERGENCE)
api.add_resource(ConvergenceItem, ApiRoutes.CONVERGENCE_ITEM)
api.add_resource(Lots, ApiRoutes.LOTS)
api.add_resource(LotItem, ApiRoutes.LOT_ITEM)
api.add_resource(Products, ApiRoutes.PRODUCTS)
api.add_resource(ProductItem, ApiRoutes.PRODUCT_ITEM)
api.add_resource(ProductTrademarks, ApiRoutes.PRODUCT_TRADEMARKS)
api.add_resource(Trademarks, ApiRoutes.TRADEMARKS)
api.add_resource(TrademarkItem, ApiRoutes.TRADEMARK_ITEM)
api.add_resource(CellsContain, ApiRoutes.CELLS_CONTAIN)
api.add_resource(CellsContainItem, ApiRoutes.CELLS_CONTAIN_ITEM)
