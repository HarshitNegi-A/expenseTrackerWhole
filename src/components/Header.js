import { Link } from "react-router-dom";
import classes from "./Header.module.css"

const Header=()=>{
    return(
        <header className={classes.header}>
            <Link to="/" >Home</Link>
            <Link to="/">Products</Link>
            <Link to="/">About Us</Link>
        </header>
    )
}

export default Header;