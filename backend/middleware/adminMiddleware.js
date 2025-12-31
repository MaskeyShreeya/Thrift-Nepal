const jwt = require("jsonwebtoken");
const { adminModel } = require("../db"); // import your admin model
const { JWT_ADMIN_PASSWORD } = require("../config");

async function adminMiddleware(req, res, next) {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "No token provided" });
  }

  try {
    const decoded = jwt.verify(token, JWT_ADMIN_PASSWORD);

    // Check if admin exists
    const admin = await adminModel.findById(decoded.id);
    if (!admin) return res.status(403).json({ message: "Admin not found" });

    req.adminId = admin._id; // use adminId instead of userId
    next();
  } catch (error) {
    res.status(403).json({ message: "Invalid or expired token" });
  }
}

module.exports = adminMiddleware;
