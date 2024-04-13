import React, { useState, useEffect } from 'react';
import '../styles/WeatherProperty.scss'; // Asegúrate de que este es el archivo correcto
import Loader from "../components/Loader";
import { FaCloud, FaTint, FaWind } from 'react-icons/fa'; // Importa los íconos necesarios de React Icons

const WeatherProperty = ({ city }) => {
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchWeatherData = async () => {
      try {
        const apiKey = process.env.REACT_APP_OPENWEATHERMAP_API_KEY;
        const apiWeatherURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}&lang=pt_br`;
        const response = await fetch(apiWeatherURL);
        if (!response.ok) {
          throw new Error('Error al obtener los datos del clima');
        }
        const data = await response.json();
        setWeatherData(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching weather data:', error);
        setLoading(false);
      }
    };

    fetchWeatherData();
  }, [city]);

  if (loading) return <Loader />;

  return (
    <div className="weather-property-container">
      {/* Aquí puedes mostrar la información del clima */}
      <h2>
        {weatherData.name}
        <img src={`https://flagcdn.com/256x192/${weatherData.sys.country.toLowerCase()}.png`} alt="Bandeira do país" id="country" />
      </h2>
      <div className="weather-info">
      <p>
        Temperatura: {weatherData.main.temp}°C
        {/* Usamos los íconos para representar las condiciones climáticas */}
        <FaCloud className="weather-icon" /> {/* Icono de nube */}
        <FaTint className="weather-icon" /> {weatherData.main.humidity}% {/* Icono de humedad */}
        <FaWind className="weather-icon" /> {weatherData.wind.speed} km/h {/* Icono de viento */}
      </p></div>
<div className="details-container">
  <p id="humidity">
    <i className="fas fa-tint"></i> Humedad: <FaTint className="weather-icon" /> {weatherData.main.humidity}%
  </p>
  <p id="windy">
    <i className="fas fa-wind"></i> Viento: <FaWind className="weather-icon" /> {weatherData.wind.speed} km/h. <FaCloud className="weather-icon" /> {/* Icono de nube */}
  </p>
</div>

      {/* También puedes agregar el mapa aquí */}
      <iframe
        className="iframe-border"
        width="350"
        height="250"
        frameBorder="0"
        scrolling="no"
        marginHeight="0"
        marginWidth="0"
        src={`https://maps.google.com/maps?q=${weatherData.coord.lat},${weatherData.coord.lon}&hl=es&z=14&output=embed`}
      ></iframe>
    </div>
  );
};

export default WeatherProperty;
