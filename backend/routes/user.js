const express = require('express');
const router = express.Router();

/* pour limiter le nombre de tentative de connexion : 
6000 nombrem  minimum de millisecondes que l'utilisateur peut être forcé d'attendre, 
600000  nombre maximum de millisecondes que l'utilisateur peut être forcé d'attendre 
2 nombre de tentatives qu'un utilisateur peut faire avant d'être forcé d'attendre*/
const bouncer = require("express-bouncer")(6000, 600000, 2);




const userCtrl = require('../controllers/user');


router.post('/signup', userCtrl.signup);
router.post('/login', bouncer.block, userCtrl.login);

module.exports = router;