import React from 'react';
import classes from "./styles/App.module.css";
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import SideMenu from './components/layout/SideMenu';
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