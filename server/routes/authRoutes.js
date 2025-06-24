const express = require("express");
const router = express.Router();
const multer = require('multer');
const upload = require('../middlewares/upload')
const { Register, Login } = require("../controllers/AuthController");


router.post("/register", upload.single('profilePicture'),Register);

router.post("/login", Login);

module.exports = router;