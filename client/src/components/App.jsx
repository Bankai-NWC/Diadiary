import { GlobalStyles, useTheme } from '@mui/material';
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import '../css/App.css';

import { changeTheme } from '../store/slices/themeSlice';
import { setUser } from '../store/slices/userSlice';
import Layout from './Layout';
import AddEntry from './page/AddEntry/AddEntry';
import Dashboard from './page/Dashboard/Dashboard';
import Entries from './page/Entries/Entries';
import Entry from './page/Entry/Entry';
import Home from './page/Home/Home';
import Login from './page/Login/Login';
import NotFound from './page/NotFound/NotFound';
import Profile from './page/Profile/Profile';
import Register from './page/Register/Register';

function App() {
  const theme = useTheme();
  const dispatch = useDispatch();

  useEffect(() => {
    const storedUser = sessionStorage.getItem('user');
    if (storedUser) {
      const user = JSON.parse(storedUser);
      dispatch(setUser(user));
    }
  }, [dispatch]);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');

    const handleSystemThemeChange = e => {
      const storedTheme = localStorage.getItem('theme');
      if (!storedTheme) {
        const newTheme = e.matches ? 'dark' : 'light';
        dispatch(changeTheme(newTheme));
        localStorage.setItem('theme', newTheme);
      }
    };

    mediaQuery.addEventListener('change', handleSystemThemeChange);

    const storedTheme = localStorage.getItem('theme');
    if (storedTheme === 'light' || storedTheme === 'dark') {
      dispatch(changeTheme(storedTheme));
    } else {
      const initialTheme = mediaQuery.matches ? 'dark' : 'light';
      dispatch(changeTheme(initialTheme));
      localStorage.setItem('theme', initialTheme);
    }

    return () => {
      mediaQuery.removeEventListener('change', handleSystemThemeChange);
    };
  }, [dispatch]);

  useEffect(() => {
    document.body.setAttribute('data-theme', theme.palette.mode);
  }, [theme.palette.mode]);

  const router = createBrowserRouter([
    {
      path: '/',
      element: <Layout />,
      children: [
        {
          path: '*',
          element: <NotFound />,
        },
        {
          path: '/',
          element: <Home />,
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
          path: '/entries/:id',
          element: <Entry />,
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
