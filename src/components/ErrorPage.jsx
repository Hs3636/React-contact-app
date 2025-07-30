import { Button } from '@mui/material'
import { NavLink } from 'react-router-dom'
import Cookies from 'js-cookie'

const ErrorPage = () => {
  return (
    <div className='error-page'>
      <h1>404</h1>
      <h3>Page not found</h3>
      {Cookies.get('auth') ? <NavLink to='/home/all'><Button>Home</Button></NavLink> : <NavLink to='/sign-up'><Button>Sign Up</Button></NavLink>}
    </div>
  )
}

export default ErrorPage