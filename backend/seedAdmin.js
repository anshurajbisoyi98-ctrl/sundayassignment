import mongoose from "mongoose";
import dotenv from "dotenv";
import User from "./models/userModel.js";
import bcrypt from "bcryptjs";

dotenv.config();

const seedAdmin = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected to MongoDB 👍");

    // Check if admin exists
    const adminExists = await User.findOne({ role: "ADMIN" });
    
    if (adminExists) {
      console.log("✅ Admin user already exists:");
      console.log(`   Email: ${adminExists.email}`);
      console.log(`   Username: ${adminExists.username}`);
      process.exit(0);
    }

    // Create admin user
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash("admin123", salt);

    const admin = new User({
      username: "Admin User",
      email: "admin@ewaste.com",
      password: hashedPassword,
      role: "ADMIN",
      isAdmin: true,
    });

    await admin.save();
    console.log("✅ Admin user created successfully!");
    console.log("   Email: admin@ewaste.com");
    console.log("   Password: admin123");
    console.log("\n⚠️  Please change the password after first login!");

    process.exit(0);
  } catch (error) {
    console.error("❌ Error seeding admin:", error.message);
    
    // Check if there's already an admin by role
    const existingAdmin = await User.findOne({ role: "ADMIN" });
    if (existingAdmin) {
      console.log("✅ Admin user already exists:");
      console.log(`   Email: ${existingAdmin.email}`);
    }
    
    process.exit(1);
  }
};

seedAdmin();
