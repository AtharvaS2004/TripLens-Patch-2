import React, { useState, useEffect } from 'react';
import './UserProfile.css';

const UserProfile = ({ user }) => {
    const [trips, setTrips] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (user) {
            fetchTrips();
        } else {
            setLoading(false);
        }
    }, [user]);

    const fetchTrips = async () => {
        try {
            const userId = user.objectId || user.id || user.userId;
            const response = await fetch(`http://localhost:8080/trips/getTripsByUserId?userId=${userId}`, {
                method: 'POST'
            });

            if (response.ok) {
                const data = await response.json();
                setTrips(data);
            } else {
                setError("Failed to fetch trips.");
            }
        } catch (err) {
            setError("Network error fetching trips.");
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    if (!user) {
        return <div className="error">Please log in to view your profile.</div>;
    }

    return (
        <div className="profile-container">
            <header className="profile-header">
                <h2>{user.userName}'s Profile</h2>
                <p>Email: {user.email || 'N/A'}</p>
            </header>

            <section className="trips-section">
                <h3>My Created Trips</h3>
                {loading ? (
                    <div className="loading">Loading trips...</div>
                ) : error ? (
                    <div className="error">{error}</div>
                ) : (trips.created_trips && trips.created_trips.length > 0) ? (
                    <div className="trips-list">
                        {trips.created_trips.map((trip) => (
                            <div key={trip.id || trip.tripName} className="trip-card">
                                <div className="trip-info">
                                    <h4>{trip.title || trip.tripName}</h4>
                                    <p>
                                        From: {trip.startLocation || trip.origin} ➝ To: {trip.destination}
                                    </p>
                                    <p>
                                        Date: {trip.startDate} - {trip.endDate}
                                    </p>
                                </div>
                                <div className="trip-actions">
                                    <span className={`trip-status ${trip.status ? 'active' : 'completed'}`}>
                                        {trip.status ? 'Active' : 'Completed'}
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="no-trips">No created trips found. Start planning a new one!</div>
                )}

                <h3>Shared With Me</h3>
                {loading ? (
                    <div className="loading">Loading shared trips...</div>
                ) : (trips.shared_trips && trips.shared_trips.length > 0) ? (
                    <div className="trips-list">
                        {trips.shared_trips.map((trip) => (
                            <div key={trip.id || trip.tripName} className="trip-card">
                                <div className="trip-info">
                                    <h4>{trip.title || trip.tripName}</h4>
                                    <p>
                                        From: {trip.startLocation || trip.origin} ➝ To: {trip.destination}
                                    </p>
                                    <p>
                                        Date: {trip.startDate} - {trip.endDate}
                                    </p>
                                    <p className="owner-info">Owner ID: {trip.ownerUserId}</p>
                                </div>
                                <div className="trip-actions">
                                    <span className={`trip-status ${trip.status ? 'active' : 'completed'}`}>
                                        {trip.status ? 'Active' : 'Completed'}
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="no-trips">No shared trips found.</div>
                )}
            </section>
        </div >
    );
};

export default UserProfile;
