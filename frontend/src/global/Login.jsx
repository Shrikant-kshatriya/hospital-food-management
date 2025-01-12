import React, { useState } from 'react';
import { useUser } from '../context/UserContext';
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Login() {
  const [email, setEmail] = useState('hospital_manager@xyz.com');
  const [password, setPassword] = useState('Password@2025');
  const { login } = useUser();

  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const user = await axios.post('/auth/login', { email, password });
      login(user);
      toast.success('Login successful!');
      navigate('/dashboard');
    } catch (error) {
      toast.error('Failed to login. Please check your credentials.');
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-indigo-50">
      <ToastContainer />
      <div className="bg-white p-8 rounded shadow-lg">
        <h2 className="text-2xl font-bold mb-4">Login</h2>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="mb-4 p-2 w-full border rounded"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="mb-4 p-2 w-full border rounded"
        />
        <button onClick={handleLogin} className="bg-indigo-600 text-white px-4 py-2 rounded">
          Login
        </button>
      </div>
    </div>
  );
}

export default Login;
