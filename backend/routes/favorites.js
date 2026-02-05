// routes/favorites.js
const express = require("express");
const router = express.Router();
const Favorite = require("../models/Favorite");
const userMiddleware = require("../middleware/userMiddleware"); // JWT auth
// GET all favorites
router.get("/", userMiddleware, async (req, res) => {
  try {
    const items = await Favorite.find({ userId: req.userId }).populate("productId");
    res.json({ items });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to fetch favorites" });
  }
});

// ADD favorite
router.post("/add", userMiddleware, async (req, res) => {
  const { productId } = req.body;
  if (!productId) return res.status(400).json({ message: "Product ID required" });

  try {
    const exists = await Favorite.findOne({ userId: req.userId, productId });
    if (exists) return res.status(200).json({ message: "Already in favorites" });

    const fav = new Favorite({ userId: req.userId, productId });
    await fav.save();

    res.json({ message: "Added to favorites", favorite: fav });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to add favorite" });
  }
});

// REMOVE favorite
router.post("/remove", userMiddleware, async (req, res) => {
  const { productId } = req.body;
  try {
    await Favorite.deleteOne({ userId: req.userId, productId });
    res.json({ message: "Removed from favorites" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to remove favorite" });
  }
});


module.exports = router;
