// src/components/Login.jsx
import React, { useState } from 'react'; // Removed useContext and client imports
import { useNavigate, Link } from 'react-router-dom'; // Add Link if not present
import { useAuth } from '../contexts/AuthContext.jsx'; // Use the custom hook

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null); // State for displaying errors
  const { login, loading } = useAuth(); // Get login function and loading state from useAuth hook
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    setError(null); // Clear previous errors
    try {
      // Call the login function from AuthContext directly with username and password
      await login(username, password);
      navigate('/'); // Redirect to home on successful dummy login
    } catch (err) {
      // Catch and display the error message from AuthContext
      setError(err.message || 'Login failed. Please check your credentials.');
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md w-full max-w-sm">
        <h2 className="text-2xl font-bold mb-4 text-center">Login</h2> {/* Changed to general Login or keep Admin Login as per your choice */}

        {/* Display error message if any */}
        {error && (
          <p className="text-red-500 text-sm mb-3 text-center">{error}</p>
        )}

        <div className="mb-3">
          <label htmlFor="username" className="block text-sm font-medium text-gray-700">Username:</label>
          <input
            type="text"
            id="username"
            placeholder="Username or Email"
            value={username}
            onChange={e => setUsername(e.target.value)}
            className="mt-1 p-2 w-full border rounded-md"
            required
            disabled={loading}
          />
        </div>
        <div className="mb-4">
          <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password:</label>
          <input
            type="password"
            id="password"
            placeholder="Password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            className="mt-1 p-2 w-full border rounded-md"
            required
            disabled={loading}
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 transition-colors"
          disabled={loading} // Disable button while loading
        >
          {loading ? 'Logging in...' : 'Login'}
        </button>

        <p className="mt-4 text-center text-sm text-gray-600">
          Don't have an account?{' '}
          <Link to="/register" className="text-blue-500 hover:underline">Register here</Link>
        </p>
      </form>
    </div>
  );
}