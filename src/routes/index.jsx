import { createBrowserRouter } from "react-router-dom";
import Login from "../components/auth/Login";
import UserLayout from "../layout/UserLayout";
import Register from "../components/auth/Register";
import UserList from "../components/common/UserCard";




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
                element: <UserList />
            },

        ],
    },

]);