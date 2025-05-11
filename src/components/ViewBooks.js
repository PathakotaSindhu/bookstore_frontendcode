import React, { useEffect, useState } from 'react';
import api from '../services/api';

export default function ViewBooks() {
  const [books, setBooks] = useState([]);
  const [error, setError] = useState('');
  const [search, setSearch] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetchAllBooks();
  }, []);

  const fetchAllBooks = async () => {
    try {
      const res = await api.get('/books/all');
      setBooks(res.data);
      setError('');
    } catch {
      setError('Failed to load books. Please try again.');
    }
  };

  const handleSearch = async () => {
    if (search.trim() === '') {
      fetchAllBooks();
      return;
    }

    try {
      const res = await api.get(`/books/searchByTitle?title=${encodeURIComponent(search)}`);
      setBooks(Array.isArray(res.data) ? res.data : [res.data]);
      setError('');
    } catch {
      setError('Book not found or server error.');
      setBooks([]);
    }
  };

  const handleDelete = async (title) => {
    if (!window.confirm(`Are you sure you want to delete "${title}"?`)) return;

    try {
      await api.delete(`/books/delete?title=${encodeURIComponent(title)}`);
      setMessage(`✅ "${title}" deleted successfully.`);
      setTimeout(() => setMessage(''), 3000);
      fetchAllBooks();
    } catch {
      setError('❌ Failed to delete book. It may still be in use.');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-100 to-gray-200 py-10 px-4">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl font-bold text-center text-gray-800 mb-8">📚 Book Management</h2>

        {/* Search Bar */}
        <div className="flex mb-6 shadow-md rounded overflow-hidden">
          <input
            type="text"
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="🔍 Search by title..."
            className="flex-1 p-3 border border-gray-300 focus:outline-none"
          />
          <button
            onClick={handleSearch}
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 font-medium transition duration-300"
          >
            Search
          </button>
        </div>

        {/* Messages */}
        {error && <p className="text-red-600 text-center mb-4">{error}</p>}
        {message && <p className="text-green-600 text-center mb-4">{message}</p>}

        {/* Books List */}
        {books.length === 0 ? (
          <p className="text-center text-gray-600">No books available.</p>
        ) : (
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
            {books.map((book, index) => (
              <div
                key={index}
                className="bg-white rounded-xl shadow-md border border-gray-200 p-4 flex flex-col justify-between"
              >
                {/* Book Image */}
                {book.imageBase64 ? (
                  <div className="h-48 flex items-center justify-center mb-4 overflow-hidden">
                    <img
                      src={book.imageBase64}
                      alt={book.title}
                      className="max-h-full object-contain"
                    />
                  </div>
                ) : (
                  <div className="h-48 bg-gray-100 flex items-center justify-center text-gray-500 text-lg mb-4">
                    📖 No Image
                  </div>
                )}

                {/* Book Info */}
                <h3 className="text-lg font-bold text-gray-800">{book.title}</h3>
                <p className="text-gray-700">Author: {book.author}</p>
                <p className="text-green-700 font-semibold">₹{book.price}</p>

                {/* Delete Button */}
                <button
                  onClick={() => handleDelete(book.title)}
                  className="mt-4 bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-full transition duration-300 w-full"
                >
                  🗑️ Delete
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
