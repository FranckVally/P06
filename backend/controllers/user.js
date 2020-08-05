// Ajout packages suplémentaires de sécurité
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


// Import modèle de l'utilisateur
const User = require('../models/user');


//création utilisateur
exports.signup = (req, res, next) => {
    bcrypt.hash(req.body.password, 7)
        .then(hash => {
            const user = new User({
                email: req.body.email,
                password: hash
            });
            user.save()
                .then(() => res.status(201).json({ message: 'Utilisateur créé, Bienvenue!' }))
                .catch(error => res.status(400).json({ error }));
        })
        .catch(error => res.status(500).json({ error }));
};


// recupération et controle securité utilisateur  
exports.login = (req, res, next) => {
    User.findOne({ email: req.body.email })
        .then(user => {
            if (!user) {
                return res.status(401).json({ error: 'Mauvaise adresse mail ou Utilisateur non trouvé !' });
            }
            bcrypt.compare(req.body.password, user.password)
                .then(valid => {
                    if (!valid) {
                        return res.status(401).json({ error: 'Mot de passe faux !' });
                    }
                    res.status(200).json({
                        userId: user._id,
                        token: jwt.sign(
                            { userId: user._id },
                            'Phrase_aleatoire_ou_chaine_de_carractere_pour_TOKENT',
                            { expiresIn: '12h' }
                        )
                    });
                })
                .catch(error => res.status(500).json({ error }));
        })
        .catch(error => res.status(500).json({ error }));
};