import React, { useState, useEffect } from 'react';
import { format } from 'date-fns';
import { FaEdit, FaTrashAlt, FaLock, FaUnlock, FaPlus } from 'react-icons/fa';
import { useEmployeeDB } from '../../hooks/useDB';
import AddEmployeeForm from './AddEmployeeForm';
import EditEmployeeForm from './EditEmployeeForm';
import { Tooltip } from 'react-tippy';

const EmployeeList = () => {
    const [employees, setEmployees] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [employeeToEdit, setEmployeeToEdit] = useState(null);
    const { toggleBlock, getAllEmployees, deleteEmployee, addEmployee, updateEmployee } = useEmployeeDB();

    useEffect(() => {
        fetchEmployees();
    }, []);

    const fetchEmployees = async () => {
        try {
            setIsLoading(true);
            const fetchedEmployees = await getAllEmployees();
            setEmployees(fetchedEmployees);
            setError(null);
        } catch (err) {
            setError('Failed to fetch employees');
            console.error('Error fetching employees:', err);
        } finally {
            setIsLoading(false);
        }
    };

    const handleBlock = async (employee) => {
        try {
            await toggleBlock(employee);
            setEmployees((prevEmployees) =>
                prevEmployees.map((emp) =>
                    emp.id === employee.id ? { ...emp, isBlocked: !emp.isBlocked } : emp
                )
            );
        } catch (error) {
            console.error("Error toggling user block status:", error);
        }
    };

    const handleEdit = (employee) => {
        setEmployeeToEdit(employee);
        setIsModalOpen(true);
    };

    const handleDelete = async (employee) => {
        if (window.confirm(`Are you sure you want to delete ${employee.name}?`)) {
            try {
                await deleteEmployee(employee.id);
                setEmployees((prevEmployees) =>
                    prevEmployees.filter((emp) => emp.id !== employee.id)
                );
            } catch (error) {
                console.error("Error deleting employee:", error);
            }
        }
    };

    const handleAddEmployee = () => {
        setEmployeeToEdit(null);
        setIsModalOpen(true);
    };

    if (isLoading) {
        return <div className="flex justify-center items-center h-screen">Loading...</div>;
    }

    if (error) {
        return <div className="text-red-500 text-center">{error}</div>;
    }

    return (
        <div className="p-6 max-w-7xl mx-auto">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold">Dashboard</h1>
                <button
                    onClick={handleAddEmployee}
                    className="flex items-center text-base md:text-xl gap-2 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition"
                >
                    <FaPlus /> Add Employee
                </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {employees.map((employee) => {
                    const status = employee.isBlocked ? 'Blocked' : 'Active';
                    const formattedLastLogin = employee.lastLogin
                        ? format(new Date(employee.lastLogin), 'dd MMM yyyy hh:mm:ss a')
                        : 'Never logged in';

                    return (
                        <div
                            key={employee.id}
                            className="relative bg-white border rounded-lg shadow-lg p-6 transition-transform hover:shadow-xl"
                        >
                            <div
                                className={`absolute top-4 right-4 px-3 py-1 text-sm font-medium rounded-full
                  ${status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}
                            >
                                {status}
                            </div>

                            <div className="mb-4">
                                <h2 className="text-xl font-bold text-gray-800">{employee.name}</h2>
                                <p className="text-gray-600 text-sm">{employee.email}</p>
                            </div>

                            <div className="space-y-2">
                                <p className="text-gray-600">
                                    <span className="font-semibold">Department:</span> {employee.department}
                                </p>
                                <p className="text-gray-600">
                                    <span className="font-semibold">Designation:</span> {employee.designation}
                                </p>
                                <p className="text-gray-600">
                                    <span className="font-semibold">City:</span> {employee.city}
                                </p>
                                <p className="text-gray-600">
                                    <span className="font-semibold">Last Login:</span> {formattedLastLogin}
                                </p>
                            </div>

                            <div className="mt-6 flex justify-between space-x-2">
                                <Tooltip title="Edit" position="top" trigger="mouseenter">
                                    <button
                                        onClick={() => handleEdit(employee)}
                                        className="px-4 py-2 rounded-lg bg-blue-500 text-white font-semibold hover:bg-blue-600 transition"
                                    >
                                        <FaEdit />
                                    </button>
                                </Tooltip>
                                <Tooltip title="Delete" position="top" trigger="mouseenter">
                                    <button
                                        onClick={() => handleDelete(employee)}
                                        className="px-4 py-2 rounded-lg bg-red-500 text-white font-semibold hover:bg-red-600 transition"
                                    >
                                        <FaTrashAlt />
                                    </button>
                                </Tooltip>
                                <Tooltip
                                    title={employee.isBlocked ? "Unblock" : "Block"}
                                    position="top"
                                    trigger="mouseenter"
                                >
                                    <button
                                        onClick={() => handleBlock(employee)}
                                        className={`px-4 py-2 rounded-lg text-white font-semibold transition
                        ${employee.isBlocked
                                                ? 'bg-green-500 hover:bg-green-600'
                                                : 'bg-yellow-500 hover:bg-yellow-600'
                                            }`}
                                    >
                                        {employee.isBlocked ? <FaUnlock /> : <FaLock />}
                                    </button>
                                </Tooltip>
                            </div>
                        </div>
                    );
                })}
            </div>

            {isModalOpen && !employeeToEdit && (
                <AddEmployeeForm
                    isOpen={isModalOpen}
                    onClose={() => setIsModalOpen(false)}
                    onSubmitAction={addEmployee}
                    onEmployeeAdded={fetchEmployees}
                />
            )}

            {isModalOpen && employeeToEdit && (
                <EditEmployeeForm
                    isOpen={isModalOpen}
                    onClose={() => setIsModalOpen(false)}
                    employeeData={employeeToEdit}
                    onSubmitAction={updateEmployee}
                    onEmployeeAdded={fetchEmployees}
                />
            )}
        </div>
    );
};

export default EmployeeList;
