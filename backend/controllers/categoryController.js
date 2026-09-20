import Category from "../models/categoryModel.js";
import asyncHandler from "../middlewares/asyncHandler.js";

const createCategory = asyncHandler(async (req, res) => {
  const { name, pointsPerKg } = req.body;

  if (!name || !pointsPerKg) {
    return res.status(400).json({ error: "Name and pointsPerKg are required" });
  }

  const existingCategory = await Category.findOne({ name });
  if (existingCategory) {
    return res.status(400).json({ error: "Category already exists" });
  }

  const category = await new Category({ name, pointsPerKg }).save();
  res.json(category);
});

const listCategory = asyncHandler(async (req, res) => {
  const categories = await Category.find({});
  res.json(categories);
});

export { createCategory, listCategory };
