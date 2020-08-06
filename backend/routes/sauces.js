const express = require('express');
const router = express.Router();
const sauceCtrl = require('../controllers/sauces');

// Import middleware auth securisation des routes
const auth = require('../middleware/auth');

//Import du middleware multer pour gérer les images : format extention 
const multer = require ('../middleware/multer-config');

//route des sauces
router.get('/', sauceCtrl.getListeSauce); //sans auth pour pouvoire voire les sauce sans etre inscrit.

router.delete('/:id', auth, sauceCtrl.supprimerSauce);
router.put ('/:id', auth, multer, sauceCtrl.modifSauce);
router.get('/:id', auth, sauceCtrl.getOneSauce);
router.post('/:id/like', auth, sauceCtrl.likeSauce);
router.post ('/', auth, multer, sauceCtrl.createSauce);



module.exports = router;