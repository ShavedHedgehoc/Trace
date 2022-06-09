import React from "react";
import Home from "../components/pages/Home";
import BoilsList from "../components/pages/BoilsList";
import BoilDetail from "../components/pages/BoilDetail";
import ProductsList from "../components/pages/ProductsList";
import ProductDetail from "../components/pages/ProductDetail";
import ManufacturersList from "../components/pages/ManufacturersList";
import ManufacturerDetail from "../components/pages/ManufacturerDetail";
import ManufacturerLotsList from "../components/pages/ManufacturerLotsList";
import ManufacturerLotDetail from "../components/pages/ManufacturerLotDetail";

import LotsList from "../components/pages/LotsList";
import LotDetail from "../components/pages/LotDetail";
import TrademarksList from "../components/pages/TrademarksList";
import TrademarkDetail from "../components/pages/TrademarkDetail";
import SellersList from "../components/pages/SellersList";
import SellerDetail from "../components/pages/SellerDetail";
import ProductTMsList from "../components/pages/ProductTMsList";
import ProductTMDetail from "../components/pages/ProductTMDetail";
import BoilsConvergenceReport from "../components/pages/BoilsConvergenceReport";
import BoilsConvergenceReportCard from "../components/pages/BoilsConvergenceReportCard";
import TestDoc from '../components/pages/TestDoc';

export interface IRoute {
    path: string;
    element: React.FC;
}

export enum Params {
    BOIL_PARAMS = 'boil_id',
    BOIL_PDF_PARAMS = 'boil_id',
    PRODUCT_PARAMS = 'product_id',
    MANUFACTURER_PARAMS = 'manufacturer_id',
    MANUFACTURER_LOT_PARAMS = 'manufacturer_lot_id',
    LOT_PARAMS = 'lot_id',
    TRADEMARK_PARAMS = 'trademark_id',
    SELLER_PARAMS = 'seller_id',BOIL_PDF = 'boils_pdf',
    PRODUCT_TM_PARAMS = 'product_tm_id',
    BOILS_CONVERGENCE_PARAMS_BOIL = 'boil_name',
    BOILS_CONVERGENCE_PARAMS_EXACTLY = 'exactly',
}

export enum RouteNames {
    HOME = '/',
    BOILS = '/boils',
    BOIL_DETAIL = '/boils/:boil_id',
    BOIL_PDF = '/boils_pdf',
    BOIL_PDF_ITEM = '/boils_pdf/:boil_id',
    PRODUCTS = '/products',
    PRODUCT_DETAIL = '/products/:product_id',
    MANUFACTURERS = '/manufacturers',
    MANUFACTURER_DETAIL = '/manufacturers/:manufacturer_id',
    MANUFACTURER_LOTS = '/manufacturer_lots',
    MANUFACTURER_LOT_DETAIL = '/manufacturer_lots/:manufacturer_lot_id',
    LOTS = '/lots',
    LOT_DETAIL = '/lots/:lot_id',
    TRADEMARKS = '/trademarks',
    TRADEMARK_DETAIL = '/trademarks/:trademark_id',
    SELLERS = '/sellers',
    SELLER_DETAIL = '/sellers/:seller_id',
    PRODUCT_TMS = '/product_tms',
    PRODUCT_TM_DETAIL = '/product_tms/:product_tm_id',
    BOILS_CONVERGENCE_REPORT = '/reports/convergence',
    BOILS_CONVERGENCE_REPORT_CARD = '/reports/convergence/:boil_name/:exactly',
    
}

export const publicRoutes: IRoute[] = [
    {path: RouteNames.HOME, element: Home},
    {path: RouteNames.BOILS, element: BoilsList},
    {path: RouteNames.BOIL_DETAIL, element: BoilDetail},
    {path: RouteNames.PRODUCTS, element: ProductsList},
    {path: RouteNames.PRODUCT_DETAIL, element: ProductDetail},
    {path: RouteNames.MANUFACTURERS, element: ManufacturersList},
    {path: RouteNames.MANUFACTURER_DETAIL, element: ManufacturerDetail},
    {path:RouteNames.MANUFACTURER_LOTS, element:ManufacturerLotsList},
    {path:RouteNames.MANUFACTURER_LOT_DETAIL, element:ManufacturerLotDetail},
    {path: RouteNames.LOTS, element: LotsList},
    {path: RouteNames.LOT_DETAIL, element: LotDetail},
    {path: RouteNames.TRADEMARKS, element: TrademarksList},
    {path: RouteNames.TRADEMARK_DETAIL, element: TrademarkDetail},
    {path: RouteNames.SELLERS, element: SellersList},
    {path: RouteNames.SELLER_DETAIL, element: SellerDetail},
    {path: RouteNames.PRODUCT_TMS, element: ProductTMsList},
    {path: RouteNames.PRODUCT_TM_DETAIL, element: ProductTMDetail},
    {path: RouteNames.BOILS_CONVERGENCE_REPORT, element: BoilsConvergenceReport},
    {path: RouteNames.BOILS_CONVERGENCE_REPORT_CARD, element: BoilsConvergenceReportCard},
    {path: RouteNames.BOIL_PDF_ITEM, element: TestDoc},
]