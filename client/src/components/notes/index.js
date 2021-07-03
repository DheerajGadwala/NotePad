import React from 'react';
import './style.css';
import Note from './note';

const Notes = (props)=>{

    const ret = [];

    let i=0;
    while(i<props.data.length){
        ret.push(
            <Note
            key = {i/3}
            id = {i}
            data = {props.data}
            setData = {props.setData}
            saveButton = {props.saveButton}
            toggleSaveButton = {props.toggleSaveButton}
            />
        );
        i+=3;
    }

    return (
    <div className="notesArea">
        {ret}
    </div>
    );
}

export default Notes;