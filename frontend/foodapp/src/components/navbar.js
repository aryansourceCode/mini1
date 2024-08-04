// src/components/NavBar.js

import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css'; // Importing CSS for styling

const NavBar = () => {
    return (
        <nav className="navbar">
            <div className="navbar-brand">
                <Link to="/meal">Meal Planner</Link>
            </div>
            <div className="navbar-links">
                <Link to='/'>Home</Link>
                <Link to="/login">Login</Link>
                <Link to="/signup">Sign Up</Link>
                <Link to="/profile">Profile</Link>
            </div>
        </nav>
    );
};

export default NavBar;
