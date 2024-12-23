import React from 'react'
import classes from "./HomePage.module.css"
import { Link } from 'react-router-dom'
import Header from './Header'

const HomePage = () => {

  const handleButtonClick=()=>{
    fetch('https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyCCDvqMLJkVORZz3m2NDOjT91e2Qu0X2_c',{
      method:'POST',
      body:JSON.stringify({
        requestType:'VERIFY_EMAIL',
        idToken:localStorage.getItem('token'),
      }),
      headers:{
        'Content-Type': 'application/json'
      },
    }).then(res=>{
      if(res.ok){
        return res.json();
      }
      else{
        return res.json().then(data=> {
          let errorMessage='Something went wrong'
           throw new Error(errorMessage);
        });
      }
    }).then(data=>{
      console.log(data)
    }).catch((err)=>{
      alert(err.message)
    })
  }

  return ( <>
  <Header />
  <div className={classes.main}>
    <div>Welcome to Expense Tracker!!!</div>
    <div>Your Profile is Incomplete.<Link to="/profile">Complete now</Link></div>
    </div>
    <button onClick={handleButtonClick} className={classes.button}>Verify your Email ID</button>
    </>
  )
}

export default HomePage