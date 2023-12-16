import React from 'react';
import { Link } from 'react-router-dom';
import '../App.css';

const NotAuthorized = () => {
    return (
        <div className="not-authorized-container">
            <h1>Access Denied</h1>
            <p>You do not have permission to view this page.</p>
            <Link to="/">Go Back Home</Link>
        </div>
    );
}

export default NotAuthorized;
