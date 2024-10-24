import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { ImPriceTags, ImCalendar, ImBarcode, ImStarHalf, ImStarFull } from "react-icons/im";

const Books = () => {
  const [publishers, setPublishers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    const fetchPublishers = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api-real/publishers/');
        setPublishers(response.data);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchPublishers();
  }, []);

  if (loading) return <div>Đang tải dữ liệu</div>;
  if (error) return <div>Lỗi lấy thông tin về sách: {error.message}</div>;


  return (
    <div className='bg-teal-100'>
      <h1 className='font-mulish text-[40px] font-bold bg-teal-300 text-pink-600'>Our Bookshelf</h1>
      <div className='ml-14 mr-14 font-mulish'>
        <ul>
          {publishers.filter(publisher => publisher.books.length > 0).map(publisher => (
            <li key={publisher.id}>
              <div className='text-[25px] font-mulish mb-2 rounded border border-solid border-teal-300 bg-gradient-to-r from-teal-500 to-pink-500 text-white'>
                {publisher.name}
              </div>
              <div className='rounded border border-solid border-teal-300 bg-white mb-5'>
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