import React, { useEffect } from 'react';
import { MapContainer, TileLayer, Polyline, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

// Helper to update map view bounds based on route
const ChangeView = ({ coords }) => {
    const map = useMap();
    useEffect(() => {
        if (coords && coords.length > 0) {
            map.fitBounds(coords.map(c => [c[0], c[1]])); // Leaflet expects [lat, lng]
        }
    }, [coords, map]);
    return null;
};

const MapView = ({ routeCoordinates }) => {
    // Default center (Pune/Mumbai approximation or [0,0]) if no route yet
    const defaultCenter = [18.5204, 73.8567];

    return (
        <div className="map-view-container" style={{ height: '500px', width: '100%', borderRadius: '12px', overflow: 'hidden' }}>
            <MapContainer center={routeCoordinates.length > 0 ? routeCoordinates[0] : defaultCenter} zoom={8} scrollWheelZoom={true} style={{ height: '100%', width: '100%' }}>
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />

                {routeCoordinates.length > 0 && (
                    <>
                        <Polyline positions={routeCoordinates} color="blue" weight={5} />
                        <ChangeView coords={routeCoordinates} />
                    </>
                )}
            </MapContainer>
        </div>
    );
};

export default MapView;
