// src/App.js
import './App.css';
import React from 'react';
import './index.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Dashboard from './components/Dashboard';
import { UserProvider } from './context/UserContext';


import StatCard from './components/StatCard';

// Public Components
import Home from './components/Home';
import Login from './components/Login';
import Register from './components/Register';


import UserDashboard from './components/UserDashboard';


import Forgotpassword from './components/Forgotpassword';

import ResetPassword from './components/ResetPassword';



import AddBook from './components/AddBook';
import ViewCustomers from './components/ViewCustomers';
import ViewBooks from './components/ViewBooks'
import CartPage from './components/CartPage';
import BookDetails from './components/BookDetails';
import UserBooks from './components/UserBooks';
// import ToolTip from './components/ToolTip';

function App() {
  return (
    <UserProvider> {/* Wrap your Routes with UserProvider */}

    <Router>
      
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        
        
        {/* <Route path="/tooltip" element={<ToolTip />} /> */}
        <Route path="/register" element={<Register />} />
        
        <Route path="/user-dashboard" element={<UserDashboard />} />
      
        <Route path="/addbook" element={<AddBook />} />
        <Route path="/viewbook" element={<ViewBooks />} />
        <Route path="/viewcustomer" element={<ViewCustomers />} />
        <Route path="/viewcart" element={<CartPage />} />
         <Route path="/viewbookdetails/:title" element={<BookDetails />} />
        <Route path="/userbooks" element={<UserBooks />} />

        
        
       
        <Route path="/forgotpassword" element={<Forgotpassword />} /> 
        
        <Route path="/reset-password" element={<ResetPassword />} />

        {/* Admin Panel Routes */}
        //<Route path="/admin/dashboard" element={<Dashboard />} />
        
        
      </Routes>
    </Router>
    </UserProvider>
  );
}

export default App;
