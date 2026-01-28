import React, { useState } from 'react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-white shadow-md fixed w-full z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <span className="text-2xl font-bold text-primary">Triplens</span>
          </div>
          <div className="hidden md:flex items-center space-x-8">
            <a href="#features" className="text-gray-600 hover:text-primary transition">Features</a>
            <a href="#about" className="text-gray-600 hover:text-primary transition">About</a>
            <a href="#contact" className="text-gray-600 hover:text-primary transition">Contact</a>
            <button className="bg-primary text-white px-4 py-2 rounded-md hover:bg-blue-700 transition">
              Get Started
            </button>
          </div>
          <div className="-mr-2 flex md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none"
            >
              <svg className="h-6 w-6" stroke="currentColor" fill="none" viewBox="0 0 24 24">
                <path className={!isOpen ? 'block' : 'hidden'} strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                <path className={isOpen ? 'block' : 'hidden'} strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
      </div>
      {/* Mobile Menu */}
      <div className={`${isOpen ? 'block' : 'hidden'} md:hidden bg-white`}>
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
          <a href="#features" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-primary hover:bg-gray-50">Features</a>
          <a href="#about" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-primary hover:bg-gray-50">About</a>
          <a href="#contact" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-primary hover:bg-gray-50">Contact</a>
          <button className="w-full text-left block px-3 py-2 rounded-md text-base font-medium bg-primary text-white hover:bg-blue-700">
            Get Started
          </button>
        </div>
      </div>
    </nav>
  );
};

const Hero = () => {
  return (
    <div className="hero-bg h-screen flex items-center justify-center text-center px-4">
      <div className="max-w-4xl mx-auto text-white">
        <h1 className="text-5xl md:text-6xl font-bold mb-6 animate-fade-in-up">
          Explore the World with Triplens
        </h1>
        <p className="text-xl md:text-2xl mb-8 text-gray-200">
          Your ultimate travel companion. Plan, capture, and share your journeys like never before.
        </p>
        <div className="flex flex-col md:flex-row justify-center gap-4">
          <button className="bg-secondary text-white px-8 py-3 rounded-full text-lg font-semibold hover:bg-orange-600 transition transform hover:scale-105 shadow-lg">
            Start Your Journey
          </button>
          <button className="bg-transparent border-2 border-white text-white px-8 py-3 rounded-full text-lg font-semibold hover:bg-white hover:text-primary transition transform hover:scale-105 shadow-lg">
            Learn More
          </button>
        </div>
      </div>
    </div>
  );
};

const Features = () => {
  const features = [
    {
      title: "Smart Itineraries",
      description: "AI-powered planning to make the most of your trip.",
      icon: "🗺️",
    },
    {
      title: "Photo Journal",
      description: "Organize your memories automatically by location.",
      icon: "📸",
    },
    {
      title: "Community Guides",
      description: "Discover hidden gems from fellow travelers.",
      icon: "👥",
    },
  ];

  return (
    <section id="features" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            Why Choose Triplens?
          </h2>
          <p className="mt-4 text-xl text-gray-600">
            Everything you need for an unforgettable adventure.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition duration-300 transform hover:-translate-y-1">
              <div className="text-4xl mb-4">{feature.icon}</div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const About = () => {
  return (
    <section id="about" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center">
        <div className="md:w-1/2 mb-10 md:mb-0 pr-0 md:pr-10">
          <img
            src="https://images.unsplash.com/photo-1503220317375-aaad61436b1b?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
            alt="Traveler"
            className="rounded-lg shadow-2xl"
          />
        </div>
        <div className="md:w-1/2">
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl mb-6">
            About Triplens
          </h2>
          <p className="text-lg text-gray-600 mb-6">
            We believe that travel is more than just visiting a place; it's about the connection, the experience, and the memories you create. Triplens is designed to handle the logistics so you can focus on the moment.
          </p>
          <p className="text-lg text-gray-600">
            Whether you are a solo backpacker or planning a family vacation, our tools adapt to your style.
          </p>
        </div>
      </div>
    </section>
  );
};

const Footer = () => {
  return (
    <footer className="bg-dark text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <span className="text-2xl font-bold text-white mb-4 block">Triplens</span>
            <p className="text-gray-400">
              Making travel simple, memorable, and fun.
            </p>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4">Product</h4>
            <ul className="space-y-2 text-gray-400">
              <li><a href="#" className="hover:text-white">Features</a></li>
              <li><a href="#" className="hover:text-white">Pricing</a></li>
              <li><a href="#" className="hover:text-white">Download</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4">Company</h4>
            <ul className="space-y-2 text-gray-400">
              <li><a href="#" className="hover:text-white">About Us</a></li>
              <li><a href="#" className="hover:text-white">Careers</a></li>
              <li><a href="#" className="hover:text-white">Contact</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4">Subscribe</h4>
            <div className="flex">
              <input type="email" placeholder="Enter your email" className="p-2 rounded-l-md text-gray-900 w-full focus:outline-none" />
              <button className="bg-primary px-4 py-2 rounded-r-md hover:bg-blue-700">Go</button>
            </div>
          </div>
        </div>
        <div className="border-t border-gray-700 mt-12 pt-8 text-center text-gray-400">
          &copy; {new Date().getFullYear()} Triplens. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <Hero />
      <Features />
      <About />
      <Footer />
    </div>
  );
}

export default App;
