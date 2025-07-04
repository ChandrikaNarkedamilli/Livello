const mongoose = require('mongoose');
const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const dotenv = require('dotenv');


dotenv.config();  

const allowedOrigins = [
  "https://livello.vercel.app",
  "http://localhost:5173"
]

const app = express();
// app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use(cors({
  origin: function (origin, callback) {
    console.log("CORS Request from:", origin); 
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
}));
app.use(express.json());
app.use(cookieParser());


mongoose.connect(process.env.MONGO_URI)
  .then(()=>console.log("MongoDB Connection Establised Successfully!"))
  .catch((error)=>console.log(error))

app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/users", require("./routes/userRoutes"));

app.use('/uploads', express.static('uploads'));

const PORT = process.env.PORT;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
