import React from "react";
import "./styles/app.css";

import routes from "./components/routes/router";
import { useRoutes } from "hookrouter";
import Header from "./components/header_footer/Header";
import SideMenu from "./components/sidemenu/SideMenu";
import Footer from "./components/footer/Footer";



const App = () => {

    
    const routeResult = useRoutes(routes);
    
    return (
        <div className="App">
            <Header user="Iozh" />
            <div
                id="outer-container"
                className="content"
                style={{
                    backgroundColor: '#fafafa',
                    height: "100%"
                }}>
                <SideMenu pageWrapId={"page-wrap"} outerContainerId={"outer-container"} />
                <div id="page-wrap" style={{ height: "100%" }}>
                    {routeResult}
                </div>
            </div>
            <div style={{ backgroundColor: '#fafafa' }}>
                <Footer />
            </div>
        </div>
    )
};
export default App;