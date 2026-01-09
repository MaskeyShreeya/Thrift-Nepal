const { Router } = require("express");
const Listing = require("../models/Listing");
const userMiddleware = require("../middleware/userMiddleware");
const adminMiddleware = require("../middleware/adminMiddleware");
const multer = require("multer");
const path = require("path");
const fs = require("fs");

const listingRouter = Router();

// ---------------------------
// Ensure uploads folder exists
// ---------------------------
const uploadDir = "uploads";
if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir);

// ---------------------------
// Multer setup
// ---------------------------
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadDir),
  filename: (req, file, cb) =>
    cb(null, Date.now() + path.extname(file.originalname)),
});
const upload = multer({ storage });

// ---------------------------
// USER ROUTES
// ---------------------------
listingRouter.use(userMiddleware); // protect all routes below

// CREATE LISTING
listingRouter.post("/", upload.single("image"), async (req, res) => {
  try {
    const { title, description, category, price, deliveryOption } = req.body;
    let location = {};

    // safely parse location, default to empty
    try {
      location = req.body.location ? JSON.parse(req.body.location) : {};
    } catch (err) {
      location = { address: req.body.location || "" };
    }

    const listing = await Listing.create({
      title,
      description,
      category,
      price: Number(price),
      deliveryOption,
      location,
      owner: req.userId,
      imageUrl: req.file ? `/uploads/${req.file.filename}` : undefined,
    });

    res.status(201).json({ success: true, message: "Listing created", listing });
  } catch (err) {
    console.error("CREATE LISTING ERROR:", err);
    res.status(500).json({ success: false, error: err.message });
  }
});

// GET ALL LISTINGS (any user can view)
listingRouter.get("/", async (req, res) => {
  try {
    const { category, page = 1, limit = 20, search } = req.query;
    let filter = {};

    if (category) filter.category = category;
    if (search) {
      filter.$or = [
        { title: { $regex: search, $options: "i" } },
        { description: { $regex: search, $options: "i" } },
      ];
    }

    const listings = await Listing.find(filter)
      .populate("owner", "userName email")
      .sort({ createdAt: -1 })
      .limit(Number(limit))
      .skip((Number(page) - 1) * Number(limit));

    const total = await Listing.countDocuments(filter);

    res.json({
      success: true,
      listings,
      pagination: {
        page: Number(page),
        limit: Number(limit),
        total,
        pages: Math.ceil(total / limit),
      },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, error: err.message });
  }
});

// GET LOGGED-IN USER'S LISTINGS
listingRouter.get("/my", async (req, res) => {
  try {
    const listings = await Listing.find({ owner: req.userId })
      .populate("owner", "userName email")
      .sort({ createdAt: -1 });

    res.json({ success: true, listings, count: listings.length });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// GET SINGLE LISTING
listingRouter.get("/:listingId", async (req, res) => {
  try {
    const listing = await Listing.findById(req.params.listingId)
      .populate("owner", "userName email");

    if (!listing)
      return res.status(404).json({ success: false, error: "Listing not found" });

    res.json({ success: true, listing });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// UPDATE LISTING (only owner)
listingRouter.put("/:listingId", async (req, res) => {
  try {
    const listing = await Listing.findById(req.params.listingId);

    if (!listing)
      return res.status(404).json({ success: false, error: "Listing not found" });

    if (String(listing.owner) !== req.userId)
      return res.status(403).json({
        success: false,
        error: "You are not allowed to update this listing",
      });

    Object.assign(listing, req.body);
    await listing.save();
    await listing.populate("owner", "userName email");

    res.json({ success: true, message: "Listing updated successfully", listing });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// DELETE LISTING (only owner)
listingRouter.delete("/:listingId", async (req, res) => {
  try {
    const listing = await Listing.findById(req.params.listingId);

    if (!listing)
      return res.status(404).json({ success: false, error: "Listing not found" });

    if (String(listing.owner) !== req.userId)
      return res.status(403).json({
        success: false,
        error: "You are not allowed to delete this listing",
      });

    await listing.deleteOne();
    res.json({ success: true, message: "Listing deleted successfully" });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

module.exports = listingRouter;
