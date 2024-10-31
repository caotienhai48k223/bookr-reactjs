import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import NotFound from './NotFound';
import api from "../api";
import Loading from '../components/Loading';

const BookDetail = () => {
  const { id } = useParams();
  const [book, setBook] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false)
  const [content, setContent] = useState('')
  const [rating, setRating] = useState('')

  useEffect(() => {
    const fetchBookDetail = async () => {
      setLoading(true)
      try {
        const { data } = await api.get(`/api-real/books/${id}/`);
        setBook(data);
      } catch {
        setError('Book not found');
      } finally {
        setLoading(false)
      }
    };

    fetchBookDetail();
  }, [id]);

  const createReview = async (e) => {
    e.preventDefault();
    try {
      const { data } = await api.post('http://localhost:8000/api-real/reviews/',{ content, rating, book_id: book.id })
      const newReview = {
        content,
        rating,
        creator: { username: data.creator.username },
        date_created: data.date_created
      };
      setBook(prevBook => ({
        ...prevBook, reviews: [...prevBook.reviews, newReview],
      }));
      setContent('')
      setRating('')
    } catch {
      alert('Can not comment')
    }
  };

  if (loading) return <Loading/>

  if (error) return <NotFound/> ;

  return (
    <div className='bg-slate-400 font-mulish text-white min-h-[81.5vh]'>
      <h1 className='text-[40px] bg-slate-600 text-white'>{book.title}</h1>
      <div>
        <p>Tiêu đề: {book.title}</p>
        <p>ISBN: {book.isbn}</p>
        <p>Nhà xuất bản: {book.publisher}</p>
        <p>Đánh giá trung bình: {book.rating ? book.rating : 'Chưa có đánh giá'}</p>
      </div>
      <div>
        <h2 className='text-[30px] font-bold bg-slate-600 text-white'>Contributor</h2>
        {book.contributors && book.contributors.length > 0 ? (
          <ul>
            {book.contributors.map(contributor => (
              <li key={contributor.id}>
                <p>Full Name: {contributor.contributor.first_names} {contributor.contributor.last_names}</p>
                <p>Role: {contributor.role}</p>
                <p>Email: {contributor.contributor.email}</p>
              </li>
            ))}
          </ul>
        ) : (<p>Không có tác giả</p>)}
      </div>
      <div>
        <h2 className='text-[30px] font-bold bg-slate-600 text-white'>Review</h2>
        {book.reviews && book.reviews.length > 0 ? (
          <ul>
            {book.reviews.map(review => (
              <li key={review.id}>
                <p>{review.creator.username}</p>
                <p>{review.content}</p>
                <p>{new Date(review.date_created).toLocaleString('vi-VN', {
                  day: 'numeric',
                  month: 'numeric',
                  year: 'numeric',
                  hour: 'numeric',
                  minute: 'numeric'
                })}</p>
                <p>Rating: {review.rating}</p>
              </li>
            ))}
          </ul>
        ) : (<p>Chưa có bình luận</p>)}
        <form onSubmit={createReview}>
          <input type="text" name='content' 
            className='bg-slate-400  border-b-2 outline-none'
            required value={content} 
            onChange={(e) => setContent(e.target.value)}
          />
          <br />
          <input type="number" name="rating" max={5} min={1} 
            className='bg-slate-400  border-b-2 outline-none'
            required value={rating} 
            onChange={(e) => setRating(e.target.value)} 
          />
          <br />
          <button>Submit</button>
        </form>
      </div>
    </div>
  )
}

export default BookDetail