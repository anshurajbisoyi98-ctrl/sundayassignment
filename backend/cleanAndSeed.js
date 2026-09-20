import mongoose from "mongoose";
import dotenv from "dotenv";
import User from "./models/userModel.js";
import bcrypt from "bcryptjs";

dotenv.config();

const cleanAndSeed = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected to MongoDB 👍\n");

    // Remove all users
    const deleted = await User.deleteMany({});
    console.log(`🗑️  Deleted ${deleted.deletedCount} existing user(s)\n`);

    // Create admin user
    const salt = await bcrypt.genSalt(10);
    const adminPassword = await bcrypt.hash("admin123", salt);

    const admin = new User({
      username: "Admin",
      email: "admin@ewaste.com",
      password: adminPassword,
      role: "ADMIN",
      isAdmin: true,
    });

    await admin.save();
    console.log("✅ Admin user created:");
    console.log("   Email: admin@ewaste.com");
    console.log("   Password: admin123");
    console.log("   Role: ADMIN\n");

    // Create sample collection agent
    const agentPassword = await bcrypt.hash("agent123", salt);
    const agent = new User({
      username: "Collection Agent 1",
      email: "agent@ewaste.com",
      password: agentPassword,
      role: "COLLECTOR",
    });

    await agent.save();
    console.log("✅ Collection Agent created:");
    console.log("   Email: agent@ewaste.com");
    console.log("   Password: agent123");
    console.log("   Role: COLLECTOR\n");

    // Create sample citizen
    const citizenPassword = await bcrypt.hash("citizen123", salt);
    const citizen = new User({
      username: "John Doe",
      email: "citizen@ewaste.com",
      password: citizenPassword,
      role: "CITIZEN",
    });

    await citizen.save();
    console.log("✅ Citizen user created:");
    console.log("   Email: citizen@ewaste.com");
    console.log("   Password: citizen123");
    console.log("   Role: CITIZEN\n");

    console.log("🎉 Database cleaned and seeded successfully!");
    console.log("\n⚠️  Important: Change these default passwords after first login!\n");

    process.exit(0);
  } catch (error) {
    console.error("❌ Error:", error.message);
    process.exit(1);
  }
};

cleanAndSeed();
