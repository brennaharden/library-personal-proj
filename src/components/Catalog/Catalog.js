import React, {useState, useEffect} from 'react';
import Book from '../Book/Book';
import axios from 'axios';

function Catalog() {

    const [titleSearch, setTitle] = useState('')
    const [authorSearch, setAuthor] = useState('')
    const [isbnSearch, setIsbn] = useState('')
    const [inventory, setInventory] = useState([])
    const [results, setResults] = useState([])
    const [searching, setSearching] = useState(false)


    useEffect(() => {
        axios.get('https://www.librarything.com/api_getdata.php?userid=libsimbah&key=2719823726&responseType=json').then(res => {
            let listArray = []
            for (let elem in res.data.books) {
                listArray.push(res.data.books[elem])
            }
            console.log(listArray)
            setInventory(listArray)
        }) 
    }, [])


    const search = () => {
        const regex = new RegExp (`${titleSearch}`, "gmi")
        const regex2 = new RegExp (`${authorSearch}`, "gmi")
        const regex3 = new RegExp (`${isbnSearch}`, "gm")
        setResults(inventory.filter(item => item.title.match(regex)).filter(item => item.author_fl.match(regex2)).filter(item => item.book_id.match(regex3)))
        setSearching(true)
    }
    
    
    return (
        
        <div className="catalog">
            <h1>Search our Collection</h1>
            <input name={titleSearch} placeholder="Title" onChange={(e) => setTitle(e.target.value)}/>
            <input name={authorSearch} placeholder="Author" onChange={(e) => setAuthor(e.target.value)}/>
            <input name={isbnSearch} placeholder="ISBN" onChange={(e) => setIsbn(e.target.value)}/>
            <button onClick={search}>SEARCH</button>
            <button>CLEAR ALL</button>
            {searching ? (
                <div>{results.map(book => <Book key={book.book_id} book={book}/>)}</div>)
                : <div>{inventory.map(book => <Book key={book.book_id} book={book}/>)}</div>
            }
            
            
          
        </div>
    )
}

export default Catalog;