import React, { useRef } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { authActions } from "../../store/auth";
import classes from './SignUp.module.css';

const Login = () => {
    const history = useHistory()
    const dispatch = useDispatch();
    const emailInputRef = useRef();
    const passwordInputRef = useRef();

    const formSubmitHandler = async(event) => {
        event.preventDefault();

        const enteredEmail = emailInputRef.current.value;
        const enteredPassword = passwordInputRef.current.value;

        try{
            const response = await fetch(
                "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBo2nLTGOdM4YGTS68TUWZn1dYkSLrBhfY",
                {
                  method: "POST",
                  body: JSON.stringify({
                    email: enteredEmail,
                    password: enteredPassword,
                    returnSecureToken: true,
                  }),
                  headers: {
                    "Content-Type": "application/json",
                  },
                }
            );
    
            if(response.ok){
                const data = await response.json();
                localStorage.setItem("userID", data.localId);
                localStorage.setItem("email", data.email);
                dispatch(authActions.login(data.idToken));
                emailInputRef.current.value = "";
                passwordInputRef.current.value = "";
                history.replace('/home');
            }else{
                const data = await response.json();
                alert(data.error.message);
                emailInputRef.current.value = null;
                passwordInputRef.current.value = null;
            }
        }catch(error){
            console.log(error);
        }
    };

    const buttonRedirect = () => {
        history.replace('/signup');
    };
 
    return (
        <section>
            <div className={classes.form}>
                <form onSubmit={formSubmitHandler}>
                    <h1>LogIn</h1>
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