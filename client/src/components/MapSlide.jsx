import React, { useEffect, useRef, useState } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import '../styles/MapSlide.scss';
import markerIcon from '../assets/marker-icon.png';

// Asume que tienes una URL de backend/API para obtener los eventos
const EVENTS_API_URL = "http://localhost:3001/events";

const MapSlide = () => {
  const mapRef = useRef(null);
  const markerRef = useRef(null); // Referencia al marcador del usuario

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

        if (markerRef.current) {
          markerRef.current.setLatLng([latitude, longitude]);
        } else {
          const customMarkerIcon = L.icon({
            iconUrl: markerIcon,
            iconSize: [40, 41], // Tamaño del icono
            iconAnchor: [12, 41] // Punto de anclaje del icono
          });
          markerRef.current = L.marker([latitude, longitude], { icon: customMarkerIcon }).addTo(mapRef.current);
        }

        // Carga y muestra eventos desde el backend
        fetch(EVENTS_API_URL)
          .then(response => response.json())
          .then(events => {
            events.forEach(event => {
              // Asume que event.location tiene las coordenadas [longitude, latitude]
              const eventPosition = [event.location.coordinates[1], event.location.coordinates[0]];
              L.marker(eventPosition, {
                icon: L.icon({
                  iconUrl: markerIcon,
                  iconSize: [40, 41],
                  iconAnchor: [20, 41]
                })
              }).bindPopup(`<b>${event.name}</b><br>${event.description}`).addTo(mapRef.current);
            });
          })
          .catch(error => console.error("Error al cargar eventos:", error));

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
        <h1>Bienvenido a NaviExplore <br /> Aquí puede ver su ubicación actual y eventos cercanos</h1>
      </div>
      <div id="map" style={{ height: '60vh', width: '100%' }}></div>
    </div>
  );
};

export default MapSlide;
