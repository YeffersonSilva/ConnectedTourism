const express = require('express');
const router = express.Router();
const usersController = require('../controllers/usersController'); // Asegúrate de que la ruta al controlador es correcta

// Ruta para obtener todos los usuarios
router.get('/', usersController.getAllUsers);

// Ruta para obtener un usuario específico por ID
router.get('/:id', usersController.getUserById);

// Ruta para crear un nuevo usuario
router.post('/', usersController.createUser);

// Ruta para actualizar un usuario
router.patch('/:id', usersController.updateUser);

// Ruta para eliminar un usuario
router.delete('/:id', usersController.deleteUser);

module.exports = router;
