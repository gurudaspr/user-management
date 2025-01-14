import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { FaEye, FaEyeSlash } from "react-icons/fa";
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { toast } from 'react-toastify';

const EmployeeFormModal = ({ isOpen, onClose, employeeData, onSubmitAction, onEmployeeAdded }) => {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const departments = ['IT', 'HR', 'Finance', 'Marketing'];
    const designations = ['Developer', 'Manager', 'Tester', 'Analyst'];

    const { register, handleSubmit, reset, formState: { errors } } = useForm({
        resolver: yupResolver(
            Yup.object().shape({
                name: Yup.string().required('Name is required'),
                email: Yup.string().email('Invalid email').required('Email is required'),
                password: Yup.string()
                    .min(6, 'Password must be at least 6 characters')
                    .when('employeeData', {
                        is: (value) => !value,
                        then: (schema) => schema.required('Password is required'),
                        otherwise: (schema) => schema.notRequired(),
                    }),
                confirmPassword: Yup.string()
                    .oneOf([Yup.ref('password'), null], 'Passwords must match')
                    .when('employeeData', {
                        is: (value) => !value,
                        then: (schema) => schema.required('Confirm password is required'),
                        otherwise: (schema) => schema.notRequired(),
                    }),
                department: Yup.string().required('Department is required'),
                designation: Yup.string().required('Designation is required'),
                city: Yup.string().required('City is required'),
            })
        ),
        mode: 'onChange',
    });

    useEffect(() => {
        if (isOpen) {
            if (employeeData) {
                reset(employeeData);
            } else {
                reset({
                    name: '',
                    email: '',
                    password: '',
                    confirmPassword: '',
                    department: '',
                    designation: '',
                    city: ''
                });
            }
        }
    }, [isOpen, employeeData, reset]);

    const onSubmit = async (data) => {
        try {
            const employeePayload = {
                name: data.name,
                email: data.email,
                password: data.password,
                department: data.department,
                designation: data.designation,
                city: data.city,
                isBlocked: false,
            };
    
            // Pass employeeData.id if editing an employee
            if (employeeData) {
                // Update employee
                await onSubmitAction(employeeData.id, employeePayload);
                toast.success("Employee updated successfully!");
            } else {
                // Add new employee
                await onSubmitAction(employeePayload);
                toast.success("Employee added successfully!");
            }
    
            onEmployeeAdded();  // Fetch updated employee list
            onClose();  // Close the modal
        } catch (error) {
            toast.error(error.message);  // Display error message
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 px-4 bg-gray-500 bg-opacity-75 flex justify-center items-center">
            <div className="bg-white rounded-xl shadow-lg w-full max-w-lg p-6">
                <h2 className="text-2xl font-semibold mb-4">{employeeData ? 'Edit Employee' : 'Add Employee'}</h2>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                    <div>
                        <input
                            {...register('name')}
                            placeholder="Name"
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        {errors.name && <p className="absolute text-red-500 text-xs ml-2">{errors.name.message}</p>}
                    </div>

                    <div>
                        <input
                            {...register('email')}
                            placeholder="Email"
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            readOnly={!!employeeData}  // Make email field readOnly if editing
                        />
                        {errors.email && <p className="absolute text-red-500 text-xs ml-2">{errors.email.message}</p>}
                    </div>

                    {!employeeData && (  // Only show password fields when adding a new employee
                        <>
                            <div className="relative">
                                <input
                                    {...register('password')}
                                    type={showPassword ? "text" : "password"}
                                    placeholder="Password"
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                                {errors.password && <p className="absolute text-red-500 text-xs ml-2">{errors.password.message}</p>}
                                <button
                                    type="button"
                                    className="absolute right-3 top-2.5"
                                    onClick={() => setShowPassword(!showPassword)}
                                >
                                    {showPassword ? <FaEyeSlash className="h-5 w-5 text-gray-600" /> : <FaEye className="h-5 w-5 text-gray-600" />}
                                </button>
                            </div>

                            <div className="relative">
                                <input
                                    {...register('confirmPassword')}
                                    type={showConfirmPassword ? "text" : "password"}
                                    placeholder="Confirm Password"
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                                {errors.confirmPassword && <p className="absolute text-red-500 text-xs ml-2">{errors.confirmPassword.message}</p>}
                                <button
                                    type="button"
                                    className="absolute right-3 top-2.5"
                                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                >
                                    {showConfirmPassword ? <FaEyeSlash className="h-5 w-5 text-gray-600" /> : <FaEye className="h-5 w-5 text-gray-600" />}
                                </button>
                            </div>
                        </>
                    )}

                    <div>
                        <select
                            {...register('department')}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            <option value="">Select Department</option>
                            {departments.map((department, index) => (
                                <option key={index} value={department}>{department}</option>
                            ))}
                        </select>
                        {errors.department && <p className="absolute text-red-500 text-xs ml-2">{errors.department.message}</p>}
                    </div>

                    <div>
                        <select
                            {...register('designation')}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            <option value="">Select Designation</option>
                            {designations.map((designation, index) => (
                                <option key={index} value={designation}>{designation}</option>
                            ))}
                        </select>
                        {errors.designation && <p className="absolute text-red-500 text-xs ml-2">{errors.designation.message}</p>}
                    </div>

                    <div>
                        <input
                            {...register('city')}
                            placeholder="City"
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        {errors.city && <p className="absolute text-red-500 text-xs ml-2">{errors.city.message}</p>}
                    </div>

                    <div className="flex justify-between items-center">
                        <button
                            type="button"
                            onClick={onClose}
                            className="w-full md:w-32 mx-auto h-12 bg-gray-400 text-white rounded-full hover:bg-gray-500 transition-colors"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="w-full md:w-32 mx-auto h-12 bg-slate-900 text-white rounded-full hover:bg-slate-950 transition-colors"
                        >
                            {employeeData ? 'Update' : 'Add'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EmployeeFormModal;
