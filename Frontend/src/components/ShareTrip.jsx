import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './ShareTrip.css';

const ShareTrip = ({ user }) => {
    const location = useLocation();
    const navigate = useNavigate();
    const { tripId } = location.state || {};

    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);

    if (!tripId) {
        return (
            <div className="share-trip-container">
                <div className="share-card error-card">
                    <h2>Error</h2>
                    <p>No Trip ID found. Please go back to your profile.</p>
                    <button onClick={() => navigate('/profile')}>Go to Profile</button>
                </div>
            </div>
        );
    }

    const handleShare = async (e) => {
        e.preventDefault();
        if (!email) return;

        setLoading(true);
        setMessage('');

        try {
            const res = await fetch(`http://localhost:8080/trips/addSharedUser?tripId=${tripId}&email=${email}`, {
                method: 'POST'
            });

            const result = await res.json(); // API returns boolean true/false

            if (res.ok && result === true) {
                setMessage({ type: 'success', text: `Trip shared successfully with ${email}!` });
                setEmail('');
            } else {
                setMessage({ type: 'error', text: 'User not found or already added.' });
            }
        } catch (error) {
            console.error("Share error:", error);
            setMessage({ type: 'error', text: 'Error connecting to server.' });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="share-trip-container">
            <div className="share-card">
                <h2>Share Your Adventure 🌍</h2>
                <p>Invite friends to collaborate or view your trip!</p>

                <form onSubmit={handleShare} className="share-form">
                    <input
                        type="email"
                        placeholder="Enter friend's email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    <button type="submit" disabled={loading} className="share-btn">
                        {loading ? 'Sharing...' : 'Share Trip'}
                    </button>
                </form>

                {message && (
                    <div className={`message ${message.type}`}>
                        {message.text}
                    </div>
                )}

                <div className="share-actions">
                    <button onClick={() => navigate('/profile')} className="secondary-btn">
                        Done / Go to Profile
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ShareTrip;
