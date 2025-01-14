import { createBrowserRouter } from "react-router-dom";
import Login from "../components/Login";
import UserLayout from "../layout/UserLayout";
import Register from "../components/Register";




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
                element: <h1>Dashboard</h1>
            },

        ],
    },

]);