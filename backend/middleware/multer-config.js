// Packages suplémentaires

const multer = require('multer');

const jimp = require('jimp');

// dictonnaire pour doner les extention des formats d'images en fonction de leurs mimetypes
const MIME_TYPES = {
  'image/jpg': 'jpg',
  'image/jpeg': 'jpg',
  'image/png': 'png',
  'image/gif': 'gif',
};


const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, 'images');
  },

  filename: (req, file, callback) => {
    const name = file.fieldname.split(' ').join('_');   //fieldname pour avoir juste le nom sans l'extention
    const extension = MIME_TYPES[file.mimetype];

 

    callback(null, 'sauces_piquantes_' + name + Date.now() + '.' + extension);
 
   
    var upload = multer({ 
      storage : storage,
      fileFilter: function (req, file, callback) {
          var extension  = extension;
          if(extension !== '.png' && ext !== '.jpg' && ext !== '.gif' && ext !== '.jpeg') {
              return callback(new Error('Only images are allowed'))
          }
          callback(null, true)
      }
  }).single('userFile');
  
  upload(req,res,function(err) {
      if(err) {
          return res.end("Error uploading file.");
      }
      res.end("File is uploaded");
  });

  
  }

});



module.exports = multer({ storage: storage }).single('image');