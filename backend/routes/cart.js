const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");        // needed for ObjectId
const Cart = require("../models/Cart");      // your cart model
const userMiddleware = require("../middleware/userMiddleware"); // JWT auth


router.post("/add", userMiddleware, async (req, res) => {
  const userId = req.userId;
  let { productId } = req.body;

  // Convert string to ObjectId
productId = new mongoose.Types.ObjectId(productId);

  let cart = await Cart.findOne({ userId });

  if (!cart) {
    cart = new Cart({
      userId,
      items: [{ productId, quantity: 1 }],
    });
  } else {
    const index = cart.items.findIndex(
      (item) => item.productId.toString() === productId.toString()
    );

    if (index > -1) {
      cart.items[index].quantity += 1;
    } else {
      cart.items.push({ productId, quantity: 1 });
    }
  }

  await cart.save();
  res.json({ message: "Item added to cart" });
});
// DELETE ITEM FROM CART
router.post("/remove", userMiddleware, async (req, res) => {
  const userId = req.userId;
  let { productId } = req.body;

  if (!productId) {
    return res.status(400).json({ message: "Product ID is required" });
  }

  // Convert string to ObjectId
  productId = new mongoose.Types.ObjectId(productId);

  try {
    const cart = await Cart.findOne({ userId });
    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    // Filter out the item to remove
    cart.items = cart.items.filter(
      (item) => item.productId.toString() !== productId.toString()
    );

    await cart.save();
    res.json({ message: "Item removed from cart", cart });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to remove item from cart" });
  }
});


// GET CART
router.get("/", userMiddleware, async (req, res) => {
  const cart = await Cart.findOne({ userId: req.userId }).populate(
    "items.productId"
  );
  res.json(cart);
});

module.exports = router;
