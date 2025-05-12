

import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function UserDashboard() {
  const navigate = useNavigate();

  const handleViewBooks = () => {
    navigate('/userbooks');
  };

  return (
    <div
      className="w-screen h-screen bg-cover bg-center relative flex items-center justify-center"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?auto=format&fit=crop&w=1950&q=80')",
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-black/80 to-black/60"></div>

      {/* Content */}
      <div className="relative z-10 text-center px-6 max-w-3xl">
        <h1 className="text-5xl font-extrabold mb-5 drop-shadow-lg tracking-wide text-yellow-100">
          Welcome to Your Personal Book Heaven
        </h1>
        <p className="text-xl italic text-yellow-300 mb-8">
          “A reader lives a thousand lives before he dies. The man who never reads lives only one.”  
          <span className="block mt-1 text-yellow-400">– George R.R. Martin</span>
        </p>
        <button
          onClick={handleViewBooks}
          className="bg-indigo-600 hover:bg-indigo-700 text-yellow-50 px-8 py-3 text-lg font-semibold rounded-full shadow-xl transition duration-300 ease-in-out transform hover:scale-105"
        >
          📚 Explore Books
        </button>
      </div>
    </div>
  );
}
