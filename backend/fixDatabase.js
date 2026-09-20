import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const fixDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected to MongoDB 👍\n");

    const db = mongoose.connection.db;
    const usersCollection = db.collection('users');

    // List all indexes
    console.log("Current indexes:");
    const indexes = await usersCollection.indexes();
    indexes.forEach(idx => {
      console.log(`  - ${idx.name}:`, JSON.stringify(idx.key));
    });

    // Drop the problematic firebaseUid index if it exists
    try {
      await usersCollection.dropIndex('firebaseUid_1');
      console.log("\n✅ Dropped firebaseUid_1 index successfully!");
    } catch (err) {
      if (err.code === 27) {
        console.log("\n⚠️  firebaseUid_1 index doesn't exist (already dropped or never existed)");
      } else {
        throw err;
      }
    }

    console.log("\n📊 Database fixed! You can now run cleanAndSeed.js\n");

    process.exit(0);
  } catch (error) {
    console.error("❌ Error:", error.message);
    process.exit(1);
  }
};

fixDatabase();
