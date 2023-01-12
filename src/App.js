import React from 'react';
import { useSelector } from 'react-redux';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import './App.css';
import Login from './components/Authentication/Login';
import SignUp from './components/Authentication/SignUp';
import ComposeMail from './components/ComposeMail/ComposeMail';
import Navbar from './components/Layout/Navbar';
import Home from './pages/HomePage/Home';

function App() {
  const isAuth = useSelector(state => state.auth.isAuthenticated);
  const composeMail = useSelector(state => state.compose.editorState);
  
  return (
    <BrowserRouter>
      {isAuth && <Navbar />}
      <Switch>
        <Route path="/home">
          <Home />
        </Route>
        <Route path="/signup">
          <SignUp />
        </Route>
        <Route path="/">
          <Login />
        </Route>
      </Switch>
      <div>{composeMail && <ComposeMail />}</div>
    </BrowserRouter>
  );
}

export default App;

