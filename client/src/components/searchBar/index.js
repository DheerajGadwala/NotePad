import React, {useRef} from 'react';
import './style.css';
import search from './images/search.png';
import save from './images/save.png';

const SearchBar = (props)=>{

    const searchBarRef = useRef(null);
    const navigateUpRef = useRef(null);
    const addNoteRef = useRef(null);
    const saveRef = useRef(null);

    window.onscroll = ()=>{
        if(!navigateUpRef.current.classList.contains("navigateUpVisibility") && window.pageYOffset >= 85){
            navigateUpRef.current.style.animation = "addNavigateUp 0.5s";
            addNoteRef.current.style.animation = "addNoteMoveLeft 0.5s";
            saveRef.current.style.animation = "saveMoveLeft 0.5s";  
            navigateUpRef.current.classList.add("navigateUpVisibility");
            addNoteRef.current.classList.add("addNotePosition");
            saveRef.current.classList.add("savePosition");
        }
        else if(navigateUpRef.current.classList.contains("navigateUpVisibility") && window.pageYOffset < 85){
            navigateUpRef.current.style.animation = "removeNavigateUp 0.5s"; 
            addNoteRef.current.style.animation = "addNoteMoveRight 0.5s";
            saveRef.current.style.animation = "saveMoveRight 0.5s";
            navigateUpRef.current.classList.remove("navigateUpVisibility");
            addNoteRef.current.classList.remove("addNotePosition");
            saveRef.current.classList.remove("savePosition");
        }
    }

    const addNote = ()=>{
        let data = [...props.data];
        data.push("Title");
        data.push("Notes");
        data.push("0");
        props.setData(data);
    }

    const saveData = async ()=>{
        console.log("started", props.Contract);
        if(props.Contract){
            console.log("inside");
            let titles = [];
            let content = [];
            let colours = [];
            var i=0;
            while(i<props.data.length){
                titles.push(props.data[i++]);
                content.push(props.data[i++]);
                colours.push(props.data[i++]);
            }
            await props.Contract.methods.update("0xf17f52151ebef6c7334fad080c5704d77216b732", titles, content, colours).send({from: props.Accounts[0]});
            
        }
        console.log("done");
    }

    return (
    <>
        <div className="searchBarArea" ref={searchBarRef}>
            <div className="searchBarBox">
                <input className="searchBar" placeholder="Search" type="text"/>
                <div className="iconContainer">
                    <img className="searchIcon" src={search}/>
                </div>
            </div>
        </div>
        <div className="navigateUp" ref={navigateUpRef} onClick={()=>{window.scrollTo({top:0, left:0, behavior:'smooth'})}}>
            <div className="navigateUpLeftBar">
            </div>
            <div className="navigateUpRightBar">
            </div>
            <div className="navigateUpBottomBar">
            </div>
        </div>
        <div className="addNote" ref={addNoteRef} onClick = {addNote}>
            <div className="addNoteVerticalBar">
            </div>
            <div className="addNoteHorizontalBar">
            </div>
        </div>
        <div className="save" ref={saveRef} onClick = {saveData}>
            <img className="saveIcon" src={save}/>
        </div>
    </>
    );
}

export default SearchBar;