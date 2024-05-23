const express = require('express');
const router = express.Router();
const listingsController = require('../controllers/listingsController'); // Asegúrate de que la ruta al controlador es correcta

// Ruta para obtener todas las publicaciones
router.get('/', listingsController.getAllListings);

// Ruta para obtener una publicación específica por ID
router.get('/:id', listingsController.getListingById);

// Ruta para crear una nueva publicación
router.post('/', listingsController.createListing);

// Ruta para actualizar una publicación
router.patch('/:id', listingsController.updateListing);

// Ruta para eliminar una publicación
router.delete('/:id', listingsController.deleteListing);

module.exports = router;
