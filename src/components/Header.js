import { Link } from "react-router-dom";
import classes from "./Header.module.css"
import { useContext } from "react";
import LoginContext from "../store/login-context";

const Header=()=>{

    const loginContext=useContext(LoginContext);

    const handleLogout=()=>{
        loginContext.logout();
    }
    return(
        <header className={classes.header}>
            <div>
            <Link to="/" >Home</Link>
            <Link to="/">Products</Link>
            <Link to="/">About Us</Link>
            </div>
            <button onClick={handleLogout}>Log Out</button>
        </header>
    )
}

export default Header;