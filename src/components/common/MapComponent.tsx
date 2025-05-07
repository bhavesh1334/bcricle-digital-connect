import React from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';

interface MapComponentProps {
  center?: {
    lat: number;
    lng: number;
  };
  zoom?: number;
  height?: string;
}

const MapComponent: React.FC<MapComponentProps> = ({
  center = { lat: 21.2514, lng: 81.6296 }, // Raipur coordinates
  zoom = 15,
  height = '400px'
}) => {
  const mapContainerStyle = {
    width: '100%',
    height: height,
  };

  return (
    <LoadScript googleMapsApiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY}>
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        center={center}
        zoom={zoom}
      >
        <Marker position={center} />
      </GoogleMap>
    </LoadScript>
  );
};

export default MapComponent; 