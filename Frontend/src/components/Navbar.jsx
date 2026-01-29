import React from 'react';

const Navbar = () => {
    return (
        <nav className="navbar">
            <div className="container nav-container">
                <div className="logo">
                    <a href="#">Triplens</a>
                </div>
                <ul className="nav-links">
                    <li><a href="#features">Features</a></li>
                    <li><a href="#about">About</a></li>
                    <li><a href="#contact">Contact</a></li>
                </ul>
                <div className="nav-actions">
                    <button className="btn btn-outline">Login</button>
                    <button className="btn btn-primary">Sign Up</button>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
