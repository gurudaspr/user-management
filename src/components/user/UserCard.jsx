import React from 'react';
import { format } from 'date-fns';

const UserCard = ({ user, onEdit, onDelete, onBlock, onUnblock }) => {
  const status = user.isBlocked ? 'Blocked' : 'Active';
  const formattedLastLogin = user.lastLogin
    ? format(new Date(user.lastLogin), 'dd MMM yyyy hh:mm:ss a')
    : 'Never logged in';

  return (
    <div className="relative bg-white w-full md:min-w-96 border rounded-lg shadow-lg p-6 max-w-sm transition-transform transform hover:opacity-95">
      <div
        className={`absolute top-4 right-4 px-3 py-1 text-sm font-medium rounded-full ${status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
          }`}
      >
        {status}
      </div>
      <div className="flex items-center space-x-4">
        <h2 className="text-2xl font-bold text-gray-800">{user.name}</h2>
      </div>
      <div className="mt-4">
        <p className="text-gray-600">
          <span className="font-semibold">Email:</span> {user.email}
        </p>
        <p className="text-gray-600 mt-2">
          <span className="font-semibold">Last Login:</span> {formattedLastLogin}
        </p>
        <p className="text-gray-600 mt-2">
          <span className="font-semibold">Department:</span> {user.department}
        </p>
        <p className="text-gray-600 mt-2">
          <span className="font-semibold">Designation:</span> {user.designation}
        </p>
        <p className="text-gray-600 mt-2">
          <span className="font-semibold">City:</span> {user.city}
        </p>
      </div>

      <div className="mt-6 flex justify-between space-x-2">
        <button
          onClick={onEdit}
          className="px-4 py-2 rounded-lg bg-blue-500 text-white font-semibold hover:bg-blue-600 transition"
        >
          Edit
        </button>
        <button
          onClick={onDelete}
          className="px-4 py-2 rounded-lg bg-red-500 text-white font-semibold hover:bg-red-600 transition"
        >
          Delete
        </button>
        <div className="flex space-x-2">
          {user.isBlocked ? (
            <button
              onClick={() => onUnblock(user.id)}
              className="px-4 py-2 rounded-lg bg-green-500 text-white font-semibold hover:bg-green-600 transition"
            >
              Unblock
            </button>
          ) : (
            <button
              onClick={() => onBlock(user.id)}
              className="px-4 py-2 rounded-lg bg-yellow-500 text-white font-semibold hover:bg-yellow-600 transition"
            >
              Block
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserCard;
