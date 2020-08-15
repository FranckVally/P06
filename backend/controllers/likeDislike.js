// Import modèle des sauces
const Sauce = require('../models/sauces');


// LIKE & DISLIKES une sauce
exports.likeSauce = (req, res, next) => {
  switch (req.body.like) {
    // Défault = 0
    // Verification que l'utilisateur n'a pas déjà LIKER la sauce
    case 0:
      Sauce.findOne({ _id: req.params.id })
        .then((sauce) => {
          if (sauce.usersLiked.find(user => user === req.body.userId)) {
            Sauce.updateOne({ _id: req.params.id }, {
              $inc: { likes: -1 },
              $pull: { usersLiked: req.body.userId },
              _id: req.params.id
            })
              .then(() => { res.status(201).json({ message: 'Avis pris en compte !' }); })
              .catch((error) => { res.status(400).json({ error: error }); });

              // Verification que l'utilisateur n'a pas déjà DISLIKER la sauce
          } if (sauce.usersDisliked.find(user => user === req.body.userId)) {
            Sauce.updateOne({ _id: req.params.id }, {
              $inc: { dislikes: -1 },
              $pull: { usersDisliked: req.body.userId },
              _id: req.params.id
            })
              .then(() => { res.status(201).json({ message: 'Avis pris en compte !' }); })
              .catch((error) => { res.status(400).json({ error: error }); });
          }
        })
        .catch((error) => { res.status(404).json({ error: error }); });
      break;
    //likes = 1
    case 1:
      Sauce.updateOne({ _id: req.params.id }, {
        $inc: { likes: 1 },
        $push: { usersLiked: req.body.userId },
        _id: req.params.id
      })
        .then(() => { res.status(201).json({ message: 'Like pris en compte !' }); })
        .catch((error) => { res.status(400).json({ error: error }); });
      break;
    //likes = -1
    case -1:
      Sauce.updateOne({ _id: req.params.id }, {
        $inc: { dislikes: 1 },
        $push: { usersDisliked: req.body.userId },
        _id: req.params.id
      })
        .then(() => { res.status(201).json({ message: 'Dislike pris en compte !' }); })
        .catch((error) => { res.status(400).json({ error: error }); });
      break;
    default:
      console.error('fauce requête ! ');
  }
};