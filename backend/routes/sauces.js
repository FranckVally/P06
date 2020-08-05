const express = require('express');
const router = express.Router();


// Import middleware auth securisation des routes
const auth = require('../middleware/auth');


module.exports = router;