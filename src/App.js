import React, { Fragment } from 'react';
import { useSelector } from 'react-redux';
import { Redirect, Route, Switch } from 'react-router-dom';
import './App.css';
import Login from './components/Authentication/Login';
import Layout from './components/Layout/Layout';
import Home from "./pages/HomePage/Home";


function App() {
  const isAuth = useSelector((state) => state.auth.isLoggedIn);
  
  return (
    <Fragment>
      <Layout>
      <Switch>
        <Route path="/" exact>
          {isAuth ? <Redirect to="/home"/> : <Redirect to="/login" />}
        </Route>
        <Route path="/home">
          {isAuth ? <Home /> : <Redirect to="/login"/>}
        </Route>
        <Route path="/login">
          <Login />
        </Route>
      </Switch> 
      </Layout>
    </Fragment>
  );
}

export default App;

