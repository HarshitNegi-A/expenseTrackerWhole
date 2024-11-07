import { Link, useNavigate } from "react-router-dom";
import classes from "./Header.module.css"
import { useDispatch } from "react-redux";
import { authActions } from "../store/redux-store";

const Header=()=>{

    // const loginContext=useContext(LoginContext);
    const dispatch=useDispatch()
    const navi=useNavigate();
    

    const handleLogout=()=>{
        // loginContext.logout();
        dispatch(authActions.logout())
        localStorage.setItem('token',null)
        localStorage.setItem('userId',null)
        navi('/')
    }
   
    return(
        <header className={classes.header}>
            <div className={classes.links}>
            <Link to="/" >Home</Link>
            <Link to="/profile">Profile</Link>
            <Link to="/expense">Expenses</Link>
            <Link to="/">About Us</Link>
            </div>
            <button className={classes.button} onClick={handleLogout}>Log Out</button>
        </header>
    )
}

export default Header;