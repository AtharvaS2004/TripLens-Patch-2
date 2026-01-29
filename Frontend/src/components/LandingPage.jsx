import React from 'react';
import Navbar from './Navbar';
import Hero from './Hero';
import Features from './Features';
import Footer from './Footer';

const LandingPage = () => {
    return (
        <div className="landing-page">
            <Navbar />
            <Hero />
            <Features />
            <Footer />
        </div>
    );
};

export default LandingPage;
