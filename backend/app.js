const express = require('express');
const bodyParser = require ('body-parser');
const mongoose = require('mongoose');
const path = require('path');

const app = express();

//Importations des routes
const saucesRoutes = require('./routes/sauces');
const userRoutes = require('./routes/user');


mongoose.connect('mongodb+srv://VALLY:8wDrt6Ue6rpv4r7@cluster0.xqms6.mongodb.net/<dbname>?retryWrites=true&w=majority',
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));

// Contourner les erreurs de CORS
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});

// Pour gérer les demandes POST
app.use(bodyParser.json());

// Pour enregistre les images dans en statique ans le dossier images
app.use('/images', express.static(path.join(__dirname, 'images')));

//routes des API
app.use('/api/sauces', saucesRoutes);  
app.use('/api/auth', userRoutes);

  
module.exports = app;