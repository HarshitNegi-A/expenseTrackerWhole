import React, { useState } from "react";
import classes from "./Profile.module.css";

const Profile = () => {

    const [name,setName]=useState("")
    const [photoURL,setPhotoURL]=useState("")


    const handleFormSubmit=(e)=>{
        e.preventDefault();

        fetch("https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyCCDvqMLJkVORZz3m2NDOjT91e2Qu0X2_c",{
            method:'POST',
            body:JSON.stringify({
                idToken:localStorage.getItem('token'),
                displayName:name,
                photoUrl:photoURL,
                returnSecureToken:true,
            }),
            headers:{
                'Content-Type' : 'application/json'
            }
        }).then(res=>{
            if(res.ok){
                return res.json();
              }
              else{
                return res.json().then(data=> {
                  let errorMessage='Authetication Failed'
                   throw new Error(errorMessage);
                });
              }
        }).then(data=>{
            console.log(data)
        }).catch(err=>{
            alert(err.message)
        })


    }
  return (
    <div>
      <div className={classes.main}>
        <p>Winners never quits,Quitters never win.</p>
      </div>
      <div className={classes.form}>
        <div className={classes.formHeader}>
            <h1>Contact Details</h1>
            <button>Cancel</button>
        </div>
        <form onSubmit={handleFormSubmit}>
            <label  htmlFor="name">Full Name:</label>
            <input onChange={(e)=>{setName(e.target.value)}} value={name} type="text" id="name"/>
            <label htmlFor="photoURL">Profile Photo URL</label>
            <input onChange={(e)=>{setPhotoURL(e.target.value)}} value={photoURL} type="text" id="photoURL"/><br/><br/><br/>
            <button type="submit">Update</button>
        </form>
      </div>
    </div>
  );
};

export default Profile;
