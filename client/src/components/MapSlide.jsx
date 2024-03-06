import React, { useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import '../styles/MapSlide.scss';

const MapSlide = () => {
  const mapRef = useRef(null);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const { latitude, longitude } = position.coords;

        if (mapRef.current === null) {
          mapRef.current = L.map('map').setView([latitude, longitude], 13);
          L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          }).addTo(mapRef.current);
        } else {
          mapRef.current.setView(new L.LatLng(latitude, longitude), 13);
        }
      }, (error) => {
        console.error("Geolocation error: ", error);
      });
    } else {
      console.log("Geolocation no es soportada por el navegador.");
    }

    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
    };
  }, []);

  return (
    <div className="slide">
      <div className="text-container">
        <h1>Bienvenido a NaviExplore <br /> Aquí puede ver su ubicación actual</h1>
      </div>
      <div id="map" style={{ height: '60vh', width: '100%' }}></div>
    </div>
  );
};

export default MapSlide;
