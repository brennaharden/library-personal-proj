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
        }).catch(err => console.log(err))
    }, [])

    const search = () => {
        const regex = new RegExp (`${titleSearch}`, "gmi")
        const regex2 = new RegExp (`${authorSearch}`, "gmi")
        const regex3 = new RegExp (`${isbnSearch}`, "gm")
        setResults(inventory.filter(item => item.title.match(regex)).filter(item => item.author_fl.match(regex2)).filter(item => item.book_id.match(regex3)))
        setSearching(true)
    }
    const clear = () => {
        setTitle('')
        setAuthor('')
        setIsbn('')
        setSearching(false)
    }
    
    
    
    return (
        <div className="catalog-wrapper">
        <div className="catalog">
            <h1>Search our Collection</h1>
            <div className="search">
                <input name="titleSearch" value={titleSearch} placeholder="Title" onChange={(e) => setTitle(e.target.value)}/>
                <input name="authorSearch" value={authorSearch} placeholder="Author" onChange={(e) => setAuthor(e.target.value)}/>
                <input name="isbnSearch" value={isbnSearch} placeholder="ISBN" onChange={(e) => setIsbn(e.target.value)}/>
                <button onClick={search}>SEARCH</button>
                <button onClick={clear}>CLEAR ALL</button>
            </div>

            {inventory.length ? <div>
            {searching ? (
                <div className='list'>{results.map(book => <Book key={book.book_id} book={book}/>)}</div>)
                : <div className='list'>{inventory.map(book => <Book key={book.book_id} book={book}/>)}</div>
            }
            </div> : <div className="empty"></div>}
        </div>
        </div>
    )
}

export default Catalog;