import React from 'react';

const UserCard = ({ user }) => {
  const status = user.isBlocked ? 'Blocked' : 'Active';
  const lastLogin = user.logins.length > 0 
    ? new Date(user.logins[user.logins.length - 1]).toLocaleString() 
    : 'N/A';

  return (
    <div className="bg-white border rounded-lg shadow-md p-6 w-full max-w-sm">
      <h2 className="text-xl font-bold text-gray-800">{user.name}</h2>
      <p className="text-gray-600 mt-2">
        <strong>Email:</strong> {user.email}
      </p>
      <p className={`text-sm font-medium mt-2 ${status === 'Active' ? 'text-green-600' : 'text-red-600'}`}>
        <strong>Status:</strong> {status}
      </p>
      <p className="text-gray-600 mt-2">
        <strong>Last Login:</strong> {lastLogin}
      </p>
      <p className="text-gray-600 mt-2">
        <strong>Department:</strong> {user.department}
      </p>
      <p className="text-gray-600 mt-2">
        <strong>Designation:</strong> {user.designation}
      </p>
      <p className="text-gray-600 mt-2">
        <strong>City:</strong> {user.city}
      </p>
    </div>
  );
};

export default UserCard;
