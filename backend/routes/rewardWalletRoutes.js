import express from "express";
import { getMyWallet } from "../controllers/rewardWalletController.js";
import { authenticate } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.get("/", authenticate, getMyWallet);

export default router;
