import React, { useEffect, useState } from 'react';
import { useEmployeeDB } from '../../hooks/useDB';
import UserCard from './UserCard';

const UserList = () => {
    const { getAllEmployees } = useEmployeeDB();
    const [employees, setEmployees] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchEmployees = async () => {
            try {
                const employeeList = await getAllEmployees();
                setEmployees(employeeList);
                console.log('Employees fetched:', employeeList);
            } catch (error) {
                console.error('Error fetching employees:', error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchEmployees();
    }, []);

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="text-3xl font-bold text-gray-800 mb-6">Employee List</h1>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5">
                {employees.map((employee) => (
                    <UserCard key={employee.id} user={employee} />
                ))}
            </div>
        </div>
    );
};

export default UserList;
