import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = ({ user, onLogout }) => {
    return (
        <nav className="navbar">
            <div className="container nav-container">
                <div className="logo">
                    <Link to="/">Triplens</Link>
                </div>
                <ul className="nav-links">
                    <li><a href="/#features">Features</a></li>
                    <li><a href="/#about">About</a></li>
                    <li><a href="/#contact">Contact</a></li>
                </ul>
                <div className="nav-actions">
                    {user ? (
                        <div className="user-info">
                            <span className="user-name">Welcome, {user.userName}</span>
                            <button onClick={onLogout} className="btn btn-outline">Logout</button>
                        </div>
                    ) : (
                        <>
                            <Link to="/login" className="btn btn-outline">Login</Link>
                            <Link to="/signup" className="btn btn-primary">Sign Up</Link>
                        </>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
