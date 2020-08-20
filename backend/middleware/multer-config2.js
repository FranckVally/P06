// Packages suplémentaires

const multer = require('multer');

const jimp = require('jimp');

// dictonnaire pour doner les extention des formats d'images en fonction de leurs mimetypes
const MIME_TYPES = {
  'image/jpg': 'jpg',
  'image/jpeg': 'jpg',
  'image/png': 'png',
  'image/gif' : 'gif',
};



function faireQqc() {
    return new Promise((successCallback, failureCallback) => {
      
        const storage = multer.diskStorage({
 
            destination: (req, file, callback) => {
              callback(null, 'images');
            },
            
            filename: (req, file, callback) => {
              const name = file.originalname.split(' ').join('_');
              const extension = MIME_TYPES[file.mimetype];
          
              
                
              callback(null, 'sauces_piquantes_' + name +  Date.now() + '.' + extension);
              let nomImage = 'sauces_piquantes_' + name +  Date.now() + '.' + extension
              
            }
            
          });

      if ('sauces_piquantes_' + name +  Date.now() + '.' + extension) {
        successCallback("Réussite");
      } else {
        failureCallback("Échec");
      }
    })
  }

  
const promise = faireQqc();



promise.then(function(){
  jimp.read('images/sauces_piquantes_' + name +  Date.now() + '.' + extension)
  .then(lenna => {
    return lenna
      .resize(256, 256) // resize
      .quality(60) // set JPEG quality
      .greyscale() // set greyscale
      .write('images/sauces_piquantes_' + name +  Date.now() + '.' + extension); // save
  })
  .catch(err => {
    console.error(err);
  });
}, function(){
  console.error(err);
});




module.exports = faireQqc({storage: storage}).single('image');