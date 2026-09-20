import mongoose from "mongoose";
import dotenv from "dotenv";
import User from "./models/userModel.js";

dotenv.config();

const checkUsers = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected to MongoDB 👍\n");

    const users = await User.find({});
    console.log(`Found ${users.length} users:\n`);
    
    users.forEach((user, idx) => {
      console.log(`${idx + 1}. ${user.username} (${user.email}) - Role: ${user.role}`);
    });

    if (users.length === 0) {
      console.log("No users found in database");
    }

    process.exit(0);
  } catch (error) {
    console.error("❌ Error:", error.message);
    process.exit(1);
  }
};

checkUsers();
