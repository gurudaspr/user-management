import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { FaEye, FaEyeSlash } from "react-icons/fa";
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useEmployeeDB } from '../../hooks/useDB';
import { useAuth } from '../../context/authContext';

const Login = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const { login } = useAuth();

    const { loginEmployee, updateLastLogin } = useEmployeeDB();


    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(
            Yup.object().shape({
                email: Yup.string().email('Invalid email').required('Email is required'),
                password: Yup.string().required('Password is required'),
            })
        ),
        mode: 'onChange',
    });

    const onSubmit = async (data) => {
        setLoading(true);
        try {
            const res = await loginEmployee(data.email, data.password);
            console.log(res, 'res');
            if (res.success) {
                toast.success('Login successful!');
                await updateLastLogin(res.employee.id);
                navigate('/');
                login()
            }
        } catch (error) {
            toast.error(error.message || 'An error occurred');
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
                        <h1 className="text-3xl text-white font-semibold">Login</h1>
                    </div>

                    <div className="p-6">
                        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                            <div>
                                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                                <input
                                    {...register('email')}
                                    id="email"
                                    type="email"
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

                            <button
                                type="submit"
                                className="w-full h-12 bg-slate-900 text-white rounded-full hover:bg-slate-950 transition-colors flex items-center justify-center"
                            >
                                {loading ? (
                                    <div className="h-5 w-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                ) : (
                                    "Login"
                                )}
                            </button>

                            <div className="text-center">
                                <span className="text-sm text-gray-600">Don't have an account? </span>
                                <a href="/register" className="text-sm text-blue-500 hover:text-blue-700 transition-colors">
                                    Register
                                </a>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
