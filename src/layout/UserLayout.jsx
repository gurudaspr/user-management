import React from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from '../components/Navbar'

const UserLayout = () => {
  return (
    <div>
        <Navbar/>
        <div className='bg-gray-300 min-h-screen '>
        <Outlet/>
        </div>
    </div>
  )
}

export default UserLayout