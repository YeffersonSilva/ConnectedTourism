import React from 'react';
import Navbar from "../components/Navbar";
import TextSlide from "../components/TextSlide";
import MapSlide from "../components/MapSlide"; // Cambia Slide a MapSlide
import Categories from "../components/Categories";
import Listings from "../components/Listings";
import Footer from "../components/Footer";
import WeatherApp from "../components/WeatherApp"; // Importa el componente WeatherApp

const HomePage = () => {
  return (
    <>
      <Navbar />
      <WeatherApp /> 
     
      <Categories />
      <Listings />
      <Footer />
    </>
  );
};

export default HomePage;
