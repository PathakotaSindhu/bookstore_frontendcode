import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import api from '../services/api';
import { jwtDecode } from 'jwt-decode';
import { FaEnvelope, FaLock } from 'react-icons/fa'; // Importing FontAwesome icons

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            const response = await api.post('/auth/login', {
                email,
                password
            });

            const token = response.data; // If the backend returns only the token as a string

            // Make sure token is a valid string
            if (!token || typeof token !== 'string') {
                setError("Login failed. Please check your credentials.");
                return;
            }

            console.log("Login response:", token); // Log the token to confirm

            const decoded = jwtDecode(token);  // Decode the token

            const now = Date.now() / 1000;
            if (decoded.exp < now) {
                setError("Session expired. Please login again.");
                return;
            }

            localStorage.setItem("token", token);

            const userRole = decoded.role || decoded.roles || "";  // Adjust according to your token's structure

            if (userRole === "ROLE_ADMIN") {
                setSuccess("Login successful! Navigating to Admin Dashboard...");
                navigate("/admin/dashboard");
            } else {
                setSuccess("Login successful! Navigating to User Dashboard...");
                navigate("/user-dashboard");
            }

        } catch (error) {
            console.error("Login error:", error);

            if (error.response) {
                setError(error.response.data.message || "Login failed. Please check your credentials.");
            } else if (error.request) {
                setError("Server did not respond. Please try again later.");
            } else {
                setError("Something went wrong. Please try again.");
            }
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-400 via-teal-500 to-indigo-600">
            <div className="bg-white p-8 rounded-xl shadow-md w-full max-w-md">
                <h2 className="text-3xl font-bold mb-6 text-center text-indigo-600">Login</h2>

                {error && <p className="text-red-500 mb-4 text-sm text-center">{error}</p>}
                {success && <p className="text-green-500 mb-4 text-sm text-center">{success}</p>}

                <form onSubmit={handleLogin}>
                    {/* Email Input */}
                    <div className="mb-4 flex items-center border-b-2 border-gray-300 focus-within:border-indigo-500">
                        <FaEnvelope className="text-indigo-500 text-xl mr-3" />
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Email"
                            required
                            className="w-full px-4 py-2 bg-transparent focus:outline-none"
                        />
                    </div>

                    {/* Password Input */}
                    <div className="mb-6 flex items-center border-b-2 border-gray-300 focus-within:border-indigo-500">
                        <FaLock className="text-indigo-500 text-xl mr-3" />
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Password"
                            required
                            className="w-full px-4 py-2 bg-transparent focus:outline-none"
                        />
                    </div>

                    {/* Forgot Password Link */}
                    <div className="flex justify-between items-center mb-6">
                        <Link to="/forgotpassword" className="text-sm text-indigo-600 hover:underline">
                            Forgot Password?
                        </Link>
                    </div>

                    {/* Login Button */}
                    <button
                        type="submit"
                        className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 rounded-lg transition duration-300"
                    >
                        Login
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Login;

