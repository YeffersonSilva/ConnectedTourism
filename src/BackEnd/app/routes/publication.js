const express = require('express');
const router = express.Router();
const publicationController = require('../controllers/publication');


// Create a new user

router.get('/pruebaPublication', publicationController.pruebaPublication);

module.exports = router;