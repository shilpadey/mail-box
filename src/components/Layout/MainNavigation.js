import React from "react";
import { NavLink } from "react-router-dom";
import { Navbar } from "react-bootstrap";
import { Container } from "react-bootstrap";
import { useDispatch , useSelector } from "react-redux";
import { authActions } from "../../store/auth";
import classes from "./MainNavigation.module.css";

const MainNavigation = () => {
    const dispatch = useDispatch();
    const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

    const logoutHandler = () => {
        if(isLoggedIn){
            localStorage.removeItem("userID");
            localStorage.removeItem("email");
            dispatch(authActions.logout());
        };
    };
    return (
        <>
          <Navbar className={classes.mainNav} bg="dark" variant="dark">
            <Container className={classes.container}>
              <div className={classes.logo}>
                Mail Box
              </div>
              <ul>
              <Navbar.Brand>
                <NavLink
                  to="/home"
                  className={({ isActive }) => (isActive ? classes.active : "")}
                >
                  <i className="ri-mail-line"></i>
                  Home
                </NavLink>
              </Navbar.Brand>
              <Navbar.Toggle />
              <Navbar.Collapse className="justify-content-center">
                <Navbar.Text>
                  <NavLink
                    onClick={logoutHandler}
                    to="/login"
                    className={({ isActive }) => (isActive ? classes.active : "")}
                  >
                    {!isLoggedIn ? "Login" : "Logout"}
                    {!isLoggedIn ? (
                      <i className="ri-login-circle-line"></i>
                    ) : (
                      <i className="ri-logout-circle-line"></i>
                    )}
                  </NavLink>
                </Navbar.Text>
              </Navbar.Collapse>
              </ul>
            </Container>
          </Navbar>
        </>
    );
};

export default MainNavigation;