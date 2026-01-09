const { Router } = require("express");
const { User } = require("../db");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { JWT_USER_PASSWORD } = require("../config");
const userMiddleware = require("../middleware/userMiddleware");


const userRouter = Router();

// -----------------------------
// SIGNUP
// -----------------------------
userRouter.post("/signup", async (req, res) => {
  try {
    const { email, userName, password } = req.body;
    if (!email || !userName || !password)
      return res.status(400).json({ message: "All fields are required" });

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      email,
      userName,
      password: hashedPassword,
    });

    // Generate token immediately
    const token = jwt.sign({ id: user._id }, JWT_USER_PASSWORD, { expiresIn: "7d" });

    res.json({ message: "Signup success", userId: user._id, token });
  } catch (err) {
    res.status(400).json({ message: "Signup failed", error: err.message });
  }
});


// -----------------------------
// SIGNIN
// -----------------------------
userRouter.post("/signin", async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password)
      return res.status(400).json({ message: "Email and password are required" });

    // Find user by email
    const user = await User.findOne({ email });
    if (!user) return res.status(401).json({ message: "Invalid credentials" });

    // Compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ message: "Invalid credentials" });

    // Sign JWT token
    const token = jwt.sign({ id: user._id }, JWT_USER_PASSWORD, { expiresIn: "7d" });

    res.json({ token });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

// -----------------------------
// TEST PROTECTED ROUTE
// -----------------------------
userRouter.get("/profile", userMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.userId).select("-password");
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json({ user });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = userRouter;
