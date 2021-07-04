import React, {useState, useEffect} from 'react';
import './style.css';
import coloursImage from './images/colours.png';
import deleteImage from './images/delete.png';

const Note = (props)=>{

    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [colour, setColour] = useState(0);

    useEffect(()=>{
        setTitle(props.data[props.id]);
        setContent(props.data[props.id+1]);
        setColour(parseInt(props.data[props.id+2]));

    }, [props]);

    const titleChange = (e)=>{
        if(!props.loading){
            props.setChanges(true);
            setTitle(e.target.value);
            let data = [...props.data];
            data[props.id] = e.target.value;
            props.setData(data);
        }
    }
    const contentChange = (e)=>{
        if(!props.loading){
            props.setChanges(true);
            setContent(e.target.value);
            let data = [...props.data];
            data[props.id+1] = e.target.value;
            props.setData(data);
        }
    }
    const colourChange = ()=>{
        if(!props.loading){
            props.setChanges(true);
            setColour((colour+1)%4);
            let data = [...props.data];
            data[props.id+2] = ""+(colour+1)%4;
            props.setData(data);
        }
    }
    const deleteNote = ()=>{
        if(!props.loading){
            props.setChanges(true);
            let data = [...props.data];
            data.splice(props.id, 3);
            props.setData(data);
        }
    }

    return(
    <div className="note" colour = {colour}>
        <div className="coloursImageContainer">
            <img className={props.loading?"coloursImage loadingEnabledImages":"coloursImage"} src={coloursImage} onClick={colourChange}/>
        </div>
        <div className="deleteImageContainer">
            <img className={props.loading?"deleteImage loadingEnabledImages":"deleteImage"} src={deleteImage} onClick={deleteNote}/>
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