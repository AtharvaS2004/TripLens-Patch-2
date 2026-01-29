import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './CreateTrip.css';

const CreateTrip = ({ user }) => {
    const navigate = useNavigate();

    React.useEffect(() => {
        if (!user) {
            navigate('/login', { state: { message: "Please sign up or login to create a trip" } });
        }
    }, [user, navigate]);

    const [formData, setFormData] = useState({
        startLocation: '',
        destination: '',
        startDate: '',
        endDate: '',
        travelers: 1
    });
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            console.log('User:', user);
            // Handle case where user might be a string (legacy) or object
            const userId = user?.objectId || user?.id;

            if (!userId) {
                // If user exists but no ID (e.g. legacy string), force logout
                if (user) {
                    alert("Session expired or invalid. Please login again.");
                    localStorage.removeItem('user');
                    navigate('/login');
                    return;
                }
                throw new Error("User ID not found. Please login again.");
            }

            const response = await fetch(`http://localhost:8080/trips/addTrip?userId=${userId}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                alert('Trip created successfully!');
                navigate('/');
            } else {
                throw new Error('Failed to create trip');
            }
        } catch (error) {
            console.error('Error creating trip:', error);
            alert(`Error: ${error.message}`);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="create-trip-container">
            <div className="create-trip-card">
                <h2>Plan Your Next Adventure</h2>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="startLocation">Starting Location</label>
                        <input
                            type="text"
                            id="startLocation"
                            name="startLocation"
                            value={formData.startLocation}
                            onChange={handleChange}
                            placeholder="e.g., New York, London"
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="destination">Destination</label>
                        <input
                            type="text"
                            id="destination"
                            name="destination"
                            value={formData.destination}
                            onChange={handleChange}
                            placeholder="e.g., Paris, Tokyo"
                            required
                        />
                    </div>

                    <div className="form-row">
                        <div className="form-group">
                            <label htmlFor="startDate">Start Date</label>
                            <input
                                type="date"
                                id="startDate"
                                name="startDate"
                                value={formData.startDate}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="endDate">End Date</label>
                            <input
                                type="date"
                                id="endDate"
                                name="endDate"
                                value={formData.endDate}
                                onChange={handleChange}
                                required
                            />
                        </div>
                    </div>

                    <div className="form-group">
                        <label htmlFor="travelers">Travelers</label>
                        <input
                            type="number"
                            id="travelers"
                            name="travelers"
                            value={formData.travelers}
                            onChange={handleChange}
                            min="1"
                            required
                        />
                    </div>

                    <button type="submit" className="btn btn-primary btn-block" disabled={loading}>
                        {loading ? 'Creating Trip...' : 'Create Trip'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default CreateTrip;
