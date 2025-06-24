const UserModel = require("../models/UserModel")
const bcrypt = require('bcryptjs');

const getUsers = async(req,res) => {
  const page = parseInt(req.query.page) || 1
  const limit = 10
  const skip = (page - 1)*limit
  try{
    const users = await UserModel.find().skip(skip).limit(limit).select('-password')
    const count = await UserModel.countDocuments()
    res.json({ users, currentPage: page, totalPages: Math.ceil(count / limit)});  
  }catch(error) {
    console.error(error)
    res.status(500).json({ message: "Failed to fetch users" })
  } 
}

const getUserById = async(req,res) => {
  if(req.user.role !== 'admin' && req.user._id.toString() !== req.params.id) {
    return res.status(403).json({ message: "Access Denied! You are not an admin" });  
  }

  const user = await UserModel.findById(req.params.id).select('-password');
  if(!user) return res.status(404).json({ message: "User not found" });
  res.json(user);
}
const updateUser = async(req,res) => {
  const isOwnProfile = req.user._id.toString() === req.params.id;
  const isAdmin = req.user.role === 'admin';

  if (!isAdmin && !isOwnProfile) {
    return res.status(403).json({ message: "Unauthorized" });
  }
  const updateFields = { ...req.body };
  if (req.file) {
    updateFields.profilePicture = req.file.filename;
  }
  const updatedUser = await UserModel.findByIdAndUpdate(req.params.id, updateFields,{new: true}).select('-password');
  res.json(updatedUser);
}

const deleteUser = async (req, res) => {
  await UserModel.findByIdAndDelete(req.params.id);
  res.json({ message: "User deleted" });
};

const createUser = async (req, res) => {
  try{
    console.log("Incoming form-data body:", req.body);
    console.log("Incoming file data:", req.file);

    const { name, email, password, phoneNumber, address, role } = req.body;
    const profilePicture = req.file ? req.file.filename : null;

    if (!name || !email || !password) {
      return res.status(400).json({ message: "Name, Email, and Password are required" });
    }

    const existingUser = await UserModel.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await UserModel.create({ name, email, password: hashedPassword, phoneNumber, address, profilePicture, role });
    res.status(201).json({ message: "User created", user });
  }catch(error) {
    console.error(error);
    return res.status(500).json({ message: "Error creating user" });
  }
};

module.exports = {
  getUsers,
  getUserById,
  updateUser,
  deleteUser,
  createUser
};
