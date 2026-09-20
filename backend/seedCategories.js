import mongoose from "mongoose";
import dotenv from "dotenv";
import Category from "./models/categoryModel.js";

dotenv.config();

const categories = [
  {
    name: "Laptops & Computers",
    pointsPerKg: 50,
  },
  {
    name: "Mobile Phones & Tablets",
    pointsPerKg: 60,
  },
  {
    name: "Televisions & Monitors",
    pointsPerKg: 30,
  },
  {
    name: "Batteries",
    pointsPerKg: 40,
  },
  {
    name: "Cables & Chargers",
    pointsPerKg: 20,
  },
  {
    name: "Printers & Scanners",
    pointsPerKg: 35,
  },
  {
    name: "Home Appliances",
    pointsPerKg: 25,
  },
  {
    name: "Electronic Accessories",
    pointsPerKg: 15,
  },
];

const seedCategories = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected to MongoDB 👍");

    // Clear existing categories
    await Category.deleteMany({});
    console.log("Cleared existing categories");

    // Insert new categories
    const insertedCategories = await Category.insertMany(categories);
    console.log(`✅ Successfully seeded ${insertedCategories.length} categories:`);
    insertedCategories.forEach((cat) => {
      console.log(`   - ${cat.name} (${cat.pointsPerKg} points/kg)`);
    });

    process.exit(0);
  } catch (error) {
    console.error("❌ Error seeding categories:", error);
    process.exit(1);
  }
};

seedCategories();
