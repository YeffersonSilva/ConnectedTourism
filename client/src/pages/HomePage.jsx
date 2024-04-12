// Import React and other necessary components
import React from 'react';
import Navbar from "../components/Navbar";
import TextSlide from "../components/TextSlide";
import MapSlide from "../components/MapSlide";
import Categories from "../components/Categories";
import Listings from "../components/Listings";
import Footer from "../components/Footer";
import WeatherApp from "../components/WeatherApp";
import { useTheme } from '../contexts/ThemeContext'; // Importa useTheme

const HomePage = () => {
  const { theme } = useTheme(); // Usar useTheme para obtener el tema actual

  return (
    <div className={`homepage ${theme}`}>  {/* Aplica la clase de tema al contenedor principal */}
      <Navbar />
      <WeatherApp /> 
      <Categories />
      <Listings />
      <Footer />
    </div>
  );
};

export default HomePage;
