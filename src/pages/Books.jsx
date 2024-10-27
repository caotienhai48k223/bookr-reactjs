import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { ImPriceTags, ImCalendar, ImBarcode, ImStarHalf, ImStarFull } from "react-icons/im";
import NotFound from './NotFound';
import Loading from '../components/Loading';

const Books = () => {
  const [publishers, setPublishers] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false)
  
  useEffect(() => {
    const fetchPublishers = async () => {
      setLoading(true)
      try {
        const { data }= await axios.get('http://localhost:8000/api-real/publishers/');
        setPublishers(data);
      } catch {
        setError('No information found about the book');
      } finally {
        setLoading(false)
      }
    };

    fetchPublishers();
  }, []);

  if (loading) return <Loading/>

  if (error) return <NotFound/>;


  return (
    <div className='bg-slate-400 font-mulish pb-2'>
      <h1 className='text-[40px] bg-slate-600 text-white'>Our Bookshelf</h1>
      <br />
      <div className='ml-14 mr-14'>
        <ul>
        {publishers.filter(publisher => publisher.books.length > 0).map(publisher => (
          <li key={publisher.id}>
            <div className='text-[25px] mb-2 rounded border border-solid border-white bg-gradient-to-r from-slate-900 to-slate-400 text-white'>
              {publisher.name}
            </div>
            <div className='rounded border border-solid border-white bg-white mb-5'>
              {publisher.books.map(book => (
                <div className='m-3'>
                  <div className='text-start flex gap-2 items-center text-[18px] mb-1'><ImPriceTags />Title: <a href={`/books/${book.id}`}>{book.title}</a></div>
                  <div className='text-start ml-7 flex items-center gap-2'><ImCalendar />Publication Date: {book.publication_date}</div>
                  <div className='text-start ml-7 flex items-center gap-2'><ImBarcode />ISBN: {book.isbn}</div>
                  {book.rating && (
                    <div className='text-start ml-7 flex items-center gap-2'>
                      {book.rating === 5 ? <ImStarFull /> : <ImStarHalf />}
                      Rating: {book.rating}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </li>
        ))}
        </ul>
      </div>
    </div>
  )
}

export default Books