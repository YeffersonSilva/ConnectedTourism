import React, { useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import '../styles/MapSlide.scss';


// Importa la imagen de tu icono personalizado
import markerIcon from '../assets/marker-icon.png';


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


        // Añadir marcador del usuario con icono personalizado
        if (markerRef.current) {
          markerRef.current.setLatLng([latitude, longitude]); // Actualiza la posición del marcador
        } else {
          const customMarkerIcon = L.icon({
            iconUrl: markerIcon,
            iconSize: [40, 41], // Tamaño del icono
            iconAnchor: [12, 41] // Punto de anclaje del icono
          });
          markerRef.current = L.marker([latitude, longitude], { icon: customMarkerIcon }).addTo(mapRef.current);
        }


        // Obtener la ruta desde la ubicación del usuario a Rua Uruguai en Santana do Livramento
        const osrmUrl = `http://router.project-osrm.org/route/v1/driving/${latitude},${longitude};-30.881944,-55.537685?overview=false`;
        fetch(osrmUrl)
          .then(response => response.json())
          .then(data => {
            const route = L.geoJSON(data.routes[0].geometry, {
              style: {
                color: 'red', // Cambia el color de la ruta a rojo
                weight: 5 // Cambia el grosor de la línea de la ruta
              }
            }).addTo(mapRef.current);
            mapRef.current.fitBounds(route.getBounds());
          })
          .catch(error => console.error("Error al obtener la ruta:", error));
      }, (error) => {
        console.error("Geolocation error: ", error);
      }, { enableHighAccuracy: true }); // Opción para obtener una posición más precisa
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


