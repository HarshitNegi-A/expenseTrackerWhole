import { useState } from "react";
import classes from "./SignUp.module.css"

const SignUp=()=>{

    const [email,setEmail]=useState("")
    const [password,setPassword]=useState("")
    const [confirmPassword,setConfirmPassword]=useState("")

    const handleFormSubmit=(e)=>{
        e.preventDefault();
        if(password===confirmPassword){
            fetch('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCCDvqMLJkVORZz3m2NDOjT91e2Qu0X2_c',{
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
                console.log("User has successfully signed up")
              })
              .catch((err)=>{
                alert(err.message)
              })
        }
        else{
            alert('Password does not match with confirm password')
        }

        

    }

    return ( <>
    <div className={classes.main}>
        <h1>Sign Up</h1>
        <form onSubmit={handleFormSubmit}>
            <label htmlFor="email">Email:</label>
            <input value={email} onChange={(e)=>{setEmail(e.target.value)}} type="text" required id="email"/><br/><br/>
            <label htmlFor="password">Password:</label>
            <input value={password} onChange={(e)=>{setPassword(e.target.value)}} type="password" required id="password"/><br/><br/>
            <label htmlFor="cpassword">Confirm Password:</label>
            <input value={confirmPassword} onChange={(e)=>{setConfirmPassword(e.target.value)}} type="password" required id="cpassword"/><br/><br/>
            <button type="submit">Sign Up</button>
        </form><br/><br/>
        
    </div>
    <button className={classes.button} type="click">Have an account?Login</button>
    </>
    )
}

export default SignUp;