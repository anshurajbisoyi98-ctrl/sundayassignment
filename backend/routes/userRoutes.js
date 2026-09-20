import express from "express";
import {
  createUser,
  loginUser,
  logoutCurrentUser,
  getCurrentUserProfile,
  getAllUsers,
  getAgents,
} from "../controllers/userController.js";
import { authenticate, authorizeAdmin } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.route("/").post(createUser).get(authenticate, authorizeAdmin, getAllUsers);
router.post("/auth", loginUser);
router.post("/logout", logoutCurrentUser);

router.route("/profile").get(authenticate, getCurrentUserProfile);
router.route("/agents").get(authenticate, authorizeAdmin, getAgents);

export default router;
