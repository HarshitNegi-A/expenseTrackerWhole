import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Header from './components/Header';
import SignUp from './components/SignUp';
import HomePage from './components/HomePage';
// import LoginContext from './store/login-context';
import Profile from './components/Profile';
import ForgetPassword from './components/ForgetPassword';
import ExpenseForm from './components/Expenses/ExpenseForm';
import { useSelector } from 'react-redux';

function App() {
  // const loginContext = useContext(LoginContext);
  const isLoggedIn=useSelector(state=>state.auth.isLoggedIn)


  const router = createBrowserRouter([
    {
      path: '/',
      element: isLoggedIn ? <HomePage /> : <SignUp />, 
    },
    {
      path: '/profile',
      element:  <Profile /> , 
    },
    {
      path: '/resetPassword',
      element:  <ForgetPassword /> , 
    },
    {
      path: '/expense',
      element:  <ExpenseForm /> , 
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