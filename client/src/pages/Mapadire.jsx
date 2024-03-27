import React, { useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Asegúrate de tener el CSS y el marcador en tus archivos
import '../styles/mapdire.scss';
import markerIcon from '../assets/marker-icon.png';

const Mapadire = () => {
  const mapRef = useRef(null);
  const markerRef = useRef(null);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const { latitude, longitude } = position.coords;

        if (mapRef.current === null) {
          mapRef.current = L.map('mapadire').setView([latitude, longitude], 13);
          L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          }).addTo(mapRef.current);
        } else {
          mapRef.current.setView(new L.LatLng(latitude, longitude), 13);
        }

        if (markerRef.current) {
          markerRef.current.setLatLng([latitude, longitude]);
        } else {
          const customMarkerIcon = L.icon({
            iconUrl: markerIcon,
            iconSize: [40, 41],
            iconAnchor: [12, 41]
          });
          markerRef.current = L.marker([latitude, longitude], { icon: customMarkerIcon }).addTo(mapRef.current);
        }

        // Agregar aquí cualquier funcionalidad adicional, como trazar rutas

      }, (error) => {
        console.error("Geolocation error: ", error);
      }, { enableHighAccuracy: true });
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
        <h1>. <br /> </h1>
      </div>
      <div id="mapadire" style={{ height: '60vh', width: '100%' }}></div>
    </div>
  );
};

export default Mapadire;
