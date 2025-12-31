const { Router } = require("express");
const Purchase = require("../models/purchase");
const userMiddleware = require("../middleware/userMiddleware");
const adminMiddleware = require("../middleware/adminMiddleware");

const router = Router();

/* ----------------- ADMIN ROUTES ----------------- */

// CREATE PURCHASE (Admin only)
router.post("/", adminMiddleware, async (req, res) => {
  try {
    const { userId, items, deliveryOption } = req.body;

    const totalPrice = items.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );

    const purchase = await Purchase.create({
      user: userId,
      items,
      deliveryOption,
      totalPrice,
      createdBy: req.adminId, // track which admin created
    });

    res.status(201).json({ success: true, purchase });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
});

// READ ALL PURCHASES (Admin only)
router.get("/", adminMiddleware, async (req, res) => {
  try {
    const purchases = await Purchase.find()
      .populate("user", "userName email")
      .sort({ createdAt: -1 });
    res.json({ success: true, purchases });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// READ SINGLE PURCHASE (Admin only)
router.get("/:purchaseId", adminMiddleware, async (req, res) => {
  try {
    const purchase = await Purchase.findById(req.params.purchaseId)
      .populate("user", "userName email");
    if (!purchase)
      return res.status(404).json({ success: false, error: "Purchase not found" });
    res.json({ success: true, purchase });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// UPDATE PURCHASE (Admin only)
router.put("/:purchaseId", adminMiddleware, async (req, res) => {
  try {
    const { status, deliveryOption } = req.body;

    const purchase = await Purchase.findByIdAndUpdate(
      req.params.purchaseId,
      { status, deliveryOption },
      { new: true }
    );

    if (!purchase)
      return res.status(404).json({ success: false, error: "Purchase not found" });

    res.json({ success: true, purchase });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// DELETE PURCHASE (Admin only)
router.delete("/:purchaseId", adminMiddleware, async (req, res) => {
  try {
    const purchase = await Purchase.findByIdAndDelete(req.params.purchaseId);
    if (!purchase)
      return res.status(404).json({ success: false, error: "Purchase not found" });
    res.json({ success: true, message: "Purchase deleted successfully" });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

/* ----------------- USER ROUTES ----------------- */

// GET ALL PURCHASES (User only, their own)
router.get("/my", userMiddleware, async (req, res) => {
  try {
    const purchases = await Purchase.find({ user: req.userId }).sort({
      createdAt: -1,
    });
    res.json({ success: true, purchases });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// GET SINGLE PURCHASE (User only, their own)
router.get("/my/:purchaseId", userMiddleware, async (req, res) => {
  try {
    const purchase = await Purchase.findOne({
      _id: req.params.purchaseId,
      user: req.userId,
    });

    if (!purchase)
      return res.status(404).json({ success: false, error: "Purchase not found" });

    res.json({ success: true, purchase });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

module.exports = router;
