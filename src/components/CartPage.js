import React, { useEffect, useState } from 'react';
import api from '../services/api';
import { useNavigate } from 'react-router-dom';

export default function CartPage() {
  const [cartItems, setCartItems] = useState([]);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    fetchCartItems();
  }, []);

  const fetchCartItems = async () => {
    try {
      const res = await api.get('/cart/view');
      setCartItems(res.data);
    } catch (err) {
      setError('❌ Failed to load cart.');
    }
  };

  const handleDelete = async (bookName) => {
    try {
      await api.delete(`/cart/deletebyname?bookName=${encodeURIComponent(bookName)}`);
      setMessage(`✅ Removed "${bookName}" from cart.`);
      fetchCartItems();
    } catch (err) {
      setMessage(`❌ Failed to remove "${bookName}".`);
    }

    setTimeout(() => setMessage(''), 2500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-100 py-10 px-4">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl font-bold text-center text-indigo-800 mb-8 drop-shadow-md">
          🛒 Your Shopping Cart
        </h2>

        {error && <p className="text-red-600 text-center">{error}</p>}
        {message && <p className="text-center text-green-600 font-medium">{message}</p>}

        {cartItems.length === 0 ? (
          <p className="text-center text-gray-600 text-lg">Your cart is empty.</p>
        ) : (
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
            {cartItems.map((item, idx) => (
              <div
                key={idx}
                className="bg-white rounded-xl shadow-md border border-gray-200 flex flex-col overflow-hidden"
              >
                {/* Image */}
                {item.book?.imageBase64 ? (
                  <div className="h-56 bg-white flex items-center justify-center overflow-hidden">
                    <img
                      src={item.book.imageBase64}
                      alt={item.book.title}
                      className="max-h-full max-w-full object-contain"
                    />
                  </div>
                ) : (
                  <div className="h-56 bg-gray-100 flex items-center justify-center text-gray-500 text-lg">
                    📚 No Image
                  </div>
                )}

                {/* Book Info */}
                <div className="p-4 flex flex-col justify-between flex-grow">
                  <h3 className="text-xl font-semibold text-gray-800 mb-1">{item.book?.title}</h3>
                  <p className="text-gray-700">Quantity: <span className="font-medium">{item.quantity}</span></p>
                  <p className="text-green-600 font-semibold mb-3">Price: ₹{item.book?.price}</p>

                  <button
                    onClick={() => handleDelete(item.book?.title)}
                    className="mt-auto bg-red-500 hover:bg-red-600 text-white py-2 rounded-full font-semibold transition duration-300 shadow-sm"
                  >
                    ❌ Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="mt-10 text-center">
          <button
            onClick={() => navigate('/user-dashboard')}
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-full font-semibold shadow-lg transition duration-300"
          >
            ← Back to Dashboard
          </button>
        </div>
      </div>
    </div>
  );
}
