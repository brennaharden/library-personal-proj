import React from 'react';

function Book(props) {
    const {title, author_fl, publicationdate, cover} = props.book
    const entities = {
        '&#039;' : "'"
    }
    return (
        <div className="book">
            <img src={cover} alt="book cover"/>
            <div className="info">
                <h1>{title.replace(/&#?\w+;/, match => entities[match])}</h1>
                <h2>by {author_fl}</h2>
                <h3>{publicationdate}</h3>
            </div>
        </div>
    )
}

export default Book;