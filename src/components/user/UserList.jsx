import React, { useState, useEffect } from 'react';
import UserCard from './UserCard';
import { useEmployeeDB } from '../../hooks/useDB';

const EmployeeList = () => {
  const [employees, setEmployees] = useState([])
  const { toggleBlock, getAllEmployees } = useEmployeeDB();

  useEffect(() => {
    const fetchEmployees = async () => {
      const fetchedEmployees = await getAllEmployees();
      setEmployees(fetchedEmployees);
    };
    fetchEmployees();
  }, []);

  const handleBlock = (id) => {
    toggleBlock(id).then(() => {
      setEmployees((prevEmployees) =>
        prevEmployees.map((emp) =>
          emp.id === id ? { ...emp, isBlocked: true } : emp
        )
      );
    });
  };

  const handleUnblock = (id) => {
    toggleBlock(id).then(() => {
      setEmployees((prevEmployees) =>
        prevEmployees.map((emp) =>
          emp.id === id ? { ...emp, isBlocked: false } : emp
        )
      );
    });
  };

  const handleEdit = (user) => {
    console.log('Edit user:', user);
  };

  const handleDelete = (user) => {
    console.log('Delete user:', user);
  };

  return (
    <div>
      {employees.map((user) => (
        <UserCard
          key={user.id}
          user={user}
          onEdit={() => handleEdit(user)}
          onDelete={() => handleDelete(user)}
          onBlock={handleBlock}
          onUnblock={handleUnblock} 
        />
      ))}
    </div>
  );
};

export default EmployeeList;
