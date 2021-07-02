import React, {useState} from 'react';
import './style.css';

const Note = (props)=>{

    const [title, setTitle] = useState(props.title);
    const [content, setContent] = useState(props.content);

    return(
    <div className="note">
        <div className="noteTitle">
            <input type="text" className="titleInput" value={title} onChange={e=>setTitle(e.target.value)}/>
        </div>
        <div className="bar">
        </div>
        <div className="noteContent">
            <textarea className="contentInput" value={content} onChange={e=>setContent(e.target.value)}/>
        </div>
    </div>
    );
}

export default Note;