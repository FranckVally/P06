const mongoose = require('mongoose');

// pour ne pas avoir deux fois le meme nom d'utilisateur
const uniqueValidator = require('mongoose-unique-validator');

//pour securiser contre l’injection SQL
const validate = require('mongoose-validator')



const userSchema = mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true }
});

userSchema.plugin(uniqueValidator);

module.exports = mongoose.model('User', userSchema);