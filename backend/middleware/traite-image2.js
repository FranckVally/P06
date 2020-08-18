const sharp = require('sharp');

const resizeImages = async (req, res, next) => {
    sharp(req.file.images)
    .resize({ height: 100 })
    .tofile(path.resolve(req.file.images))
    };
  

module.exports = resizeImages