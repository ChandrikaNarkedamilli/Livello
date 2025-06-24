const User = require('../models/UserModel')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')

const secretKey = process.env.JWT_SECRET

const Register = async (req, res) => {
    const { name, email, password, phoneNumber,address,profilePicture, role} = req.body;

    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }

        const salt = await bcrypt.genSalt(10)

        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new User({
            name,
            email,
            password: hashedPassword,
            phoneNumber,
            address,
            profilePicture: req.file ? req.file.filename : null,
            role,
        });

        await newUser.save();
        res.status(201).json({ message: "User registered successfully" });
        console.log("User registered!!");
    } catch (error) {
      console.error(error)
        res.status(500).json({ message: "Registration failed" });
    }
}


const Login = async(req,res) => {
  const {email,password}= req.body;
  try{
    const user = await User.findOne({email})
    if(!user || !(await bcrypt.compare(password, user.password))){
      return res.status(400).json({message : "Invalid email or password"})
    }
    const token = jwt.sign({id : user._id, role : user.role}, secretKey, {expiresIn: '1h'});
    res.cookie('token', token, {
      httpOnly: true,
      secure: true,
      sameSite: 'None',
    });

    res.status(200).json({message : "Login successful", user : {
      id : user._id,
      name : user.name,
      email : user.email,
      role : user.role,
      phoneNumber: user.phoneNumber,
      profilePicture : user.profilePicture
    }
  })
  } catch(error){
    console.error(error);
    res.status(500).json({message : "Login Failed"})
  }
}

module.exports = { Register, Login}