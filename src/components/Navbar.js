import React from "react";
import { Link } from "react-router-dom";
import '../App.css';

import { useAuth } from './AuthContext.js'; // Adjust the path according to your file structure
import { useNavigate } from 'react-router-dom';

const Navbar = () => {

    const { logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout(); // Reset the authentication state
        navigate('/'); // Navigate to the login page or home page after logout
    };

    return (
        <nav className="navbar">
            <ul className="nav-links">
                <li><Link to="/about">About</Link></li>
                <li><Link to="/contact">Contact</Link></li>
            </ul>

            <button onClick={handleLogout}>Logout</button>

        </nav>
    );
}

export default Navbar;
