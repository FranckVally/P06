// Import modèle des sauces
const Sauce = require('../models/sauces');


// LIKE & DISLIKES une sauce
exports.likeSauce = (req, res, next) => {
  Sauce.findOne({ _id: req.params.id })
 



     
}