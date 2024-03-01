const express = require('express');
const router = express.Router();
const userController = require('../controllers/user');


// Create a new user

router.get('/pruebaUser', userController.pruebaUser);

module.exports = router;