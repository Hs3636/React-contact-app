import React from 'react'
import { Outlet, Navigate } from 'react-router-dom';
import Cookies from 'js-cookie';

const PublicRoute = () => {
    const user = Cookies.get('auth');
    return user ? <Navigate to='/home'/> : <Outlet />
}

export default PublicRoute