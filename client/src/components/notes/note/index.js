import React, {useState} from 'react';
import './style.css';
import coloursImage from './images/colours.png';

const Note = (props)=>{

    const [title, setTitle] = useState(props.data[props.id]);
    const [content, setContent] = useState(props.data[props.id+1]);
    const [colour, setColour] = useState(parseInt(props.data[props.id+2]));


    const titleChange = (e)=>{
        setTitle(e.target.value);
        let data = [...props.data];
        data[props.id] = e.target.value;
        props.setData(data);
    }
    const contentChange = (e)=>{
        setContent(e.target.value);
        let data = [...props.data];
        data[props.id+1] = e.target.value;
        props.setData(data);
    }
    const colourChange = ()=>{
        setColour((colour+1)%4);
        let data = [...props.data];
        data[props.id+2] = ""+(colour+1)%4;
        props.setData(data);
    }

    return(
    <div className="note" colour = {colour}>
        <div className="coloursImageContainer">
            <img className="coloursImage" src={coloursImage} onClick={colourChange}/>
        </div>
        <div className="noteTitle">
            <input type="text" className="titleInput" colour = {colour} value={title} onChange={titleChange}/>
        </div>
        <div className="bar">
        </div>
        <div className="noteContent">
            <textarea className="contentInput" colour = {colour} value={content} onChange={contentChange}/>
        </div>
    </div>
    );
}

export default Note;