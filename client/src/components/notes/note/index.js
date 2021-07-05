import React, {useState, useEffect} from 'react';
import './style.css';
import coloursImage from './images/colours.png';
import deleteImage from './images/delete.png';
import leftImage from './images/left.png';
import rightImage from './images/right.png';

const Note = (props)=>{

    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [colour, setColour] = useState(0);

    useEffect(()=>{
        setTitle(props.data[props.id]);
        setContent(props.data[props.id+1]);
        setColour(parseInt(props.data[props.id+2]));

    }, [props]);

    const helper = (delay)=>{
        return new Promise (resolve=>{
            setTimeout(()=>{

                resolve();
            }, delay);
        });
    }
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
    const deleteNote = async (e)=>{
        if(!props.loading){
            document.getElementById(props.id).classList.add('deleting');
            await helper(500);
            document.getElementById(props.id).classList.remove("deleting");
            props.setChanges(true);
            let data = [...props.data];
            data.splice(props.id, 3);
            props.setData(data);
        }
    }
    const move = (obj, targetX, targetY)=>{
        return new Promise((resolve)=>{
            var left = 0;
            var top = 0;
            var frameRate = 100;
            var id = setInterval(()=>{
                if(Math.round(left)!=targetX)
                    left+=targetX/frameRate;
                if(Math.round(top)!=targetY)
                    top+=targetY/frameRate;
                obj.style.left = left + 'px';
                obj.style.top = top + 'px';
                if((Math.round(left)==targetX)&&(Math.round(top)==targetY)){
                        clearInterval(id);
                        resolve();
                    }
            }, 1);
        });
    }

    const moveRight = async ()=>{
        if(!props.loading && props.id+3!=props.data.length){
            props.setChanges(true);
            let data = [...props.data];
            let temp;
            temp = data[props.id];
            data[props.id] = data[props.id+3];
            data[props.id+3] = temp;
            temp = data[props.id+1];
            data[props.id+1] = data[props.id+4];
            data[props.id+4] = temp;
            temp = data[props.id+2];
            data[props.id+2] = data[props.id+5];
            data[props.id+5] = temp;
            let divA = document.getElementById(""+props.id);
            let divB = document.getElementById(""+(props.id+3));
            Promise.all([   move(divA, divB.offsetLeft-divA.offsetLeft, divB.offsetTop-divA.offsetTop), 
                            move(divB, divA.offsetLeft-divB.offsetLeft, divA.offsetTop-divB.offsetTop)
                        ]).then((values) => {
                props.setData(data);
                divA.style.top=0;
                divA.style.left=0;
                divB.style.top=0;
                divB.style.left=0;
            }); 
        }
    }
    const moveLeft = ()=>{
        if(!props.loading && props.id!=0){
            props.setChanges(true);
            let data = [...props.data];
            let temp;
            temp = data[props.id];
            data[props.id] = data[props.id-3];
            data[props.id-3] = temp;
            temp = data[props.id+1];
            data[props.id+1] = data[props.id-2];
            data[props.id-2] = temp;
            temp = data[props.id+2];
            data[props.id+2] = data[props.id-1];
            data[props.id-1] = temp;
            let divA = document.getElementById(""+props.id);
            let divB = document.getElementById(""+(props.id-3));
            Promise.all([   move(divA, divB.offsetLeft-divA.offsetLeft, divB.offsetTop-divA.offsetTop), 
                            move(divB, divA.offsetLeft-divB.offsetLeft, divA.offsetTop-divB.offsetTop)
                        ]).then((values) => {
                props.setData(data);
                divA.style.top=0;
                divA.style.left=0;
                divB.style.top=0;
                divB.style.left=0;
            }); 
        }
    }

    return(
    <div className="note" colour = {colour} id={props.id}>
        <div className="icons">
            <div>
                <img className={props.loading?"deleteImage loadingEnabledImages":"deleteImage"} src={deleteImage} onClick={deleteNote}/>
            </div>
            <div>
                <img className={props.loading?"leftImage loadingEnabledImages":"leftImage"} src={leftImage} onClick={moveLeft}/>
            </div>
            <div>
                <img className={props.loading?"rightImage loadingEnabledImages":"rightImage"} src={rightImage} onClick={moveRight}/>
            </div>
            <div>
                <img className={props.loading?"coloursImage loadingEnabledImages":"coloursImage"} src={coloursImage} onClick={colourChange}/>
            </div>
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