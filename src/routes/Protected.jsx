import { Outlet, Navigate } from 'react-router-dom';
import Cookies from 'js-cookie';

const Protected = () => {
    const user = Cookies.get('auth');
    return user ? <Outlet /> : <Navigate to='/sign-up'/>
}

export default Protected