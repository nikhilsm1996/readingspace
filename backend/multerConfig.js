const multer = require('multer');
const path = require('path');

// Set up multer storage options
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // Save files in the 'uploads' directory, relative to the project root
    cb(null, path.join(__dirname, 'uploads')); // This uses __dirname to ensure relative path resolution
  },
  filename: (req, file, cb) => {
    // Use the current date and the file extension for a unique filename
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

// Initialize multer upload with storage options
const upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    const filetypes = /jpeg|jpg|png|gif/;    //Regex
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = filetypes.test(file.mimetype);

    if (extname && mimetype) {
      return cb(null, true);
    } else {
      cb(new Error('Only image files are allowed.'));
    }
  },
});

module.exports = upload;
