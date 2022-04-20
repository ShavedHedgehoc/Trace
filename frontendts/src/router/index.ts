import React from "react";
import Home from "../components/Home";
import BoilsList from "../components/pages/BoilsList";
import BoilDetail from "../components/BoilDetail";
import ProductsList from "../components/pages/ProductsList";
import ProductDetail from "../components/pages/ProductDetail";
import ManufacturersList from "../components/pages/ManufacturersList";
import ManufacturerDetail from "../components/pages/ManufacturerDetail";

export interface IRoute {
    path: string;
    element: React.FC;
    // exact?: boolean;
}

export enum RouteNames {
    HOME = '/',
    BOILS = '/boils',
    BOIL_DETAIL = '/boils/:name',
    PRODUCTS = '/products',
    PRODUCT_DETAIL = '/products/:product_id',
    MANUFACTURERS = '/manufacturers',
    MANUFACTURER_DETAIL = '/manufacturers/:manufacturer_id'
}

export const publicRoutes: IRoute[] = [
    {path: RouteNames.HOME, element: Home},
    {path: RouteNames.BOILS, element: BoilsList},
    {path: RouteNames.BOIL_DETAIL, element: BoilDetail},
    {path: RouteNames.PRODUCTS, element: ProductsList},
    {path: RouteNames.PRODUCT_DETAIL, element: ProductDetail},
    {path: RouteNames.MANUFACTURERS, element: ManufacturersList},
    {path: RouteNames.MANUFACTURER_DETAIL, element: ManufacturerDetail},
]