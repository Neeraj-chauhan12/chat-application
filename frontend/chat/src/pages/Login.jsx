import axios from 'axios';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { BACKEND_URL } from '../utils/utils';
import toast from 'react-hot-toast';

const Login = () => {

    const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const navigate = useNavigate();

	const handleSubmit = async (e) => {
		e.preventDefault();

		const userData = {
			email,
			password
		};

		console.log("Submitting login data:", userData);
		try {
			const response = await axios.post(`${BACKEND_URL}/api/user/login`, userData, { withCredentials: true });
			console.log("Login response:", response.data);
            localStorage.setItem('data', JSON.stringify(response.data));
			toast.success("Login successful! Redirecting...");
			navigate('/');
		} catch (error) {
			console.error("Error during login:", error);
			toast.error("Login failed. Please try again.");
		}
	};

	return (
		<div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-400 via-pink-400 to-purple-500">
			<div className="w-full max-w-md p-8 rounded-xl shadow-lg bg-white/80 backdrop-blur-lg">
				<h2 className="text-3xl font-bold text-center text-blue-700 mb-6">Login</h2>
				<form onSubmit={handleSubmit} className="space-y-5">
					<input
						type="email"
						name="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
						placeholder="Email"
						className="w-full px-4 py-3 rounded-lg border border-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white"
						required
					/>
					<input
						type="password"
						name="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
						placeholder="Password"
						className="w-full px-4 py-3 rounded-lg border border-purple-300 focus:outline-none focus:ring-2 focus:ring-purple-400 bg-white"
						required
					/>
					<button
						type="submit"
						className="w-full py-3 rounded-lg bg-gradient-to-r from-blue-400 via-pink-400 to-purple-500 text-white font-bold text-lg shadow-md hover:scale-105 transition-transform"
					>
						Login
					</button>
				</form>
				<div className="mt-6 text-center">
					<span className="text-gray-700">Don't have an account?</span>
					<Link to="/signup" className="ml-2 text-blue-600 font-semibold hover:underline">Sign Up</Link>
				</div>
			</div>
		</div>
	);
};

export default Login;
