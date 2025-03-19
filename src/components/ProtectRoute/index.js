import React from 'react'
import Cookie from 'js-cookie'
import { Navigate, Outlet } from 'react-router-dom'

const ProtectedRoute = () => {
    const token = Cookie.get('jwtToken')
    return token ? <Outlet /> : <Navigate to='/login' />
}

export default ProtectedRoute