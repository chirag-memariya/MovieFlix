// src/components/LogoutButton.jsx
import React from 'react';
import { useAuth } from '../contexts/AuthContext.jsx'; // Path adjusted: Up one level to 'src', then into 'contexts'

export default function LogoutButton() {
  const { logout, loading } = useAuth();

  const handleLogout = () => {
    // Optional: Add a confirmation dialog
    if (window.confirm('Are you sure you want to log out?')) {
      logout();
    }
  };

  return (
    <button
      onClick={handleLogout}
      className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition-colors"
      disabled={loading}
    >
      {loading ? 'Logging out...' : 'Logout'}
    </button>
  );
}