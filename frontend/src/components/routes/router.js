import React from 'react';
import Home from '../pages/Home.jsx';
import Lots from '../pages/Lots.jsx';
import Boils from '../pages/Boils.jsx';
import Products from '../pages/Products.jsx';


import Boil from '../pages/Boil.jsx';
import Product from '../pages/Product.jsx';
import Lot from '../pages/Lot.jsx';
import Trademarks from '../pages/Trademarks';
import Trademark from '../pages/Trademark';
import Manufacturer from '../pages/Manufacturer.jsx';
import Manufacturers from '../pages/Manufacturers.jsx';
import Seller from '../pages/Seller.jsx';
import Sellers from '../pages/Sellers.jsx';
import ProductsTrademarks from '../pages/ProductsTrademarks.jsx';
import ReportBoilSummary from '../pages/ReportBoilSummary.jsx';
import ReportCard from '../pages/ReportCard.jsx';


const routes = {
    "/": () => <Home />,
    "/boils": () => <Boils />,
    "/boils/:batchname": ({batchname}) => <Boil batchName={batchname} />,
    "/products": () => <Products />,
    "/products/:productid": ({productid}) => <Product productId={productid} />,
    "/products_trademarks/:productid": ({productid}) => <ProductsTrademarks productId={productid} />,
    "/lots": () => <Lots />,
    "/lots/:lotid": ({lotid}) => <Lot lotId={lotid} />,
    "/trademarks": () => <Trademarks />,
    "/trademarks/:trademarkid": ({trademarkid}) => <Trademark trademarkId={trademarkid} />,
    "/sellers": () => <Sellers />,
    "/sellers/:sellerid": ({sellerid}) => <Seller sellerId={sellerid} />,
    "/manufacturers": () => <Manufacturers />,
    "/manufacturers/:manufacturerid": ({manufacturerid}) => <Manufacturer manufacturerId={manufacturerid} />,
    "/report_boil_summary": () => <ReportBoilSummary />, 
    "/report_boil_summary/:batchname": ({batchname}) => <ReportCard batchName={batchname} />, 
};

export default routes;



