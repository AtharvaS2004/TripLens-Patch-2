import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import MapView from './MapView';
import './CreateItinerary.css';

const CreateItinerary = ({ user }) => {
    const location = useLocation();
    const navigate = useNavigate();
    const { tripId, destination, startLocation, startDate, endDate } = location.state || {};

    const [loading, setLoading] = useState(true);
    const [festivals, setFestivals] = useState([]);
    const [images, setImages] = useState([]);
    const [transportMode, setTransportMode] = useState('train'); // 'train', 'flight', 'car'
    const [trains, setTrains] = useState([]);
    const [flights, setFlights] = useState([]);
    const [selectedTransport, setSelectedTransport] = useState(null);

    const [transportRouteCoordinates, setTransportRouteCoordinates] = useState([]);
    const [adventureRouteCoordinates, setAdventureRouteCoordinates] = useState([]);
    const [selectedSpots, setSelectedSpots] = useState([]);
    const [error, setError] = useState(null);
    const [adventureError, setAdventureError] = useState(null);

    const handleAddSpot = (spot) => {
        if (!selectedSpots.find(s => s.name === spot.name)) {
            setSelectedSpots([...selectedSpots, spot]);
        }
    };

    const handleMultiRoute = async () => {
        if (selectedSpots.length === 0) return;

        console.log("[CreateItinerary] Generating Multi-Stop Route...");
        const coords = selectedSpots.map(s => {
            // Parse lat/lon if they exist implies string, else try to use what we have
            return [parseFloat(s.lon || 0), parseFloat(s.lat || 0)];
        }).filter(c => c[0] !== 0 && c[1] !== 0);

        if (coords.length < 2) {
            setAdventureError("Please select at least 2 spots with valid coordinates.");
            return;
        }

        try {
            const res = await fetch('http://localhost:8080/api/route', { // Reverted to generic endpoint
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ coordinates: coords })
            });

            if (res.ok) {
                const data = await res.json();
                if (data.features && data.features.length > 0) {
                    const path = data.features[0].geometry.coordinates.map(c => [c[1], c[0]]);
                    setAdventureRouteCoordinates(path);
                    setAdventureError(null);
                }
            } else {
                setAdventureError("Failed to generate adventure route.");
            }
        } catch (err) {
            setAdventureError("Network error generating route.");
        }
    };

    useEffect(() => {
        if (!tripId) {
            navigate('/create-trip');
            return;
        }
        fetchData();
    }, [tripId, destination, startLocation]);

    const fetchData = async () => {
        setLoading(true);
        try {
            // Parallel fetching
            const [festivalsRes, imagesRes] = await Promise.allSettled([
                fetch(`http://localhost:8080/api/festivals?city=${destination}`),
                fetch(`http://localhost:8080/api/spots/nearby?location=${destination}`)
            ]);

            if (festivalsRes.status === 'fulfilled') {
                const data = await festivalsRes.value.json();
                setFestivals(data.slice(0, 5)); // Limit to 5
            }

            if (imagesRes.status === 'fulfilled') {
                const data = await imagesRes.value.json();
                setImages(data);
            }

            // Fetch initial transport data based on default mode (train)
            fetchTransport('train');

        } catch (error) {
            console.error("Error fetching data:", error);
        } finally {
            setLoading(false);
        }
    };

    const fetchTransport = async (mode) => {
        console.log(`[CreateItinerary] Fetching ${mode} for ${startLocation} -> ${destination}`);
        try {
            if (mode === 'train') {
                const url = `http://localhost:8080/api/trains/search?origin=${startLocation}&destination=${destination}`;
                const res = await fetch(url, { method: 'POST' });
                if (res.ok) {
                    const data = await res.json();
                    setTrains(data);
                }
            } else if (mode === 'flight') {
                const url = `http://localhost:8080/api/flights/search?from=${startLocation}&to=${destination}`;
                const res = await fetch(url);
                if (res.ok) {
                    const data = await res.json();
                    setFlights(data);
                }
            } else if (mode === 'car') {
                const url = `http://localhost:8080/api/route?from=${startLocation}&to=${destination}`;
                const res = await fetch(url);
                if (res.ok) {
                    const data = await res.json();
                    if (data.features && data.features.length > 0) {
                        const coords = data.features[0].geometry.coordinates.map(c => [c[1], c[0]]);
                        setTransportRouteCoordinates(coords);
                        setError(null);
                    } else {
                        setError("No route found between these locations.");
                    }
                } else {
                    setError("Failed to fetch route. Please check backend configuration (API Key).");
                }
            }
        } catch (error) {
            console.error(`Error fetching ${mode}s:`, error);
            if (mode === 'car') {
                setError(`Network Error: ${error.message}`);
            }
        }
    };

    const handleTransportChange = (mode) => {
        setTransportMode(mode);
        setSelectedTransport(null);
        fetchTransport(mode);
    };

    const handleSaveItinerary = async () => {
        alert("Itinerary Saved! (Functionality to be implemented)");
        navigate('/');
    };

    if (loading) return <div className="loading">Loading connection...</div>;

    return (
        <div className="itinerary-container">
            <header className="itinerary-header">
                <h1>Plan Your Trip to {destination}</h1>
                <p>{startLocation} ➝ {destination} ({startDate} to {endDate})</p>
            </header>

            {/* Region Images Section */}
            <section className="section-images">
                <h2>Explore the Region</h2>
                <div className="image-grid">
                    {images.length > 0 ? (
                        images.map((img, index) => (
                            <div key={index} className="image-card">
                                <img src={img.image_url || 'https://via.placeholder.com/300'} alt={img.name} />
                                <div className="card-content">
                                    <p>{img.name}</p>
                                    <button
                                        className="add-spot-btn"
                                        onClick={() => handleAddSpot(img)}
                                        style={{ marginTop: '5px', padding: '5px 10px', background: '#3498db', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
                                    >
                                        + ADD
                                    </button>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p>No images found.</p>
                    )}
                </div>

                {/* Adventure Map Section */}
                <div className="adventure-section" style={{ marginTop: '25px', padding: '20px', background: '#f8f9fa', borderRadius: '12px', border: '1px solid #e9ecef' }}>
                    <div className="adventure-controls">
                        <h3 style={{ marginBottom: '10px' }}>🗺️ Build Your Adventure Route</h3>
                        <p style={{ color: '#666', marginBottom: '15px' }}>Select spots from above to create your custom journey within {destination}!</p>

                        {selectedSpots.length > 0 && (
                            <div className="selected-spots-list" style={{ marginBottom: '20px' }}>
                                <p><strong>Your Stops:</strong></p>
                                <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexWrap: 'wrap', gap: '10px', marginTop: '10px' }}>
                                    {selectedSpots.map((s, i) => (
                                        <li key={i} style={{ background: 'white', padding: '5px 12px', borderRadius: '20px', border: '1px solid #ddd', fontSize: '14px' }}>
                                            📍 {s.name}
                                        </li>
                                    ))}
                                </ul>
                                <button
                                    onClick={handleMultiRoute}
                                    className="generate-route-btn"
                                    style={{ marginTop: '15px', padding: '10px 24px', background: '#27ae60', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold' }}
                                >
                                    Generate Adventure Route 🚀
                                </button>
                            </div>
                        )}

                        {adventureError && <p style={{ color: '#e74c3c', marginTop: '10px' }}>⚠️ {adventureError}</p>}

                        {adventureRouteCoordinates.length > 0 && (
                            <div style={{ marginTop: '20px', height: '400px', borderRadius: '8px', overflow: 'hidden', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }}>
                                <MapView
                                    routeCoordinates={adventureRouteCoordinates}
                                    markers={selectedSpots.map(s => ({
                                        lat: parseFloat(s.lat || 0),
                                        lon: parseFloat(s.lon || 0),
                                        name: s.name
                                    }))}
                                />
                            </div>
                        )}
                    </div>
                </div>
            </section>

            {/* Festivals Section */}
            <section className="section-festivals">
                <h2>Upcoming Festivals</h2>
                <div className="festival-list">
                    {festivals.length > 0 ? (
                        festivals.map((festival, index) => (
                            <div key={index} className="festival-card">
                                <h3>{festival.name}</h3>
                                <p>{festival.description ? festival.description.substring(0, 100) + '...' : ''}</p>
                                <span className="tag">{festival.month}</span>
                            </div>
                        ))
                    ) : (
                        <p>No specific festivals found for this region.</p>
                    )}
                </div>
            </section>

            {/* Transport Selection Section */}
            <section className="section-transport">
                <h2>Choose Your Travel Mode</h2>
                <div className="transport-tabs">
                    <button
                        className={transportMode === 'train' ? 'active' : ''}
                        onClick={() => handleTransportChange('train')}
                    >
                        🚆 Train
                    </button>
                    <button
                        className={transportMode === 'flight' ? 'active' : ''}
                        onClick={() => handleTransportChange('flight')}
                    >
                        ✈️ Flight
                    </button>
                    <button
                        className={transportMode === 'car' ? 'active' : ''}
                        onClick={() => handleTransportChange('car')}
                    >
                        🚗 Car
                    </button>
                </div>

                <div className="transport-content">
                    {transportMode === 'train' && (
                        <div className="train-list">
                            {trains.length > 0 ? (
                                trains.map((train, idx) => (
                                    <div
                                        key={idx}
                                        className={`transport-option ${selectedTransport === train ? 'selected' : ''}`}
                                        onClick={() => setSelectedTransport(train)}
                                    >
                                        <h4>{train.trainName} ({train.trainNumber})</h4>
                                        <p>Departs: {train.departureTime} | Arrives: {train.arrivalTime}</p>
                                        <p>Duration: {train.duration}</p>
                                    </div>
                                ))
                            ) : (
                                <p>No trains found between these cities.</p>
                            )}
                        </div>
                    )}

                    {transportMode === 'flight' && (
                        <div className="flight-list">
                            {flights.length > 0 ? (
                                flights.map((flight, idx) => (
                                    <div
                                        key={idx}
                                        className={`transport-option ${selectedTransport === flight ? 'selected' : ''}`}
                                        onClick={() => setSelectedTransport(flight)}
                                    >
                                        <h4>{flight.airline?.name || 'Airline'} - {flight.number || 'Flight'}</h4>
                                        <p>Price: ₹{flight.price || '5000'}</p>
                                        <p>{flight.movement?.scheduledTime?.local?.split(' ')[1] || 'Departure'} ➝ {flight.arrivalTime || 'Arrival'}</p>
                                    </div>
                                ))
                            ) : (
                                <p>No flights found for this date.</p>
                            )}
                        </div>
                    )}

                    {transportMode === 'car' && (
                        <div className="car-option">
                            <p><strong>Road Trip:</strong> {startLocation} ➝ {destination}</p>
                            {transportRouteCoordinates.length > 0 ? (
                                <div style={{ height: '500px', width: '100%', borderRadius: '12px', overflow: 'hidden', marginTop: '10px' }}>
                                    <MapView routeCoordinates={transportRouteCoordinates} />
                                </div>
                            ) : (
                                <p>{error ? <span style={{ color: 'red' }}>{error}</span> : "Loading route..."}</p>
                            )}
                        </div>
                    )}
                </div>
            </section>

            <button className="save-btn" onClick={handleSaveItinerary}>
                Save Itinerary
            </button>
        </div>
    );
};

export default CreateItinerary;
