import React, {useState, useEffect} from 'react';
import './style.css';
import Note from './note';

const Notes = (props)=>{

    const [ret, setRet] = useState([]);

    useEffect(()=>{
        let ret = [];
        let i=0;
        while(i<props.data.length){
            ret.push(
                <Note
                key = {i/3}
                id = {i}
                data = {props.data}
                setData = {props.setData}
                loading = {props.loading}
                setChanges = {props.setChanges}
                />
            );
            i+=3;
        }
        setRet(ret);
    }, [props]);

    return (
    <div className="notesArea">
        {ret}
    </div>
    );
}

export default Notes;