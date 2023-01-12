import React, {useRef}from 'react';
import { Editor } from 'react-draft-wysiwyg';
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

const TextEditor = ({setMessage}) => {
    const editor = useRef(null);
    return ( 
        <Editor 
            toolbarClassName="toolbarClassName"
            wrapperClassName="wrapperClassName"
            editorClassName="editorClassName"
            placeholder="Subject...."
            editorStyle={{
                border: "1px solid #C0C0C0",
                height: "10rem",
                padding: "8px",
                overflow: "hidden",
            }}
            ref={editor} 
            onChange={(content) =>setMessage(content)} 
        />
    );
}

export default TextEditor;