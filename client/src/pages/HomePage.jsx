import React from 'react';
import Navbar from "../components/Navbar";
import TextSlide from "../components/TextSlide";
import MapSlide from "../components/MapSlide"; // Cambia Slide a MapSlide
import Categories from "../components/Categories";
import Listings from "../components/Listings";
import Footer from "../components/Footer";

const HomePage = () => {
  return (
    <>
      <Navbar />
      <MapSlide />
      <Categories />
      <Listings />
      <Footer />
    </>
  );
};

export default HomePage;
