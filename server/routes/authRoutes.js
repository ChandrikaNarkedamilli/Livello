const express = require("express");
const router = express.Router();
const multer = require('multer');
const upload = require('../middlewares/upload')
const { Register, Login } = require("../controllers/AuthController");

// const storage = multer.diskStorage({
//   destination: 'uploads/',
//   filename: (req, file, cb) => {
//     cb(null, Date.now() + path.extname(file.originalname));
//   }
// });

// const upload = multer({ storage });

router.post("/register", upload.single('profilePicture'),Register);

router.post("/login", Login);

module.exports = router;