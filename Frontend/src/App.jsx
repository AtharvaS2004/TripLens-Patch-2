import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import LandingPage from './components/LandingPage';
import Login from './components/Login';
import Signup from './components/Signup';
import CreateTrip from './components/CreateTrip';
import RouteAnalysis from './components/RouteAnalysis';
import DashboardPage from './components/Dashboard/DashboardPage';
import { ItineraryPlanner } from './components/Itinerary/ItineraryPlanner';
import './App.css';

function App() {
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem('user');
    try {
      return savedUser ? JSON.parse(savedUser) : null;
    } catch (e) {
      // Fallback for old simple string data
      return savedUser;
    }
  });

  const handleLogin = (userData) => {
    setUser(userData);
    localStorage.setItem('user', JSON.stringify(userData));
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<LandingPage user={user} onLogout={handleLogout} />} />
          <Route path="/login" element={<Login onLogin={handleLogin} />} />
          <Route path="/signup" element={<Signup onLogin={handleLogin} />} />
          <Route path="/create-trip" element={<CreateTrip user={user} />} />
          <Route path="/route-analysis" element={<RouteAnalysis user={user} onLogout={handleLogout} />} />
          <Route path="/my-trips" element={<DashboardPage user={user} onLogout={handleLogout} />} />
          <Route path="/trip/:tripId" element={<ItineraryPlanner user={user} onLogout={handleLogout} />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
