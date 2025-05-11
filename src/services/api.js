// src/api.js
import axios from 'axios';

const api = axios.create({
    baseURL: `https://bookstore-latest-t410.onrender.com/api`, // Your backend API base URL
    //baseURL: 'http://localhost:8080/api',
    headers: {
       'Content-Type': 'application/json',
    //    'Authorization': `Bearer ${localStorage.getItem('jwtToken')}`,
   },
   withCredentials: true  // ✅ important for cookies/session/cors
});

// Add interceptor to attach token
api.interceptors.request.use(config => {
    const token = localStorage.getItem('token')
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`
    }
    return config
  })

export default api;



