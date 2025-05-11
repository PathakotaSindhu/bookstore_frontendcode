import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../services/api';
import { FaStar, FaShoppingCart } from 'react-icons/fa';

export default function BookDetails() {
  const { title } = useParams();
  const navigate = useNavigate();
  const [book, setBook] = useState(null);
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [comment, setComment] = useState('');
  const [reviews, setReviews] = useState([]);
  const [message, setMessage] = useState('');
  const [cartMsg, setCartMsg] = useState('');

  useEffect(() => {
    fetchBookDetails();
    fetchReviews();
  }, []);

  const fetchBookDetails = async () => {
    const res = await api.get('/books/all');
    const found = res.data.find(b => b.title === title);
    setBook(found);
  };

  const fetchReviews = async () => {
    try {
      const res = await api.get(`/books/reviewsByBookTitle?bookTitle=${encodeURIComponent(title)}`);
      setReviews(res.data);
    } catch {
      setReviews([]);
    }
  };

  const handleReviewSubmit = async e => {
    e.preventDefault();
    try {
      await api.post(`/reviews/${encodeURIComponent(book.title)}`, { rating, comment });
      setMessage('✅ Review submitted');
      setRating(0);
      setComment('');
      fetchReviews();
    } catch {
      setMessage('❌ Failed to submit review');
    }
  };

  const handleAddToCart = async () => {
    try {
      await api.post(`/cart/add-by-name?bookName=${encodeURIComponent(book.title)}&quantity=1`);
      setCartMsg(`✅ "${book.title}" added to cart.`);
      setTimeout(() => setCartMsg(''), 2000);
    } catch {
      setCartMsg(`❌ Failed to add "${book.title}" to cart.`);
    }
  };

  if (!book) return <p className="text-center mt-10 text-xl">Loading book details...</p>;

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-200 py-10 px-4 sm:px-10">
      <div className="max-w-5xl mx-auto bg-white shadow-lg rounded-xl p-8">
        {/* Book Info */}
        <div className="flex flex-col md:flex-row gap-8">
          {book.imageBase64 && (
            <img
              src={book.imageBase64}
              alt="cover"
              className="w-full md:w-1/3 h-auto object-cover rounded-lg border"
            />
          )}
          <div className="flex-1 space-y-3">
            <h2 className="text-4xl font-bold text-gray-800">{book.title}</h2>
            <p className="text-lg text-gray-600">
              Author: <span className="font-medium">{book.author}</span>
            </p>
            <p className="text-lg font-semibold text-green-600">Price: ₹{book.price}</p>
            {book.description && (
              <p className="text-gray-700 mt-2 whitespace-pre-line">
                📖 {book.description}
              </p>
            )}

            {/* Add to Cart Button */}
            <button
              onClick={handleAddToCart}
              className="mt-4 inline-flex items-center bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg shadow transition"
            >
              <FaShoppingCart className="mr-2" /> Add to Cart
            </button>
            {cartMsg && <p className="mt-2 text-green-600">{cartMsg}</p>}
          </div>
        </div>

        {/* Review Form */}
        <div className="mt-10 border-t pt-6">
          <h3 className="text-2xl font-semibold text-gray-800 mb-4">Leave a Review</h3>
          {message && <p className="mb-3 text-green-600 font-medium">{message}</p>}
          <form onSubmit={handleReviewSubmit} className="space-y-4">
            <div className="flex items-center space-x-1">
              {[...Array(5)].map((_, idx) => {
                const r = idx + 1;
                return (
                  <label key={idx}>
                    <input
                      type="radio"
                      name="rating"
                      value={r}
                      onClick={() => setRating(r)}
                      className="hidden"
                    />
                    <FaStar
                      size={30}
                      color={r <= (hover || rating) ? '#ffc107' : '#e4e5e9'}
                      onMouseEnter={() => setHover(r)}
                      onMouseLeave={() => setHover(0)}
                      className="cursor-pointer transition duration-200"
                    />
                  </label>
                );
              })}
            </div>
            <input
              type="text"
              placeholder="Write your comment..."
              value={comment}
              onChange={e => setComment(e.target.value)}
              className="w-full p-3 border rounded-lg shadow-sm"
              required
            />
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-6 py-2 rounded-lg"
            >
              Submit Review
            </button>
          </form>
        </div>

        {/* Reviews List */}
        <div className="mt-10 border-t pt-6">
          <h3 className="text-2xl font-semibold mb-4 text-gray-800">💬 User Reviews</h3>
          {reviews.length === 0 ? (
            <p className="text-gray-500">No reviews yet for this book.</p>
          ) : (
            reviews.map((review, i) => (
              <div key={i} className="border-b py-4 space-y-1">
                <p className="font-medium text-gray-900">{review.user?.fullName}</p>
                <div className="flex">
                  {[...Array(5)].map((_, idx) => (
                    <FaStar
                      key={idx}
                      size={18}
                      color={idx < review.rating ? '#ffc107' : '#e4e5e9'}
                    />
                  ))}
                </div>
                <p className="text-gray-700">{review.comment}</p>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

