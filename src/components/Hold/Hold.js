import React from 'react';
// import axios from 'axios';

function Hold(props){
    const {title, author_fl, cover, id} = props.hold
    const entities = {
        '&#039;' : "'"
    }
    return (
        <div className="hold">
            <img src={cover} alt={`${title} cover art`}/>
            <div className="info">
                <h1>{title.replace(/&#?\w+;/, match => entities[match])}</h1>
                <h2>{author_fl}</h2>
                <br/>
            </div>
            <button onClick={() => props.delete(id)}>Remove Hold</button>
        </div>
    )
}

export default Hold;