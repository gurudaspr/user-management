import React, { useState } from 'react'
import { FaEye, FaEyeSlash } from "react-icons/fa";




const Login = () => {
const [showPassword, setShowPassword] = useState(false);
const [loading, setLoading] = useState(false);
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
          <form  className="space-y-6">
            <div>
              <input
                type="email"
                placeholder="Email"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                type="button"
                className="absolute right-3 top-2.5"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <FaEyeSlash className="h-5 w-5 text-gray-600" />
                ) : (
                  <FaEye className="h-5 w-5 text-gray-600" />
                )}
              </button>
            </div>

            <button
              type="submit"
              className="w-full md:w-32 mx-auto h-12 bg-slate-900 text-white rounded-full hover:bg-slate-950 transition-colors flex items-center justify-center"
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
  )
}

export default Login