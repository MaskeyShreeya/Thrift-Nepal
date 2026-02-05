const express = require("express");
const mongoose = require("mongoose");

const app = express();
app.use(express.json());

// Routers
const userRouter = require("./routes/user");
const adminRouter = require("./routes/admin");
const listingRouter = require("./routes/listing");
const cartRouter = require("./routes/cart");


app.use("/api/v1/user", userRouter);
app.use("/api/v1/admin", adminRouter);
app.use("/api/v1/listing", listingRouter);
app.use("/cart", cartRouter);
app.use("/uploads", express.static("uploads"));

app.get("/", (req, res) => {
  res.json({ message: "Event Management API is running!" });
});

async function main() {
  await mongoose.connect(
    "mongodb+srv://np03cs4a230297:4sbHjzREg6643Jqi@cluster0.kwjjwkt.mongodb.net/Thrift-Nepal"
  );
  app.listen(3000, () => console.log("✅ Server running on port 3000"));
  console.log("✅ MongoDB connected");
}

main();