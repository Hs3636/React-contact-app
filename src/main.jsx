import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom'
import PublicRoute from './routes/PublicRoute';
import Protected from './routes/Protected';
import Home from './components/Home';
import SignUp from './components/SignUp';
import SignIn from './components/SignIn';
import ContactDisplay from './components/ContactDisplay';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles.css';
import { Provider } from 'react-redux';
import { store } from './app/store';
import HomeIndex from './components/HomeIndex';
import ErrorPage from './components/ErrorPage';
import Layout from './routes/Layout';
import { Navigate } from 'react-router-dom';

const router = createBrowserRouter(createRoutesFromElements(
  <Route element={<Layout />}>
      <Route path="/" element={<Navigate to="/sign-up" replace />} />
      <Route element={<Protected />}>
        <Route path='/home' element={<Home />}>
          <Route path='all' element={<HomeIndex />}/>
          <Route path='favorites' element={<HomeIndex fav={true}/>}/>
          <Route path=':id' element={<ContactDisplay />}/>
        </Route>
      </Route>
      <Route element={<PublicRoute />}>
        <Route path="sign-in" element={<SignIn />} />
        <Route path="sign-up" element={<SignUp />} />
      </Route>
      <Route path="*" element={<ErrorPage />} />
  </Route>
))

createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>,
)
