// Ajout paquetage suplémentaires de sécurité
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

//paquetage pour avoire de email conforme
const emailValidator = require('email-validator');


// paquetage pour obliger l'utilisateur a chosir un mot de passe fort
const passwordValidator = require('password-validator');

var schemaPasseWord = new passwordValidator();

schemaPasseWord
    .is().min(8)            // Minimum 8 characters long
    .is().max(30)           // Maximum 30 characters long
    .has().uppercase()      // Avoir une letter majuscul 
    .has().lowercase()      // Avoir une  letter minucule
    .has().digits(2)        // Avoir 2 chiffres
    .has().not().spaces();  // Ne pas avoire d'espace


// Import modèle de l'utilisateur
const User = require('../models/user');


//création utilisateur
exports.signup = (req, res, next) => {
    if (!schemaPasseWord.validate(req.body.password) || (!emailValidator.validate(req.body.email))) {
        throw { error: "Merci d'entrer une adresse mail et un mot de passe valide !" }
    } else if (schemaPasseWord.validate(req.body.password) && (emailValidator.validate(req.body.email))) {
        bcrypt.hash(req.body.password, 7)
            .then(hash => {
                const user = new User({
                    email: req.body.email,
                    password: hash
                });
                user.save()
                    .then(() => res.status(201).json({ message: 'Utilisateur créé, Bienvenue!' }))
                    .catch(error => res.status(400).json({ message: 'Données invalides pour créé un utilisateur !' }));
            })
            .catch(error => res.status(500).json({ error }));
    }
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