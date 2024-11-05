import React, { useContext } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Header from './components/Header';
import SignUp from './components/SignUp';
import HomePage from './components/HomePage';
import LoginContext from './store/login-context';
import Profile from './components/Profile';

function App() {
  const loginContext = useContext(LoginContext);

  const router = createBrowserRouter([
    {
      path: '/',
      element: loginContext.isLoggedIn ? <HomePage /> : <SignUp />, 
    },
    {
      path: '/profile',
      element:  <Profile /> , 
    },
    // {
    //   path: '/signup',
    //   element: <SignUp />,
    // },
    // {
    //   path: '/home',
    //   element: <HomePage />,
    // },
  ]);

  return (
    <>
      <RouterProvider router={router} ><Header /></RouterProvider>
    </>
  );
}
export default App;