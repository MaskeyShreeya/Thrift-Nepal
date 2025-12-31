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
      enum: ["electronics", "fashion", "food", "books", "other"], // customize categories
      required: true,
    },
    description: {
      type: String,
      required: true,
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
      enum: ["pick-up", "courier"],
      default: "pick-up",
    },
    price: {
      type: Number,
      required: true,
      min: 0,
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // links to the user who creates the listing
      required: true,
    },
    imageUrl: String, // optional image
  },
  {
    timestamps: true, // createdAt and updatedAt
  }
);

module.exports = mongoose.model("Listing", listingSchema);
