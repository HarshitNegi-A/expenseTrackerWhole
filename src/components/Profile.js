import React, { useEffect, useState } from "react";
import classes from "./Profile.module.css";

const Profile = () => {

    let [name,setName]=useState("")
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
            return res.json();
        }).then(data=>{
            console.log(data)
        }).catch(err=>{
            alert(err.message)
        })


    }

    useEffect(()=>{
        fetch('https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=AIzaSyCCDvqMLJkVORZz3m2NDOjT91e2Qu0X2_c',{
            method:'POST',
            body:JSON.stringify({
                idToken:localStorage.getItem('token'),
            }),
            headers:{
                'Content-Type' : 'application/json'
            }
        }).then(res=>{
            if(res.ok){
                return res.json()
            }
            else{
                throw new Error("Failed to fetch user data.");
            }
            
        }).then(data=>{
            console.log(data)
            setName(data.users[0].displayName)
            setPhotoURL(data.users[0].photoUrl)
        }).catch(err=>{
            console.log(err.message)
        })
    })

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
