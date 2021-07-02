import React from 'react';
import './style.css';
import search from './images/search.png'

const searchBar = ()=>{
    return (
    <div className="searchBarArea">
        <div className="searchBarBox">
            <input className="searchBar" placeholder="Search" type="text"/>
            <div className="iconContainer">
                <img className="searchIcon" src={search}/>
            </div>
        </div>
    </div>
    );
}

export default searchBar;