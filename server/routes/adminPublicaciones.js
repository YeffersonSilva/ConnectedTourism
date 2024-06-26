const express = require('express');
const router = express.Router();
const Listing = require('../models/Listing'); // Asegúrate de que la ruta al modelo Listing es correcta

// Ruta para obtener todas las publicaciones
router.get('/', async (req, res) => {
  try {
    const listings = await Listing.find(); // Asegúrate de que esto no tenga filtros innecesarios
    res.status(200).json(listings);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching listings', error: err.message });
  }
});

// Ruta para obtener una publicación específica por ID
router.get('/:id', async (req, res) => {
  try {
    const listing = await Listing.findById(req.params.id);
    if (!listing) return res.status(404).json({ message: 'Listing not found' });
    res.json(listing);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Ruta para crear una nueva publicación
router.post('/', async (req, res) => {
  const {
    title,
    description,
    price,
    category,
    // Agregar otros campos necesarios aquí
  } = req.body;

  const newListing = new Listing({
    title,
    description,
    price,
    category,
    // Agregar otros campos necesarios aquí
  });

  try {
    const savedListing = await newListing.save();
    res.status(201).json(savedListing);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Ruta para actualizar una publicación
router.patch('/:id', async (req, res) => {
  const { id } = req.params;
  const updateData = req.body;

  try {
    const updatedListing = await Listing.findByIdAndUpdate(id, updateData, { new: true });
    if (!updatedListing) return res.status(404).json({ message: 'Listing not found' });
    res.json(updatedListing);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Ruta para eliminar una publicación
router.delete('/:id', async (req, res) => {
  try {
    const listing = await Listing.findByIdAndDelete(req.params.id);
    if (!listing) return res.status(404).json({ message: 'Listing not found' });

    res.status(204).send(); // Asegúrate de devolver 204 No Content
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
