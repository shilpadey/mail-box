import React, { useRef } from "react";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { useDispatch } from "react-redux";
import { addMail } from "../../store/inbox-actions";
import { Container, Button, Card, Form } from "react-bootstrap";
import classes from "./ComposeMail.module.css";

const ComposeMail = () => {
    const dispatch = useDispatch();
    const emailRef = useRef();
    const subjectRef = useRef();
    let body;
    
    const handleEditorChange = (event) => {
        body = event.getCurrentContent().getPlainText();
    };

    const clearInputFields = () => {
        emailRef.current.value = "";
        subjectRef.current.value = "";
        body = null;
    };

    const submitComposeHandler = (event) => {
        event.preventDefault();

        const mailData = {
            from: JSON.parse(localStorage.getItem("idToken")).email,
            to: emailRef.current.value,
            title: subjectRef.current.value,
            text: body,
        };
        
        dispatch(addMail(mailData, clearInputFields));
    }; 

    return (
        <>
            <Container className={classes.compose}>
                <Card
                    style={{ margin: "65px 77px", width: "80%", height: "60%" }}
                >
                    <Card.Header className="bg-secondary">
                        <Form>
                        <input
                            placeholder="To"
                            ref={emailRef}
                            style={{ width: "100%", marginBottom: "10px" }}
                        ></input>
                        <input
                            placeholder="Subject"
                            ref={subjectRef}
                            style={{ width: "100%", marginBottom: "10px" }}
                        ></input>
                        </Form>
                    </Card.Header>
                    <Card.Body>
                        <Editor
                            onEditorStateChange={handleEditorChange}
                            toolbarClassName="toolbarClassName"
                            wrapperClassName="wrapperClassName"
                            editorClassName="editorClassName"
                        ></Editor>
                    </Card.Body>
                    <Card.Footer className=" bg-secondary">
                        <Button
                            variant="danger"
                            style={{ cursor: "pointer" }}
                            type="submit"
                            onClick={submitComposeHandler}
                        >
                            Send
                        </Button>
                    </Card.Footer>
                </Card>
            </Container>
        </>
    );
};

export default ComposeMail;