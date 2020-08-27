// Packages suplémentaires
const multer = require("multer");

// dictonnaire pour doner les extention des formats d'images en fonction de leurs mimetypes
const MIME_TYPES = {
  'image/jpg': 'jpg',
  'image/jpeg': 'jpg',
  'image/png': 'png',
  'image/gif': 'gif',
  'image:gif': 'png'
};


const multerStorage = multer.memoryStorage();

const multerFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image")) {
    cb(null, true);
  } else {
    cb("Please upload only images.", false);
  }
};

const upload = multer({
  storage: multerStorage,
  fileFilter: multerFilter
});



const uploadImages = (req, res, next) => {
  uploadFiles(req, res, err => {
    if (err instanceof multer.MulterError) { // A Multer error occurred when uploading.
      if (err.code === "LIMIT_UNEXPECTED_FILE") { // Too many images exceeding the allowed limit
        // ...
      }
    } else if (err) {
      // handle other errors
    }

    // Everything is ok.
    next();
  });
};

const sharp = require("sharp");

const resizeImages = async (req, res, next) => {
  if (!req.files) return next();

  req.body.images = [];
  await Promise.all(
    req.files.map(async file => {
      const newFilename = file.fieldname.split(' ').join('_')+  'sauces_piquantes_';   //fieldname pour avoir juste le nom sans l'extention
      const extension = MIME_TYPES[file.mimetype];

      await sharp(file.buffer)
        .resize(640, 320)
        .toFormat("jpeg")
        .jpeg({ quality: 90 })
        .toFile((`images/${newFilename}+Date.now() +'.' + ${extension}`));

      
    })
  );

  next();
};


module.exports = upload.single('image');