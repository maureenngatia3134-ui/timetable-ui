import express from "express";
import bcrypt from "bcrypt"; 
import jwt from "jsonwebtoken";
import mongoose from "mongoose";
import User from "./models/user.js";
import cors from "cors";


const app = express();
const router = express.Router();
const SECRET_KEY = "MaureensecretKey2020!";

//middleware
app.use(cors());
app.use(express.json());
app.use("/api", router);

//connect to MongoDB
// NOTE: prefer keeping secrets out of source. Use env var MONGO_URI in production.
mongoose.connect('mongodb+srv://maureenngatia3134_db_user:JOdald8KUrPH6ke3@cluster1.ox1jvlb.mongodb.net/?appName=Cluster1')
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

router.post("/register", async(req, res)=>{
  const { name, email, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = new User ({ name, email, password: hashedPassword });
  await newUser.save();
  res.json({ message:"User registered successfully"});
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) return res.status(404).json({ message: "User not found"});

  const valid = await bcrypt.compare(password, user.password);
  if (!valid) return res.status(401).json({ message: "invalid credentials"});
  
  const token = jwt.sign({ id: user._id, email: user.email }, SECRET_KEY, { expiresIn: "3600s"});
  res.json({ token});
})

router.get("/profile", (req, res) => {
  const authHeader = req.headers.authorization;
  if ( !authHeader ) return res.status(403).json({ message: "No token"});
  const token = authHeader.split(" ")[1];

  jwt.verify(token, SECRET_KEY, (err, user) => {
    if (err) return res.status(401).json({ message: "invalid token" });
    res.json({ message: "access granted", user });
  });
});
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
