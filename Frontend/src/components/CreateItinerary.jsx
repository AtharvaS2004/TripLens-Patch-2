import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
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
        if (mode === 'car') return; // No API for car yet

        console.log(`[CreateItinerary] Fetching ${mode} for ${startLocation} -> ${destination}`);
        try {
            if (mode === 'train') {
                const url = `http://localhost:8080/api/trains/search?origin=${startLocation}&destination=${destination}`;
                console.log(`[CreateItinerary] Calling Train API: ${url}`);
                const res = await fetch(url, { method: 'POST' }); // Wait, TrainController uses POST!
                // Checking TrainController.java step 238: @PostMapping("/search")
                // Frontend was using GET (fetch default). THIS IS THE BUG FOR TRAINS!

                console.log(`[CreateItinerary] Train API Status: ${res.status}`);
                if (res.ok) {
                    const data = await res.json();
                    console.log('[CreateItinerary] Train Data:', data);
                    setTrains(data);
                } else {
                    console.error('[CreateItinerary] Train API Failed');
                }
            } else if (mode === 'flight') {
                const url = `http://localhost:8080/api/flights/search?from=${startLocation}&to=${destination}`;
                console.log(`[CreateItinerary] Calling Flight API: ${url}`);
                const res = await fetch(url);
                console.log(`[CreateItinerary] Flight API Status: ${res.status}`);
                if (res.ok) {
                    const data = await res.json();
                    console.log('[CreateItinerary] Flight Data:', data);
                    setFlights(data);
                } else {
                    console.error('[CreateItinerary] Flight API Failed');
                }
            }
        } catch (error) {
            console.error(`Error fetching ${mode}s:`, error);
        }
    };

    const handleTransportChange = (mode) => {
        setTransportMode(mode);
        setSelectedTransport(null);
        if (mode !== 'car') {
            fetchTransport(mode);
        }
    };

    const handleSaveItinerary = async () => {
        // Placeholder for saving optimization logic
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
                                <p>{img.name}</p>
                            </div>
                        ))
                    ) : (
                        <p>No images found.</p>
                    )}
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
                            <p>Road trip! The distance is approximately [Calc Distance] km.</p>
                            <p>Suggested Route: [Google Maps Insert Placeholder]</p>
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
