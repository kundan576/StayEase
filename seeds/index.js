const mongoose = require("mongoose");
const Listing = require("../models/listing");
const User = require("../models/user");
const { data } = require("./data");

const MONGO_URL = "mongodb://127.0.0.1:27017/StayEase";

async function restoreData() {
  try {
    await mongoose.connect(MONGO_URL);
    console.log("✅ DB connected (Seed)");

    // Delete old listings
    await Listing.deleteMany({});
    console.log("🗑 Old listings deleted");

    // Get current users
    const users = await User.find();

    if (users.length === 0) {
      console.log("❌ No users found. Create users first.");
      process.exit(1);
    }

    console.log("👤 USERS FOUND:");
    users.forEach(u => console.log(u._id, u.username));

    // Assign owners in rotation
    const listings = data.map((l, i) => ({
      ...l,
      owner: users[i % users.length]._id,
    }));

    await Listing.insertMany(listings);

    console.log("✅ All listings restored successfully");

    await mongoose.connection.close();
    console.log("🔒 DB connection closed");
  } catch (err) {
    console.log("❌ Error:", err);
  }
}

restoreData();


