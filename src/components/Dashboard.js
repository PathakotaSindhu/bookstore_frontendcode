import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function AdminDashboard() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/');
  };

  return (
    <div
      className="h-screen w-screen bg-cover bg-center flex items-center justify-center relative"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1516979187457-637abb4f9356?auto=format&fit=crop&w=1950&q=80')",
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-60 z-0" />

      {/* Content */}
      <div className="relative z-10 text-center text-white px-4 max-w-5xl w-full">
        <h1 className="text-4xl sm:text-5xl font-extrabold mb-4 drop-shadow-lg">
          📘 Admin Dashboard
        </h1>
        <p className="text-xl italic text-gray-200 mb-10">
          “Books are a uniquely portable magic.”<br />
          <span className="text-sm">– Stephen King</span>
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-10">
          <DashboardButton
            label="Add Book"
            icon="➕"
            onClick={() => navigate('/addbook')}
          />
          <DashboardButton
            label="View Books"
            icon="📚"
            onClick={() => navigate('/viewbook')}
          />
          <DashboardButton
            label="View Users"
            icon="👥"
            onClick={() => navigate('/viewcustomer')}
          />
        </div>

        <button
          onClick={handleLogout}
          className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-full font-semibold shadow-lg transition duration-300"
        >
          🚪 Logout
        </button>
      </div>
    </div>
  );
}

function DashboardButton({ label, icon, onClick }) {
  return (
    <button
      onClick={onClick}
      className="w-full py-4 px-6 bg-white bg-opacity-20 hover:bg-opacity-30 text-white rounded-xl font-medium text-lg shadow-md backdrop-blur-md transition-all duration-300 flex items-center justify-center"
    >
      <span className="text-2xl mr-2">{icon}</span>
      {label}
    </button>
  );
}

