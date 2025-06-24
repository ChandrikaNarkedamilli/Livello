const jwt = require('jsonwebtoken');
const User = require('../models/UserModel');

const secretKey = process.env.JWT_SECRET;

const verifyToken = async(req,res,next) => {
  const token = req.cookies.token

  if(!token){
    return res.status(401).json({message : "Not AUthenticated"})
  }

  try {
    const decoded = jwt.verify(token,secretKey)
    const user = await User.findById(decoded.id).select('-password')
    if (!user) {
      return res.status(401).json({ message: "User not found" })
    }
    req.user = user;
    next();
  } catch (error) {
    return res.status(403).json({message : "Invalid Token" })
  }
}

const isAdmin = async(req,res,next) => {
  if(req.user?.role !== 'admin'){
    return res.status(403).json({message : "Access Denied! You are not an admin"})
  }
  next();
}

module.exports = {
  verifyToken,
  isAdmin
};