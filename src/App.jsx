import React from 'react'
import { RouterProvider } from 'react-router-dom'
import { router } from './routes/index'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import 'react-tippy/dist/tippy.css';

export default function App() {
  return (
    <>
    <RouterProvider router={router} />
    <ToastContainer  position='bottom-right' autoClose='2000'/>
    </>
  )
}

