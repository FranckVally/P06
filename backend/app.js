const express = require('express');
const mongoose = require('mongoose');


const app = express();

//Importations des routes
const saucesRoutes = require('./routes/sauces');
const userRoutes = require('./routes/user');


mongoose.connect('mongodb+srv://VALLY:8wDrt6Ue6rpv4r7@cluster0.xqms6.mongodb.net/<dbname>?retryWrites=true&w=majority',
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));



app.use('/api/sauces', saucesRoutes);  
app.use('/api/auth', userRoutes);

  
module.exports = app;