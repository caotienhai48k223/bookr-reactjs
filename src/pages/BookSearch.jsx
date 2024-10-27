import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import Loading from '../components/Loading';

const BookSearch = () => {
  const [books, setBooks] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false)

  const locationSearch = useLocation().search

  useEffect(() => {
    const query = new URLSearchParams(locationSearch).get('q');
    if (query) {
      searchBook(query)
    } else {
      setError("No search information");
    }
  }, [locationSearch])

  const searchBook = async (query) => {
    setLoading(true)
    try {
      const { data } = await axios.get(`http://localhost:8000/api-real/books/?q=${query}`);
      if (data.length === 0) {
        setError('No matching books found')
      } else {
        setBooks(data);
      }   
    } catch {
      setError('No matching books found');
    } finally {
      setLoading(false)
    }
  }

  if (loading) return <Loading/>

  return (
    <div>
      {error ? <p>{error}</p> : 
      books.map(book => (
        <>
          <p key={book.id}>{book.title}</p>
          <p>{book.publisher}</p>
        </>
      ))}
    </div>
  )
}

export default BookSearch