import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/authContext';

const Navbar = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login')
  };

  return (
    <nav className="bg-gray-900 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <a href="/" className="text-white text-2xl md:text-3xl font-bold" aria-label="Go to Home">
              Employee
            </a>
          </div>
          <button onClick={handleLogout} className="bg-white text-gray-900 py-2 px-4 rounded-lg font-semibold hover:bg-gray-200 transition">
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
