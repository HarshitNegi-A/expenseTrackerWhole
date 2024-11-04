import { useContext, useState } from "react";
import classes from "./SignUp.module.css"
import LoginContext from "../store/login-context";
import { useNavigate } from "react-router-dom";

const SignUp=()=>{

    const [email,setEmail]=useState("")
    const [password,setPassword]=useState("")
    const [confirmPassword,setConfirmPassword]=useState("")
    const navigate=useNavigate();

    const loginContext=useContext(LoginContext);

    const handleFormSubmit=(e)=>{
        e.preventDefault();
        let url;
        if(loginContext.isLogin || password===confirmPassword){
            if(loginContext.isLogin){
                url='https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCCDvqMLJkVORZz3m2NDOjT91e2Qu0X2_c';
            }
            else{
                url='https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCCDvqMLJkVORZz3m2NDOjT91e2Qu0X2_c';
            }
            fetch(url,{
                method:'POST',
                body:JSON.stringify({
                    email:email,
                    password:password,
                    returnSecureToken:true,
                }),
                headers:{
                    'Content-Type' : 'application/json'
                }
            }).then(res =>{
                
                if(res.ok){
                  return res.json();
                }
                else{
                  return res.json().then(data=> {
                    let errorMessage='Authetication Failed'
                     throw new Error(errorMessage);
                  });
                }
              }).then(data =>{
                loginContext.login(data.idToken)
                navigate('/')
                console.log(data)
              })
              .catch((err)=>{
                alert(err.message)
              })
        }
        else{
            alert('Password does not match with confirm password')
        }

        

    }

    const handleButtonClick=()=>{
        loginContext.changeLogin();
        console.log("clicked")
    }

    return ( <>
    <div className={classes.main}>
        <h1>{loginContext.isLogin ? 'Login' : 'Sign Up'}</h1>
        <form onSubmit={handleFormSubmit}>
            <label htmlFor="email">Email:</label>
            <input value={email} onChange={(e)=>{setEmail(e.target.value)}} type="text" required id="email"/><br/><br/>
            <label htmlFor="password">Password:</label>
            <input value={password} onChange={(e)=>{setPassword(e.target.value)}} type="password" required id="password"/><br/><br/>
            {!loginContext.isLogin && <><label htmlFor="cpassword">Confirm Password:</label>
            <input value={confirmPassword} onChange={(e)=>{setConfirmPassword(e.target.value)}} type="password" required id="cpassword"/><br/><br/></>}
            {loginContext.isLogin?<button type="submit">Login</button>:<button type="submit">Sign Up</button>}
            
        </form><br/><br/>
        {loginContext.isLogin && <button className={classes.forget}>Forget Password</button>}
        
        
    </div>
    
    <button onClick={handleButtonClick} className={classes.button} type="click">{loginContext.isLogin?'Dont have an account?Sign Up':'Have an account?Login'}</button>
    </>
    )
}

export default SignUp;