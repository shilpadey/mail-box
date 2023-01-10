import { authActions } from "./auth";

export const login = (email,password) => {
    return async(dispatch) => {
        const loggingIn = async() => {
            const response = await fetch(
                "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBo2nLTGOdM4YGTS68TUWZn1dYkSLrBhfY",
                {
                  method: "POST",
                  body: JSON.stringify({
                    email: email,
                    password: password,
                    returnSecureToken: true,
                  }),
                  headers: {
                    "Content-Type": "application/json",
                  },
                }
            );
            if (!response.ok) {
                return response.json().then((response) => {
                  throw new Error(response.error.message);
                });
            }

            const data = await response.json();
            console.log(data);
            const userLogin = {
                idToken : data.idToken,
            }
            dispatch(authActions.login(userLogin));
        }

        try{
            await loggingIn();
        }catch (error){
            alert(error);
        }
    }
};