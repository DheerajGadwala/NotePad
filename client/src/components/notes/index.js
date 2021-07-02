import React from 'react';
import './style.css';
import Note from './note';

const Notes = ()=>{
    return (
    <div className="notesArea">
        <Note
        title = "note 1"
        content = "content 1"
        />
        <Note
        title = "note 2"
        content = "content 2"
        />
        <Note
        title = "note 3"
        content = "content 3"
        />
        <Note
        title = "note 4"
        content = "content 4"
        />
    </div>
    );
}

export default Notes;