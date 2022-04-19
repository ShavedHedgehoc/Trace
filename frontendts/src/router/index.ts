import React from "react";
import BoilDetail from "../components/BoilDetail";
import Boils from "../components/Boils";
import Home from "../components/Home";



export interface IRoute {
    path: string;
    element: React.FC;
    // exact?: boolean;
}

export enum RouteNames {
    HOME = '/',
    BOILS = '/boils',
    BOIL_DETAIL='/boils/:name'
}

export const publicRoutes:IRoute[] = [
    { path: RouteNames.HOME, element: Home },
    { path: RouteNames.BOILS, element: Boils },
    { path: RouteNames.BOIL_DETAIL, element: BoilDetail },

]