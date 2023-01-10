import React, { useRef } from "react";
import { useHistory } from "react-router-dom";
import  classes  from "./SignUp.module.css";

const SignUp = () => {
  const history = useHistory();
    const emailInputRef = useRef();
    const passwordInputRef = useRef();
    const confirmPasswordInputRef = useRef();

    const submitHandler = async(event) => {
        event.preventDefault();

        const enteredEmail = emailInputRef.current.value;
        const enteredPassword = passwordInputRef.current.value;

        if (passwordInputRef.current.value === confirmPasswordInputRef.current.value) {
            try {
              const response = await fetch(
                "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBo2nLTGOdM4YGTS68TUWZn1dYkSLrBhfY",
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
              if (response.ok) {
                console.log("User has successfully signed up.");
                emailInputRef.current.value = "";
                passwordInputRef.current.value = "";
                confirmPasswordInputRef.current.value = "";
              } else {
                const data = await response.json();
                alert(data.error.message);
              }
            } catch (error) {
              console.log(error);
            }
        } else {
             alert('Password doesnot match.');
             passwordInputRef.current.value = "";
             confirmPasswordInputRef.current.value = "";
        }
    }

    const btnRedirect = () => {
      history.replace('/');
    };

    return (
        <section>
            <div className={classes.form}>
                <form onSubmit={submitHandler}>
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
                    <div className={classes.control}>
                        <input 
                            id="confirm-password" 
                            placeholder="Confirm Password" 
                            type="password" 
                            minLength="6"
                            maxLength="16"
                            ref={confirmPasswordInputRef} 
                        required/>
                    </div>
                    <div className={classes.actions}>
                        <button>SignUp</button>
                    </div>
                </form>
            </div>
            <div className={classes.login}>
                <button onClick={btnRedirect}>Have an account?Login</button>
            </div>
        </section>
    );
};

export default SignUp;