import React, { useRef } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { login } from "../../store/auth-actions";
import classes from './SignUp.module.css';

const Login = () => {
    const history = useHistory()
    const dispatch = useDispatch();
    const emailInputRef = useRef();
    const passwordInputRef = useRef();

    const formSubmitHandler = (event) => {
        event.preventDefault();

        const enteredEmail = emailInputRef.current.value;
        const enteredPassword = passwordInputRef.current.value;

        dispatch(login(enteredEmail, enteredPassword));
        emailInputRef.current.value = "";
        passwordInputRef.current.value = "";
        history.replace('/home');
    };

    const buttonRedirect = () => {
        history.replace('/signup');
    };
 
    return (
        <section>
            <div className={classes.form}>
                <form onSubmit={formSubmitHandler}>
                    <h1>Sign Up</h1>
                    <div className={classes.control}>
                        <input 
                            htmlFor="email" 
                            placeholder="Email" 
                            type="email" 
                            ref={emailInputRef} 
                        required/>
                    </div>
                    <div className={classes.control}>
                        <input 
                            id="password" 
                            placeholder="Password" 
                            type="password"
                            minLength="6"
                            maxLength="16" 
                            ref={passwordInputRef} 
                        required/>
                    </div>
                    <div className={classes.actions}>
                        <button>Login</button>
                    </div>
                </form>
            </div>
            <div className={classes.login}>
                <button onClick={buttonRedirect}>Have an account?SignUp</button>
            </div>
        </section>
    );
};

export default Login;