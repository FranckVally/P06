// Ajout des packages suplémentaires pour la BDD
const mongoose = require('mongoose');


// pour ne pas avoir deux fois le même nom de sauce 
const uniqueValidator = require('mongoose-unique-validator');

//pour securiser contre l’injection SQL
const validate = require('mongoose-validator')

var antiSQL = [
  validate({
    validator: 'isLength',
    arguments: [3, 150],
    message: 'Name should be between {ARGS[0]} and {ARGS[1]} characters',
  }),
  validate({
    validator: 'matches',
    arguments: /^[a-z\d\-_\s]+$/i,
    message: 'Name should contain alpha-numeric characters only',
  }),
]


// Modèle des sauces
const sauceSchema = mongoose.Schema({
  userId: { type: String, required: true },
  name: { type: String, required: true, unique: true, validate: antiSQL },
  manufacturer: { type: String, required: true, validate: antiSQL },
  description: { type: String, required: true, validate: antiSQL },
  mainPepper: { type: String, required: true, validate: antiSQL },
  imageUrl: { type: String, required: true },
  heat: { type: Number, required: true },
  likes: { type: Number, required: false, default: 0 },
  dislikes: { type: Number, required: false, default: 0 },
  usersLiked: { type: [String], required: false },
  usersDisliked: { type: [String], required: false },
});

sauceSchema.plugin(uniqueValidator);

module.exports = mongoose.model('Sauce', sauceSchema);