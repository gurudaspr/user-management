import { createBrowserRouter } from "react-router-dom";
import Login from "../components/auth/Login";
import UserLayout from "../layout/UserLayout";
import Register from "../components/auth/Register";
import { ProtectedRoute } from "./ProtectedRoute";
import Dashboard from "../components/Dashboard";




export const router = createBrowserRouter([
    {
        path: '/login',
        element: <Login />,
    },
    {
        path: '/register',
        element: <Register />,
    },

    {
        path: '/',
        element: <UserLayout />,
        children: [
            {
                index: true,
                element: <ProtectedRoute><Dashboard/></ProtectedRoute>
            },

        ],
    },

]);