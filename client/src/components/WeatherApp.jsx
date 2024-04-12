import React, { useState, useEffect } from 'react';
import '../styles/stylesMapaTiempo.scss';

const WeatherApp = () => {
  const [city, setCity] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [mapUrl, setMapUrl] = useState('');

  const fetchWeatherData = async (lat, lon) => {
    const apiKey = "2a35acb2228e90cfa2390f24e2633667"; // Asegúrate de que es correcta y está actualizada
    let apiWeatherURL = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}&lang=pt_br`;

    if (city) {
      apiWeatherURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}&lang=pt_br`;
    }

    try {
      setLoading(true);
      const response = await fetch(apiWeatherURL);
      if (!response.ok) {
        throw new Error('Erro ao obter os dados do clima');
      }
      const data = await response.json();
      setWeatherData(data);
      setMapUrl(`https://maps.google.com/maps?q=${data.coord.lat},${data.coord.lon}&hl=pt-br&z=14&output=embed`);
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

  const handleSearch = (e) => {
    e.preventDefault();
    fetchWeatherData(null, null);
  };

  return (
    <div id="weatherAppContainer" className="container">
      <div className="form">
        <h3>Confira Sitios en tu ciudad:</h3>
        <div className="form-input-container">
          <input
            type="text"
            placeholder="Digite o nome da cidade"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && fetchWeatherData(null, null)}
          />
          <button onClick={handleSearch}>
            <i className="fa-solid fa-magnifying-glass"></i>
          </button>
        </div>
      </div>
     
      {/* El mapa siempre está visible */}
      <div id="mapbox">
        <iframe className="iframe-border" width="350" height="250" frameBorder="1" scrolling="no" marginHeight="0" marginWidth="0" src={mapUrl}></iframe>
      </div>
    </div>
  );
};

export default WeatherApp;
