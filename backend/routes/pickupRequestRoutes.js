import express from "express";
import {
  createRequest,
  getCitizenRequests,
  getAllRequests,
  assignAgent,
  getAgentRequests,
  updateStatus,
  getDashboardStats,
} from "../controllers/pickupRequestController.js";
import { authenticate, authorizeAdmin, authorizeAgent } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.route("/")
  .post(authenticate, createRequest)
  .get(authenticate, authorizeAdmin, getAllRequests);

router.get("/my-requests", authenticate, getCitizenRequests);
router.get("/assigned", authenticate, authorizeAgent, getAgentRequests);
router.get("/stats", authenticate, authorizeAdmin, getDashboardStats);

router.route("/:id/assign")
  .put(authenticate, authorizeAdmin, assignAgent);

router.route("/:id/status")
  .put(authenticate, authorizeAgent, updateStatus);

export default router;
