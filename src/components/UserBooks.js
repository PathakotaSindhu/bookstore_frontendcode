import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import api from '../services/api'
export default function UserBooks() {
  const [books, setBooks] = useState([])
  const [search, setSearch] = useState('')
  const [error, setError] = useState('')
  const navigate = useNavigate()

  useEffect(() => {
    fetchBooks()
  }, [])

  const fetchBooks = async () => {
    try {
      const res = await api.get('/books/all')
      setBooks(res.data)
    } catch (err) {
      setError('Failed to load books. Please try again.')
    }
  }

  const handleLogout = () => {
    localStorage.removeItem('token')
    navigate('/logout-success')
  }

  const handleSearch = e => setSearch(e.target.value)

  const filteredBooks = books.filter(book =>
    book?.title?.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="min-h-screen bg-gray-100 py-6 px-4">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <h2 className="text-3xl font-bold text-gray-800">👤 Explore Books</h2>
          <div className="flex space-x-3">
            <button
              onClick={() => navigate('/viewcart')}
              className="bg-yellow-400 hover:bg-yellow-500 text-gray-900 px-4 py-2 rounded-full font-semibold shadow-md transition transform hover:-translate-y-0.5"
            >
              🛒 View Cart
            </button>
            <button
              onClick={() => navigate('/login')}
              className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-full font-semibold shadow-md transition transform hover:-translate-y-0.5"
            >
              Logout
            </button>
          </div>
        </div>

        {/* Search Bar */}
        <div>
          <input
            type="text"
            value={search}
            onChange={handleSearch}
            placeholder="🔍 Search by book title..."
            className="w-full p-3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-300"
          />
        </div>

        {error && <p className="text-red-600 text-center">{error}</p>}

        {/* Book Grid */}
        {filteredBooks.length === 0 ? (
          <p className="text-gray-600 text-center">No matching books found.</p>
        ) : (
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-8">
            {filteredBooks.map((book, idx) => (
              <div
                key={idx}
                className="bg-white rounded-2xl shadow-xl p-6 border border-gray-200 flex flex-col"
              >
                {/* Image */}
                {book.imageBase64 ? (
                  <img
                    src={book.imageBase64}
                    alt={book.title}
                    className="w-full h-48 object-contain rounded-md mb-4"
                  />
                ) : (
                  <div className="w-full h-48 bg-gray-200 rounded-md mb-4 flex items-center justify-center text-gray-500">
                    📖 No Image
                  </div>
                )}

                {/* Info */}
                <h3 className="text-xl font-bold text-gray-800 mb-1">{book.title}</h3>
                <p className="text-gray-600 mb-2">Author: {book.author}</p>
                <p className="text-green-600 font-semibold mb-4">₹{book.price}</p>

                {/* View More */}
                <button
                  onClick={() => navigate(`/viewbookdetails/${encodeURIComponent(book.title)}`)}
                  className="mt-auto bg-gradient-to-r from-indigo-500 to-indigo-600 hover:from-indigo-600 hover:to-indigo-700 text-white px-5 py-2 rounded-full font-medium shadow-lg transition transform hover:-translate-y-0.5"
                >
                  View More
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}



