import classes from "./Header.module.css"

const Header=()=>{
    return(
        <header className={classes.header}>
            <a href="/">Home</a>
            <a href="/">Products</a>
            <a href="/">About Us</a>
        </header>
    )
}

export default Header;