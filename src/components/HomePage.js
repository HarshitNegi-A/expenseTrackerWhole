import React from 'react'
import classes from "./HomePage.module.css"
import { Link } from 'react-router-dom'

const HomePage = () => {
  return ( <div className={classes.main}>
    <div>Welcome to Expense Tracker!!!</div>
    <div>Your Profile is Incomplete.<Link to="/profile">Complete now</Link></div>
    </div>
  )
}

export default HomePage