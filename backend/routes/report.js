const { Router } = require("express");
const { Report } = require("../db");
const userMiddleware = require("../middleware/userMiddleware");

const reportRouter = Router();

// -----------------------------
// CREATE REPORT
// -----------------------------
reportRouter.post("/", userMiddleware, async (req, res) => {
  try {
    const { listingId, reason, additionalInfo } = req.body;

    if (!listingId || !reason) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    console.log("User reporting:", req.userId, listingId, reason,"Additional info:", additionalInfo); // debug

    const report = await Report.create({
      listingId,
      reportedBy: req.userId,  // Must come from userMiddleware
      reason,
      additionalInfo,
    });

    res.status(201).json({
      message: "Report submitted successfully",
      reportId: report._id,
    });
  } catch (err) {
    console.log(err); // log the error for debugging
    res.status(500).json({ message: "Failed to submit report" });
  }
});


module.exports = reportRouter;
