const mongoose = require("mongoose");

const listingSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    category: {
      type: String,
      enum: ["electronics", "fashion", "food", "books", "other"],
      required: true,
    },
    condition: {
      type: String,
      enum: ["new", "like_new", "good", "fair"],
      required: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    location: {
      address: { type: String, required: true },
      coordinates: {
        lat: { type: Number },
        lng: { type: Number },
      },
    },
    deliveryOption: {
      type: String,
      enum: ["pick-up", "courier", "both"],
      default: "pick-up",
    },
    price: {
      type: Number,
      required: true,
      min: 0,
    },
    isNegotiable: {
      type: Boolean,
      default: false, // false = Non-negotiable, true = Negotiable
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    imageUrl: {
      type: String, // or Array if multiple images later
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Listing", listingSchema);