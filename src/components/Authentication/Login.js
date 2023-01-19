import React, { useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { authActions } from "../../store/auth";
import { Button, Card } from "react-bootstrap";
import { Form, Container } from "react-bootstrap";
import classes from './SignUp.module.css';

const Login = () => {
    const history = useHistory()
    const dispatch = useDispatch();
    const emailInputRef = useRef();
    const passwordInputRef = useRef();
    const confirmPasswordRef = useRef();
    const [hasAccount, setHasAccount] = useState(true);

    const hasAccountHandler = () => {
        setHasAccount((preState) => !preState);
    };

    let url;
  if (hasAccount) {
    url =
      "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBo2nLTGOdM4YGTS68TUWZn1dYkSLrBhfY";
  } else {
    url =
      "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBo2nLTGOdM4YGTS68TUWZn1dYkSLrBhfY";
  }

    const formSubmitHandler = async(event) => {
        event.preventDefault();

        if (!hasAccount && passwordInputRef.current.value !== confirmPasswordRef.current.value) 
        {
            alert("Password and Confirmed password are different");
            return;
        };

        try{
            const response = await fetch(url,
                {
                  method: "POST",
                  body: JSON.stringify({
                    email: emailInputRef.current.value,
                    password: passwordInputRef.current.value,
                    returnSecureToken: true,
                  }),
                  headers: {
                    "Content-Type": "application/json",
                  },
                }
            );

            const data = await response.json();
    
            if(response.ok){
                //const data = await response.json();
                localStorage.setItem("idToken", JSON.stringify(data));
                localStorage.setItem("userID", data.localId);
                localStorage.setItem("email", data.email);
                dispatch(authActions.login());
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

    
 
    return (
        <>
            <Container className={classes["main-form"]} style={{ width: "400px" }}>
            <Card className={classes.form} style={{ marginTop: "100px" }}>
            <Card.Header style={{ backgroundColor: "lightseagreen" }}>
                <h2>{hasAccount ? "Login" : "Sign Up"}</h2>
            </Card.Header>
            <Card.Body>
                <Form onSubmit={formSubmitHandler}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Control
                    type="email"
                    placeholder="Enter email"
                    ref={emailInputRef}
                    required
                    />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Control
                    type="password"
                    placeholder="Password"
                    ref={passwordInputRef}
                    required
                    />
                </Form.Group>
                {!hasAccount && (
                    <Form.Group className="mb-3" controlId="formConfirmPassword">
                    <Form.Control
                        type="confirmpassword"
                        placeholder="Confirm Password"
                        ref={confirmPasswordRef}
                        required
                    />
                    </Form.Group>
                )}
                <Form.Group className={classes.button}>
                    <Button
                        type="submit"
                    >
                    {hasAccount ? "Login" : "Sign Up"}
                    </Button>
                </Form.Group>
                {/* {isSendingRequest && (
                <Alert style={{ textAlign: "center" }}>Sending Request</Alert>
                )} */}
                <Card.Footer
                    className={classes.hasAccount}
                    style={{ textAlign: "center", cursor: "pointer" }}
                >
                    <div onClick={hasAccountHandler}>
                    {hasAccount
                        ? "Don`t have an account? Sign Up"
                        : "Have an account? Sign In"}
                    </div>
                </Card.Footer>
                </Form>
            </Card.Body>
            </Card>
        </Container>
    </>
    );
};

export default Login;