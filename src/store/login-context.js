import React from "react"

const LoginContext=React.createContext({
    isLogin: false,
    isLoggedIn: false,
    changeLogin:()=>{},
    login:()=>{},
    logout:()=>{},
})

export default LoginContext;