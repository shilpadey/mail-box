import React from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { authActions } from "../../store/auth";
import { composeActions } from "../../store/compose";
import classes from "./Navbar.module.css";

const Navbar = () => {
    const history = useHistory();
    const dispatch = useDispatch();
    //const isAuth = useSelector(state => state.auth.isAuthenticated);
    const initialToken = localStorage.getItem("idToken");
    const isLoggedIn = !!initialToken;

    const composeHandler = () => {
        dispatch(composeActions.editorIsOpen());
    };

    const logoutHandler = () => {
        localStorage.removeItem("idToken");
        localStorage.removeItem("userID");
        localStorage.removeItem("email");
        dispatch(authActions.logout());
        dispatch(composeActions.editorIsClose());
        history.replace('/');
    };
    return (
        <header className={classes.header}>
            <div>
                <h2>Mail Box</h2>
            </div>
            {isLoggedIn && <nav>
                <ul>
                    <li>
                        <button onClick={composeHandler}>Compose</button>
                    </li>
                    <li>
                        <button onClick={logoutHandler}>Logout</button>
                    </li>
                </ul>
            </nav>}
        </header>
    );
};

export default Navbar;