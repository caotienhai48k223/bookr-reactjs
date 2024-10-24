import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios';

const BookDetail = () => {
  const { id } = useParams();
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBookDetail = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/api-real/books/${id}/`);
        setBook(response.data);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchBookDetail();
  }, [id]);

  if (loading) return <div>Đang tải dữ liệu...</div>;
  if (error) return <div>Lỗi lấy thông tin chi tiết sách: {error.message}</div>;

  return (
    <div className='bg-teal-100'>
      {book ? (
        <>
          <h1 className='font-mulish text-[40px] font-bold bg-teal-300 text-pink-600'>Chi tiết sách</h1>
          <div>
            <p>Tiêu đề: {book.title}</p>
            <p>ISBN: {book.isbn}</p>
            <p>Nhà xuất bản: {book.publisher}</p>
            <p>Đánh giá trung bình: {book.rating ? book.rating : 'Chưa có đánh giá'}</p>
          </div>
          <div>
            <h2 className='font-mulish text-[30px] font-bold bg-teal-300 text-pink-600'>Bình luận:</h2>
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
          </div>
        </>
      ) : (<h1>Không tìm thấy cuốn sách</h1>)}
    </div>
  )
}

export default BookDetail