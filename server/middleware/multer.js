const multer = require('multer');
const path = require('path');

const images = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, '../upload'));
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
});

const imagesUpload = multer({ storage: images });

module.exports = { imagesUpload };
