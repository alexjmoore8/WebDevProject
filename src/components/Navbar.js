import React from "react";
import { Link } from "react-router-dom";
import '../App.css';

const Navbar = () => {
    return (
        <nav className="navbar">
            <ul className="nav-links">
                <li><Link to="/">Home</Link></li>
                <li><Link to="/about">About</Link></li>
                <li><Link to="/contact">Contact</Link></li>
                <li><Link to="/login">Login</Link></li>
                <li><Link to="/signup">Signup</Link></li>
                <li><Link to="/jobsearch">jobsearch</Link></li>
            </ul>
        </nav>
    );
}

export default Navbar;
