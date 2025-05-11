import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';

export default function AddBook() {
  const [book, setBook] = useState({
    title: '',
    author: '',
    price: '',
    description: ''
  });

  const [preview, setPreview] = useState('');
  const [imageBase64, setImageBase64] = useState('');
  const [message, setMessage] = useState('');
  const nav = useNavigate();

  const handleChange = e =>
    setBook(prev => ({ ...prev, [e.target.name]: e.target.value }));

  const handleFile = e => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreview(reader.result);
      setImageBase64(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = async e => {
    e.preventDefault();
    const bookWithImage = { ...book, imageBase64 };
    try {
      await api.post('/books/add', bookWithImage);
      setMessage('✅ Book added successfully!');
      setBook({ title: '', author: '', price: '', description: '' });
      setPreview('');
      setImageBase64('');
      setTimeout(() => nav('/viewbook'), 800);
    } catch (err) {
      setMessage('❌ Failed to add book.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-6">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-xl rounded-xl p-8 w-full max-w-md space-y-6"
      >
        <h2 className="text-2xl font-bold text-center">➕ Add New Book</h2>
        {message && (
          <p className="text-green-600 text-center font-medium">{message}</p>
        )}

        {['title', 'author', 'price'].map(field => (
          <div key={field}>
            <label className="block mb-1 font-medium capitalize">
              {field}
            </label>
            <input
              name={field}
              type={field === 'price' ? 'number' : 'text'}
              required
              value={book[field]}
              onChange={handleChange}
              className="w-full p-2 border rounded"
            />
          </div>
        ))}

        <div>
          <label className="block mb-1 font-medium">Description</label>
          <textarea
            name="description"
            rows="3"
            value={book.description}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">Cover Image</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleFile}
            className="w-full"
          />
        </div>

        {preview && (
          <img
            src={preview}
            alt="preview"
            className="w-32 h-32 object-cover rounded mx-auto"
          />
        )}

        <button
          type="submit"
          className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-2 rounded-md"
        >
          Add Book
        </button>
      </form>
    </div>
  );
}
