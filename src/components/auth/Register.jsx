import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { FaEye, FaEyeSlash } from "react-icons/fa";
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useEmployeeDB } from '../../hooks/useDB';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const Register = () => {
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [step, setStep] = useState(1);

    const navigate = useNavigate();


    const departments = ['IT', 'HR', 'Finance', 'Marketing'];
    const designations = ['Developer', 'Manager', 'Tester', 'Analyst'];

    const { register, handleSubmit, reset, formState: { errors }, trigger } = useForm({
        resolver: yupResolver(
            Yup.object().shape({
                name: Yup.string().required('Name is required'),
                email: Yup.string().email('Invalid email').required('Email is required'),
                password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
                confirmPassword: Yup.string()
                    .oneOf([Yup.ref('password'), null], 'Passwords must match'),
                department: Yup.string().required('Department is required'),
                designation: Yup.string().required('Designation is required'),
                city: Yup.string().required('City is required'),
            })
        ),
        mode: 'onChange',
    });

    const { addEmployee } = useEmployeeDB();

    const onSubmit = async (data) => {
        setLoading(true);
        try {
            const employeeData = {
                name: data.name,
                email: data.email,
                password: data.password,
                isBlocked: false,
                logins: 0,
                department: data.department,
                designation: data.designation,
                city: data.city,
            };

            await addEmployee(employeeData);
            toast.success("Employee Registered Successfully!, now you can login");
            reset();
            navigate('/login');
        } catch (error) {
            toast.error(error.message);
        }
        setLoading(false);
    };

    return (
        <div className="flex min-h-screen">
            <div className="hidden lg:block w-3/5 bg-cover bg-center" style={{
                backgroundImage: 'url("/user-management.jpg")'
            }}></div>

            <div className="w-full lg:w-2/5 flex items-center justify-center bg-gray-300 p-4 relative">
                <div className="w-full max-w-md bg-white rounded-xl shadow-lg">
                    <div className="bg-slate-900 mb-4 h-28 flex items-center justify-center rounded-t-xl">
                        <h1 className="text-3xl text-white font-semibold">Register</h1>
                    </div>

                    <div className="p-6">
                        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                            {step === 1 && (
                                <>
                                    <div>
                                        <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                                        <input
                                            {...register('name')}
                                            id="name"
                                            placeholder="Name"
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        />
                                        {errors.name && <p className="absolute text-red-500 text-xs ml-2">{errors.name.message}</p>}
                                    </div>

                                    <div>
                                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                                        <input
                                            {...register('email')}
                                            id="email"
                                            placeholder="Email"
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        />
                                        {errors.email && <p className="absolute text-red-500 text-xs ml-2">{errors.email.message}</p>}
                                    </div>

                                    <div className="relative">
                                        <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                                        <input
                                            {...register('password')}
                                            id="password"
                                            type={showPassword ? "text" : "password"}
                                            placeholder="Password"
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        />
                                        {errors.password && <p className="absolute text-red-500 text-xs ml-2">{errors.password.message}</p>}
                                        <button
                                            type="button"
                                            className="absolute right-3 top-9"
                                            onClick={() => setShowPassword(!showPassword)}
                                        >
                                            {showPassword ? <FaEyeSlash className="h-5 w-5 text-gray-600" /> : <FaEye className="h-5 w-5 text-gray-600" />}
                                        </button>
                                    </div>

                                    <div className="relative">
                                        <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">Confirm Password</label>
                                        <input
                                            {...register('confirmPassword')}
                                            id="confirmPassword"
                                            type={showConfirmPassword ? "text" : "password"}
                                            placeholder="Confirm Password"
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        />
                                        {errors.confirmPassword && <p className="absolute text-red-500 text-xs ml-2">{errors.confirmPassword.message}</p>}
                                        <button
                                            type="button"
                                            className="absolute right-3 top-9"
                                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                        >
                                            {showConfirmPassword ? <FaEyeSlash className="h-5 w-5 text-gray-600" /> : <FaEye className="h-5 w-5 text-gray-600" />}
                                        </button>
                                    </div>

                                    <div className="flex items-center mt-4">
                                        <button
                                            type="button"
                                            onClick={async () => {
                                                const isValid = await trigger(['name', 'email', 'password', 'confirmPassword']);
                                                if (isValid) {
                                                    setStep(2);
                                                }
                                            }}
                                            className="w-full md:w-32 mx-auto h-12 bg-slate-900 text-white rounded-3xl hover:bg-slate-950 transition-colors flex items-center justify-center"
                                        >
                                            Next
                                        </button>
                                    </div>
                                </>
                            )}

                            {step === 2 && (
                                <>
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
                                        {errors.department && <p className="absolute text-xs ml-2 text-red-500">{errors.department.message}</p>}
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
                                        {errors.designation && <p className="absolute text-xs ml-2 text-red-500">{errors.designation.message}</p>}
                                    </div>

                                    <div>
                                        <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-1">City</label>
                                        <input
                                            {...register('city')}
                                            id="city"
                                            placeholder="City"
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        />
                                        {errors.city && <p className="absolute text-xs ml-2 text-red-500">{errors.city.message}</p>}
                                    </div>

                                    <div className="flex justify-between items-center mt-4">
                                        <button
                                            type="button"
                                            onClick={() => setStep(1)}
                                            className="w-full md:w-32 mx-auto h-12 bg-gray-400 text-white rounded-full hover:bg-slate-950 transition-colors flex items-center justify-center"
                                        >
                                            Back
                                        </button>

                                        <button
                                            type="submit"
                                            className="w-full md:w-32 mx-4 md:mx-auto h-12 bg-slate-900 text-white rounded-full hover:bg-slate-950 transition-colors flex items-center justify-center"
                                        >
                                            {loading ? (
                                                <div className="h-5 w-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                            ) : (
                                                "Register"
                                            )}
                                        </button>
                                    </div>
                                </>
                            )}

                            <div className="text-center">
                                <span className="text-sm text-gray-600">Already have an account? </span>
                                <a href="/login" className="text-sm text-blue-500 hover:text-blue-700 transition-colors">
                                    Login
                                </a>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Register;
