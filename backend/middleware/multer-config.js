// Packages suplémentaires
const multer = require('multer');

const Jimp = require('jimp');

// dictonnaire pour doner les extention des formats d'images en fonction de leurs mimetypes
const MIME_TYPES = {
  'image/jpg': 'jpg',
  'image/jpeg': 'jpg',
  'image/png': 'png',
  'image/gif' : 'gif',
};



//Création d'une constante  indique la destination du fichier entrant et lui donner un nom avec filename
const storage = multer.diskStorage({
 
  destination: (req, file, callback) => {
    callback(null, 'images');
  },
  
  filename: (req, file, callback) => {
    const name = file.originalname.split(' ').join('_');
    const extension = MIME_TYPES[file.mimetype];

    
      
    callback(null, 'sauces_piquantes_' + name +  Date.now() + '.' + extension);
    
    async function main() {
      // Read the image.
      const image = await jimp.read();
    
      // Resize the image to width 150 and auto height.
      await image.resize(150, jimp.AUTO);
    
      // Save and overwrite the image
      await image.writeAsync();
    }
    
    main();



  }
  
});


module.exports = multer({storage: storage}).single('image');