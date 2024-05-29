import React, { useEffect } from 'react';
import classes from "./styles/App.module.css";
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import SideMenu from './components/layout/SideMenu';
import AppRouter from './components/AppRouter';
import { useTypedSelector } from './hooks/useTypedSelector';
import Login from './components/pages/Login';
import { useActions } from './hooks/useActions';
import LoadingHandler from './components/utils/LoadingHandler';
import Modal from './components/utils/Modal';

const App: React.FC = (): JSX.Element => {

  const { isAuth, loading } = useTypedSelector(state => state.auth)
  const { check } = useActions()

  useEffect(() => {
    if (localStorage.getItem('token')) {
      console.log("check");
      check()
    }
  }, [])

  if (!isAuth) return <Login />

  return (
    <div className={classes.App}>
      <Modal visible={loading}><LoadingHandler /></Modal>
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