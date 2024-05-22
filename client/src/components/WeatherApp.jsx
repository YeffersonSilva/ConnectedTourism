import React, { useState, useEffect } from 'react';
import '../styles/stylesMapaTiempo.scss';
import { useTheme } from '../contexts/ThemeContext';
import { motion } from 'framer-motion';

const WeatherApp = () => {
  const [search, setSearch] = useState(''); // Se usa para la entrada manual del usuario
  const [mapUrl, setMapUrl] = useState('');
  const { theme } = useTheme();

  const updateMap = (location) => {
    setMapUrl(`https://maps.google.com/maps?q=${encodeURIComponent(location)}&hl=es&z=14&output=embed`);
  };

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        position => {
          const { latitude, longitude } = position.coords;
          const location = `${latitude},${longitude}`;
          updateMap(location); // Actualiza el mapa directamente sin mostrar la ubicación en la caja de texto
        },
        () => {
          console.error('Error al acceder a la geolocalización del navegador.');
          // Opcional: establecer una ubicación por defecto o manejar el error de otra manera
        }
      );
    } else {
      console.error('Geolocalización no soportada por este navegador.');
      // Opcional: establecer una ubicación por defecto o manejar el error de otra manera
    }
  }, []);

  return (
    <div id="weatherAppContainer" className={`container ${theme}`}>
      <div className="form">
        <h3>Buscar Lugar:</h3>
        <div className="form-input-container">
          <input
            type="text"
            placeholder="Introduce ubicación"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && updateMap(search)}
          />
          <button onClick={() => updateMap(search)}>
            Buscar
          </button>
        </div>
      </div>
      <div id="mapbox">
        <motion.iframe
          className="iframe-border"
          width="350"
          height="250"
          frameBorder="0"
          scrolling="no"
          marginHeight="0"
          marginWidth="0"
          src={mapUrl}
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.4 }}
        ></motion.iframe>
      </div>
    </div>
  );
};

export default WeatherApp;
