import React from 'react';
import classes from "./App.module.css";
import Header from './components/Header';
import Footer from './components/Footer';
import SideMenu from './components/SideMenu';
import AppRouter from './components/AppRouter';


const App: React.FC = (): JSX.Element => {
  return (
    <div className={classes.App}>
      <Header />
      <SideMenu />
      <div className={classes.content}>
        <AppRouter />
      </div>
      <Footer />
    </div>
  );
}

export default App;