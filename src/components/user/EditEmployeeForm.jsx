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
        <div className="fixed inset-0 z-50 px-4 bg-gray-500 bg-opacity-75 flex justify-center items-center">
            <div className="bg-white rounded-xl shadow-lg w-full max-w-lg p-6">
                <h2 className="text-2xl font-semibold mb-4">Edit Employee</h2>
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
                            readOnly
                        />
                        {errors.email && <p className="absolute text-red-500 text-xs ml-2">{errors.email.message}</p>}
                    </div>

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
                            className="w-full md:w-32 mx-4 md:mx-auto  h-12 bg-gray-400 text-white rounded-full hover:bg-gray-500 transition-colors"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="w-full md:w-32 mx-4 md:mx-auto  h-12 bg-slate-900 text-white rounded-full hover:bg-slate-950 transition-colors"
                        >
                            Update
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default  EditEmployeeForm