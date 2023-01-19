import React from "react";
import { useDispatch, useSelector } from "react-redux";
import ComposeMail from "../../components/ComposeMail/ComposeMail";
import Inbox from "../../components/Inbox/Inbox";
import Sidebar from "../../components/Layout/Sidebar";
import classes from "./Home.module.css";
import { emailFetch, updateMail } from "../../store/inbox-actions";
import Sent from "../../components/Inbox/Sent";

const Home = () => {
    const state = useSelector(state => state.show);
    const isLoggedIn = useSelector(state => state.auth.isLoggedIn);
    const firstTime = useSelector(state => state.inbox.firstTime);
    console.log(firstTime);
    const currentMailData = useSelector(state => state.inbox.mailData);
    console.log(currentMailData);
    const dispatch = useDispatch();
    if(isLoggedIn && firstTime){
        const loggedUserEmail = JSON.parse(localStorage.getItem("idToken")).email;
        const emailUrl = loggedUserEmail.replace("@", "").replace(".", "");
        dispatch(emailFetch(emailUrl, loggedUserEmail));
    };

    if (isLoggedIn) {
        setInterval(() => {
          if (isLoggedIn) {
            const loggedUserEmail = JSON.parse(
              localStorage.getItem("idToken")
            ).email;
            const emailUrl = loggedUserEmail.replace("@", "").replace(".", "");
            dispatch(updateMail(emailUrl, loggedUserEmail, currentMailData));
          }
        }, 5000);
    }

    return (
        <React.Fragment>
            <Sidebar />
            {state.welcome && 
                <div>
                    Welcome to the mail box
                </div>
            }
            <div className={classes.home}>
            {state.compose && <ComposeMail />}
            {state.received && <Inbox />}
            {state.sent && <Sent />}
            </div>
        </React.Fragment>
    );
};

export default Home;