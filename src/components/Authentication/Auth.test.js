import { fireEvent, render, screen } from "@testing-library/react"
import { Provider } from "react-redux";
import { Router } from "react-router-dom";
import {createMemoryHistory} from 'history';
import store from "../../store/index";
import Login from "./Login";
import SignUp from "./SignUp"


describe("SignUp Component" , () => {
    test("render sign up text" , () => {
        render(
            <SignUp />
        );

        const signUpElement = screen.findByText("Sign Up" , {exact: false});
        expect(signUpElement).toBeInTheDocument;
    });

    test('render email text', () => {
        render(
            <SignUp />
        );

        const emailTextElement = screen.findAllByPlaceholderText("Email");
        expect(emailTextElement).toBeInTheDocument;
    });

    test('render signUp button', () => {
        render(
            <SignUp />
        );

        fireEvent.click(screen.getByText('SignUp'));
    });

    test('render password text', () => {
        render(
            <SignUp />
        );

        const passwordElement = screen.findAllByPlaceholderText("Password");
        expect(passwordElement).toBeInTheDocument;
    });

    test('render login button', () => {
        const history = createMemoryHistory();

        render(
            <Router history={history}>
                <SignUp />
            </Router>
        );

        fireEvent.click(screen.getByText('Login', {exact:false}));
    });
});

describe("Login Component" , () => {
    test('render', () => {
        render(
            <Provider store={store}>
                    <Login />
            </Provider>
        );

        const loginElement = screen.getByText("LogIn");
        expect(loginElement).toBeInTheDocument;
    });

    test('render email text', () => {
        render(
            <Provider store={store}>
                <Login />
            </Provider> 
        );

        const emailElement = screen.getByPlaceholderText('Email');
        expect(emailElement).toBeInTheDocument;
    });
})