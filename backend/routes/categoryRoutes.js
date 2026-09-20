import express from "express";
import { createCategory, listCategory } from "../controllers/categoryController.js";
import { authenticate, authorizeAdmin } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.route("/").post(authenticate, authorizeAdmin, createCategory).get(listCategory);

export default router;
