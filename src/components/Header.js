import { Link } from "react-router-dom";
import classes from "./Header.module.css"

const Header=()=>{
    return(
        <header className={classes.header}>
            <Link to="/" >Home</Link>
            <a href="/">Products</a>
            <a href="/">About Us</a>
        </header>
    )
}

export default Header;