import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { toast } from 'react-toastify';

const EditEmployeeForm = ({ isOpen, onClose, employeeData, onSubmitAction, onEmployeeAdded }) => {
    const departments = ['IT', 'HR', 'Finance', 'Marketing'];
    const designations = ['Developer', 'Manager', 'Tester', 'Analyst'];

    const validationSchema = Yup.object().shape({
        name: Yup.string().required('Name is required'),
        email: Yup.string().email('Invalid email').required('Email is required'),
        department: Yup.string().required('Department is required'),
        designation: Yup.string().required('Designation is required'),
        city: Yup.string().required('City is required'),
    });

    const { register, handleSubmit, formState: { errors }, reset } = useForm({
        resolver: yupResolver(validationSchema),
        mode: 'onChange',
        defaultValues: employeeData
    });

    useEffect(() => {
        if (employeeData && isOpen) {
            reset(employeeData);
        }
    }, [employeeData, isOpen, reset]);

    const onSubmit = async (data) => {
        try {
            const employeePayload = {
                name: data.name,
                email: data.email,
                department: data.department,
                designation: data.designation,
                city: data.city,
            };

            await onSubmitAction(employeeData.id, employeePayload);
            toast.success("Employee updated successfully!");
            onEmployeeAdded();
            onClose();
        } catch (error) {
            toast.error(error.message);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 bg-gray-500 bg-opacity-75 overflow-y-auto">
            <div className="min-h-screen px-4 text-center">
                <span className="inline-block h-screen align-middle" aria-hidden="true">&#8203;</span>
                
                <div className="inline-block w-full max-w-lg my-8 text-left align-middle bg-white rounded-xl shadow-lg transform transition-all">
                    <div className="max-h-[80vh] overflow-y-auto">
                        <div className="p-6">
                            <h2 className="text-2xl font-semibold mb-4">Edit Employee</h2>
                            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                                <div>
                                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                                    <input
                                        {...register('name')}
                                        id="name"
                                        placeholder="Name"
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                    {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>}
                                </div>

                                <div>
                                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                                    <input
                                        {...register('email')}
                                        id="email"
                                        placeholder="Email"
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        readOnly
                                    />
                                    {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
                                </div>

                                <div>
                                    <label htmlFor="department" className="block text-sm font-medium text-gray-700 mb-1">Department</label>
                                    <select
                                        {...register('department')}
                                        id="department"
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    >
                                        <option value="">Select Department</option>
                                        {departments.map((department, index) => (
                                            <option key={index} value={department}>{department}</option>
                                        ))}
                                    </select>
                                    {errors.department && <p className="text-red-500 text-xs mt-1">{errors.department.message}</p>}
                                </div>

                                <div>
                                    <label htmlFor="designation" className="block text-sm font-medium text-gray-700 mb-1">Designation</label>
                                    <select
                                        {...register('designation')}
                                        id="designation"
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    >
                                        <option value="">Select Designation</option>
                                        {designations.map((designation, index) => (
                                            <option key={index} value={designation}>{designation}</option>
                                        ))}
                                    </select>
                                    {errors.designation && <p className="text-red-500 text-xs mt-1">{errors.designation.message}</p>}
                                </div>

                                <div>
                                    <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-1">City</label>
                                    <input
                                        {...register('city')}
                                        id="city"
                                        placeholder="City"
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                    {errors.city && <p className="text-red-500 text-xs mt-1">{errors.city.message}</p>}
                                </div>

                                <div className="flex justify-between items-center pt-4">
                                    <button
                                        type="button"
                                        onClick={onClose}
                                        className="w-full md:w-32 mx-4 md:mx-auto h-12 bg-gray-400 text-white rounded-full hover:bg-gray-500 transition-colors"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        className="w-full md:w-32 mx-4 md:mx-auto h-12 bg-slate-900 text-white rounded-full hover:bg-slate-950 transition-colors"
                                    >
                                        Update
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EditEmployeeForm;