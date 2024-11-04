import React, { useState } from 'react'
import LoginContext from './login-context'

const LoginProvider = (props) => {

    const [login,setLogin]=useState(false)
    const initailToken=localStorage.getItem('token')
    const [token,setToken]=useState(initailToken)
    
    const handleLoginChange=()=>{
        setLogin((prevLogin)=> !prevLogin);
    }
    const userIsLoggedIn=!!token;

    const loginHandler=(token)=>{
        setToken(token)
        localStorage.setItem('token',token);
    }   


    const logincontext={
        isLogin:login,
        isLoggedIn:userIsLoggedIn,
        changeLogin:handleLoginChange,
        login:loginHandler,
    }

  return (
    <LoginContext.Provider value={logincontext}>
        {props.children}
    </LoginContext.Provider>
  )
}

export default LoginProvider;