// Packages suplémentaires

const multer = require('multer');



// dictonnaire pour doner les extention des formats d'images en fonction de leurs mimetypes
const MIME_TYPES = {
  'image/jpg': 'jpg',
  'image/jpeg': 'jpg',
  'image/png': 'png',
  'image/gif': 'gif',
  'image:gif': 'png'
};



const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'images');
  },

  filename: (req, file, cb) => {
    const name = file.fieldname.split(' ').join('_');   //fieldname pour avoir juste le nom sans l'extention
    const extension = MIME_TYPES[file.mimetype];

    cb(null, 'sauces_piquantes_' + name + Date.now() + '.' + extension);

  }

});
var upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    if (file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg" || file.mimetype == "image/gif") {
      cb(null, true);
    } else {
      cb(null, false);
      return cb(new Error('Only .png, .gif  .jpg and .jpeg  format allowed!'));
    }
  }

});


module.exports = upload.single('image');