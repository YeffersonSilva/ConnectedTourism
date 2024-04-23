import React, { useState, useEffect } from 'react';
import '../styles/stylesMapaTiempo.scss';
import { useTheme } from '../contexts/ThemeContext';

const MapComponent = ({ address }) => {
  const [mapUrl, setMapUrl] = useState('');
  const { theme } = useTheme();

  useEffect(() => {
    const updateMap = (location) => {
      setMapUrl(`https://maps.google.com/maps?q=${encodeURIComponent(location)}&hl=es&z=14&output=embed`);
    };

    updateMap(address);
  }, [address]);

  return (
    <div id="mapComponentContainer" className={`container ${theme}`}>
      <div id="mapbox">
        <iframe
          className="iframe-border"
          width="100%"  // Asegura que el iframe ocupe todo el ancho
          height="100%"  // Asegura que el iframe ocupe toda la altura disponible
          frameBorder="0"
          scrolling="no"
          marginHeight="0"
          marginWidth="0"
          src={mapUrl}
        ></iframe>
      </div>
    </div>
  );
};

export default MapComponent;
