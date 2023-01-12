import axios from "axios";
import React, { useRef, useState } from "react";
import TextEditor from "./Editor";
import { useDispatch } from "react-redux";
import { composeActions } from "../../store/compose";
import classes from "./ComposeMail.module.css";

const ComposeMail = () => {
    const dispatch = useDispatch();
    const emailRef = useRef();
    const subjectRef = useRef();
    const [ message , setMessage ] = useState("");

    const submitHandler = async(event) => {
        event.preventDefault();

        const enteredEmail = emailRef.current.value;
        const senderEmail = localStorage.getItem('email');
        const receiver = enteredEmail.substring(0, enteredEmail.lastIndexOf('@'));
        const sender = senderEmail.substring(0, senderEmail.lastIndexOf('@'));

        const composeData = {
            sender,
            receiver,
            email: senderEmail,
            subject: subjectRef.current.value,
            body: message,
        };

        try{
            const response = await axios.post(`https://mail-box-fca66-default-rtdb.firebaseio.com/${receiver}/receive.json`, composeData);
            if(response.statusText === "OK"){
                alert('Sent mail Successfully');
                dispatch(composeActions.editorIsClose());
            }else{
                throw new Error('Sending mail failed');
            }
        }catch(error){
            alert(error);
        }
    };

    const closeHandler = () => {
        dispatch(composeActions.editorIsClose());
    };

    return (
        <section className={classes.compose}>
            <div className={classes.header}>
                <h3>New Message</h3>
                <button onClick={closeHandler}>x</button>
            </div>
            <form onSubmit={submitHandler}>
                <div>
                    <input type="email" placeholder="To" ref={emailRef} required/>
                    <input type="text" placeholder="Subject" ref={subjectRef} required/>
                </div>
                <div className={classes.editor}>
                    <label>Enter Message</label>
                    <TextEditor setMessage={setMessage}/>
                </div>
                <div className={classes.actions}>
                    <button>Send</button>
                </div>
            </form>
        </section>
    );
};

export default ComposeMail;