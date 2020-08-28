import React, {useState, useEffect} from 'react';
import {useDispatch} from 'react-redux';
import {useHistory} from 'react-router-dom';
import {searchBooks} from '../../ducks/searchReducer';
import axios from 'axios';

function Catalog() {
    const dispatch = useDispatch()
    const history = useHistory()
    const [title, setTitle] = useState('')
    const [author, setAuthor] = useState('')
    const [subject, setSubject] = useState('')
    const [isbn, setIsbn] = useState('')
    const [books, setBooks] = useState('')


    useEffect(() => {
        axios.get('https://www.librarything.com/api_getdata.php?userid=libsimbah&key=2719823726&responseType=json').then(res => {
            console.log(res.data)
            setBooks(res.data)
            
        })
    }, [])
    
    console.log(books)
    // const search = () => {
        // let searchTerms = {
        //     title,
        //     author,
        //     subject,
        //     isbn
        // }
        // let query = []
        // for (let elem in searchTerms){
        //     if(searchTerms[elem]){
        //       query.push(`${elem}=${searchTerms[elem]}`)
        //     }
        // }
        // let finishedQuery = query.join('&')
           
        // axios.get(`https://www.googleapis.com/books/v1/volumes?q=${finishedQuery}&orderBy=relevance&key=AIzaSyDa-qputY7sJmrZNdKQjIOsq_Bx9S-lWaU`).then((res) => {
        // console.log(res.data)    
        // dispatch(searchBooks(res.data))
        // history.push('/results')
        // }).catch(err => console.log(err))

       
    // }
        // const {}
    return (
        <div>
            <h1>Search our Collection</h1>
            
            
            {books ? <h2>{books.books['188701671'].title}</h2> : null}
            {/* <input name={title} placeholder="Title" onChange={(e) => setTitle(e.target.value)}/>
            <input name={author} placeholder="Author" onChange={(e) => setAuthor(e.target.value)}/>
            <input name={subject} placeholder="Subject" onChange={(e) => setSubject(e.target.value)}/>
            <input name={isbn} placeholder="ISBN" onChange={(e) => setIsbn(e.target.value)}/>
            <button onClick={search}>SEARCH</button> */}
        </div>
    )
}

export default Catalog;