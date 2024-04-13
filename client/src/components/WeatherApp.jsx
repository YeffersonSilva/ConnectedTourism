import React, { useState, useEffect } from 'react';
import '../styles/stylesMapaTiempo.scss'; // Asegúrate de que este es el archivo correcto
import { useTheme } from '../contexts/ThemeContext'; // Importa useTheme

const WeatherApp = () => {
  const [city, setCity] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [mapUrl, setMapUrl] = useState('');
  const { theme } = useTheme(); // Usa useTheme para obtener el tema actual

  const fetchWeatherData = async (lat, lon) => {
    const apiKey = process.env.REACT_APP_OPENWEATHERMAP_API_KEY; // Utiliza la variable de entorno para la API key
    let apiWeatherURL = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}&lang=pt_br`;

    if (city) {
      apiWeatherURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}&lang=pt_br`;
    }
    try {
      setLoading(true);
      const response = await fetch(apiWeatherURL);
      if (!response.ok) {
        throw new Error('Error al obtener los datos del clima');
      }
      const data = await response.json();
      setWeatherData(data);
      setMapUrl(`https://maps.google.com/maps?q=${data.coord.lat},${data.coord.lon}&hl=es&z=14&output=embed`);
      setError('');
    } catch (error) {
      setError(error.message);
      setWeatherData(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {
        fetchWeatherData(position.coords.latitude, position.coords.longitude);
      }, () => {
        setError('Geolocation is not supported by this browser.');
      });
    } else {
      setError('Geolocation is not supported by this browser.');
    }
  }, []);

  return (
    <div id="weatherAppContainer" className={`container ${theme}`}> {/* Agregar clase dinámica basada en el tema */}
      <div className="form">
        <h3>Ciudad:</h3>
        <div className="form-input-container">
          <input
            type="text"
            placeholder="Nombre de la ciudad"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && fetchWeatherData(null, null)}
          />
          <button onClick={() => fetchWeatherData(null, null)}>
            Buscar
          </button>
        </div>
      </div>
      <div id="mapbox">
        <iframe className="iframe-border" width="350" height="250" frameBorder="0" scrolling="no" marginHeight="0" marginWidth="0" src={mapUrl}></iframe>
      </div>
    </div>
  );
};

export default WeatherApp;
