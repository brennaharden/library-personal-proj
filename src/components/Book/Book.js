import React from 'react';
import axios from 'axios';
import {useSelector} from 'react-redux';


function Book(props) {
    const {title, author_fl, publicationdate, cover, ISBN, book_id} = props.book
    const entities = {
        '&#039;' : "'"
    }
    const {user} = useSelector((state) => state.authReducer)
    const {id} = user
    const placeHold = () => {
        if(user.id){
            axios.post('/api/hold', {id, book_id, title, author_fl, cover, ISBN})
        } else {
            alert("Please log in!")
        }
        
    }

    return (
        
            
            <div className="book">
            <a href={`http://librarything.com/isbn/${ISBN}`} target="_blank" rel="noopener noreferrer">
            <img src={cover} alt="book cover"/>
            </a>
            <div className="info">
                <h1>{title.replace(/&#?\w+;/, match => entities[match])}</h1>
                <h2>by {author_fl}</h2>
                <h3>{publicationdate}</h3>
                <br/>
                <button onClick={placeHold}>Place a Hold</button>
            </div>
            
            
            </div>
            
        
    )
}

export default Book;