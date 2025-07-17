// src/components/Navbar.jsx

import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext.jsx';
import LogoutButton from './LogoutButton.jsx';
import { Loader2 } from 'lucide-react';

export default function Navbar() {
  const { isAuthenticated, userName, loading, isAdmin } = useAuth();

  return (
    <nav className="bg-gray-800 p-4 text-white shadow-lg">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo/App Title */}
        <Link
          to="/"
          className="text-2xl font-bold hover:text-blue-300 transition-colors duration-200"
        >
          MovieApp
        </Link>

        {/* Navigation Links & Auth Status */}
        <div className="flex items-center space-x-4">
          {/* Home always visible */}
          <Link
            to="/"
            className="px-3 py-1 rounded-md text-gray-300 hover:bg-gray-700 hover:text-white transition-colors"
          >
            Home
          </Link>

          {/* Stats link only if authenticated */}
          {isAuthenticated && (
            <Link
              to="/stats"
              className="px-3 py-1 rounded-md text-gray-300 hover:bg-gray-700 hover:text-white transition-colors"
            >
              Stats
            </Link>
          )}

          {/* Auth status */}
          {loading ? (
            <div className="flex items-center text-gray-400">
              <Loader2 className="mr-2 h-5 w-5 animate-spin" />
              Loading...
            </div>
          ) : isAuthenticated ? (
            <>
              <span className="text-gray-300 text-md">
                Hello, {userName || 'User'}!
                {isAdmin && (
                  <span className="ml-2 text-yellow-400 text-sm">(Admin)</span>
                )}
              </span>
              <LogoutButton />
            </>
          ) : (
            <Link
              to="/login"
              className="px-3 py-1 rounded-md border border-blue-400 text-blue-300 hover:bg-blue-600 hover:text-white transition-colors"
            >
              Login
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}
