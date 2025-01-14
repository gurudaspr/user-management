import React, { useState } from 'react';

const Navbar = () => {

  return (
    <nav className="bg-gray-900 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <span className="text-white text-2xl md:text-3xl font-bold">Employee</span>
          </div>
          <button className="bg-white text-gray-900 py-2 px-4 rounded-lg font-semibold hover:bg-gray-200 transition">
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
