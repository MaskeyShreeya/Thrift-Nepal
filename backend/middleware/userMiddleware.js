const jwt = require("jsonwebtoken");
const { JWT_USER_PASSWORD } = require("../config");
const { userModel } = require("../db");

async function userMiddleware(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader)
    return res.status(401).json({ message: "Token not provided" });

  const token = authHeader.startsWith("Bearer ")
    ? authHeader.slice(7)
    : authHeader;

  try {
    const decoded = jwt.verify(token, JWT_USER_PASSWORD);

    // Verify that user exists
    const user = await userModel.findById(decoded.id);
    if (!user) return res.status(403).json({ message: "User not found" });

    req.userId = user._id; // keeps it clear that this is a user
    next();
  } catch (err) {
    res.status(401).json({ message: "Invalid or expired token" });
  }
}

module.exports = userMiddleware;
