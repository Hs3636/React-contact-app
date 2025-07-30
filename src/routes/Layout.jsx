import { ToastContainer } from 'react-toastify'
import { Outlet } from 'react-router-dom'

const Layout = () => {
  return (
    <>
        <Outlet />
        <ToastContainer position='bottom-right' theme="colored" autoClose={2000} pauseOnFocusLoss={false}/>
    </>
  )
}

export default Layout