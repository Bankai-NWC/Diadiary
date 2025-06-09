import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import { setUser } from '../store/slices/userSlice';
import Layout from './Layout';
import AddEntry from './page/AddEntry/AddEntry';
import Dashboard from './page/Dashboard/Dashboard';
import Entries from './page/Entries/Entries';
import Login from './page/Login/Login';
import Profile from './page/Profile/Profile';
import Register from './page/Register/Register';

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const storedUser = sessionStorage.getItem('user');
    if (storedUser) {
      const user = JSON.parse(storedUser);
      dispatch(setUser(user));
    }
  }, [dispatch]);

  const router = createBrowserRouter([
    {
      path: '/',
      element: <Layout />,
      children: [
        {
          path: '/',
          element: <h1>Welcome to the Home Page</h1>,
        },
        {
          path: '/login',
          element: <Login />,
        },
        {
          path: '/register',
          element: <Register />,
        },
        {
          path: '/profile',
          element: <Profile />,
        },
        {
          path: '/dashboard',
          element: <Dashboard />,
        },
        {
          path: '/entries',
          element: <Entries />,
        },
        {
          path: '/add-entry',
          element: <AddEntry />,
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
