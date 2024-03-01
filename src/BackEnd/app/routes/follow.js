const express = require('express');
const router = express.Router();
const PruebaFollow = require('../controllers/follow');


// Create a new user

router.get('/pruebaFollow', PruebaFollow.pruebaFollow);

module.exports = router;