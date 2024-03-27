// En un archivo dentro de /routes/, por ejemplo, eventRoutes.js
const express = require('express');
const router = express.Router();
const Event = require('../models/Event'); // Asegúrate de usar la ruta correcta a tu modelo
const NodeGeocoder = require('node-geocoder');



const geocoder = NodeGeocoder({
    provider: 'openstreetmap'
  });
// Ruta para obtener todos los eventos
router.get('/api/events', async (req, res) => {
  try {
    const events = await Event.find({});
    res.json(events);
  } catch (error) {
    res.status(500).send(error.message);
  }
});
// Supongamos que esto es parte de tu ruta para crear un evento
router.post('/events', async (req, res) => {
    const { name, description, date, streetAddress } = req.body;
  
    try {
      // Usa geocoder para obtener las coordenadas de la dirección
      const geocodingResult = await geocoder.geocode(streetAddress);
      if (geocodingResult.length > 0) {
        const { latitude, longitude } = geocodingResult[0];
  
        // Crea un nuevo evento con las coordenadas obtenidas
        const newEvent = new Event({
          name,
          description,
          date,
          location: {
            type: 'Point',
            coordinates: [longitude, latitude] // Nota el orden: longitud, latitud
          }
        });
  
        // Guarda el evento en la base de datos
        await newEvent.save();
        res.status(201).json(newEvent);
      } else {
        res.status(400).json({ message: 'No se pudo geocodificar la dirección proporcionada.' });
      }
    } catch (error) {
      res.status(500).json({ message: 'Error al crear el evento.', error });
    }
  });
  

module.exports = router;
