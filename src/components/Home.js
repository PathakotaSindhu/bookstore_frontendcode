import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function HomePage() {
  const navigate = useNavigate();

  return (
    <div
      className="h-screen w-screen bg-cover bg-center relative"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1601004890684-d8cbf643f5f2?auto=format&fit=crop&w=1950&q=80')",
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-70 z-0"></div>

      {/* Content */}
      <div className="relative z-10 h-full flex flex-col justify-center items-center text-center px-4">
        <h1 className="text-5xl sm:text-6xl font-extrabold mb-6 text-yellow-300 drop-shadow-lg">
          📚 Welcome to BookVerse
        </h1>
        <p className="text-lg sm:text-xl mb-10 text-gray-200 max-w-2xl">
          <span className="text-indigo-200">
            Discover stories, wisdom, and imagination—one book at a time.
          </span>
        </p>

        <div className="flex flex-col sm:flex-row gap-6">
          <button
            onClick={() => navigate('/login')}
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-3 rounded-full font-semibold shadow-lg transition"
          >
            🔐 Login
          </button>
          <button
            onClick={() => navigate('/register')}
            className="bg-teal-500 hover:bg-teal-600 text-white px-8 py-3 rounded-full font-semibold shadow-lg transition"
          >
            📝 Register
          </button>
        </div>

        {/* Footer Quote */}
        <div className="absolute bottom-6 text-sm sm:text-base text-indigo-200 italic px-4">
          “There is no friend as loyal as a book.” – Ernest Hemingway
        </div>
      </div>
    </div>
  );
}
