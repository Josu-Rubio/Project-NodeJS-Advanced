const multer = require('multer');

/**
 * Multer config. Data storage
 */
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, '../public/img/new/'));
  },
  filename: function (req, file, cb) {
    req.body.photo = file.originalname;
    cb(null, Date.now() + file.originalname);
  },
});
module.exports = multer({ storage: storage });
