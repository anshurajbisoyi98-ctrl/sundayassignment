import PickupRequest from "../models/pickupRequestModel.js";
import Category from "../models/categoryModel.js";
import RewardWallet from "../models/rewardWalletModel.js";
import asyncHandler from "../middlewares/asyncHandler.js";

const createRequest = asyncHandler(async (req, res) => {
  const { itemType, quantity, approxWeight, address, preferredDate } = req.body;

  if (!itemType || !quantity || !approxWeight || !address || !preferredDate) {
    res.status(400);
    throw new Error("Please provide all required fields");
  }

  const request = new PickupRequest({
    citizen: req.user._id,
    itemType,
    quantity,
    approxWeight,
    address,
    preferredDate,
  });

  const createdRequest = await request.save();
  res.status(201).json(createdRequest);
});

const getCitizenRequests = asyncHandler(async (req, res) => {
  const requests = await PickupRequest.find({ citizen: req.user._id }).populate("itemType");
  res.json(requests);
});

const getAllRequests = asyncHandler(async (req, res) => {
  const requests = await PickupRequest.find({}).populate("citizen itemType agent");
  res.json(requests);
});

const assignAgent = asyncHandler(async (req, res) => {
  const { agentId } = req.body;
  const request = await PickupRequest.findById(req.params.id);

  if (request) {
    request.agent = agentId;
    request.status = "SCHEDULED";
    const updatedRequest = await request.save();
    res.json(updatedRequest);
  } else {
    res.status(404);
    throw new Error("Request not found");
  }
});

const getAgentRequests = asyncHandler(async (req, res) => {
  const requests = await PickupRequest.find({ agent: req.user._id }).populate("citizen itemType");
  res.json(requests);
});

const updateStatus = asyncHandler(async (req, res) => {
  const { status, finalWeight } = req.body;
  const request = await PickupRequest.findById(req.params.id).populate("itemType citizen");

  if (!request) {
    res.status(404);
    throw new Error("Request not found");
  }

  request.status = status;

  if (status === "RECYCLED") {
    // Calculate rewards
    const weight = finalWeight || request.approxWeight;
    const points = Math.floor(weight * request.itemType.pointsPerKg);
    request.rewardPoints = points;
    
    // Add to citizen wallet
    let wallet = await RewardWallet.findOne({ user: request.citizen._id });
    if (!wallet) {
      wallet = new RewardWallet({ user: request.citizen._id, balance: 0 });
    }
    wallet.balance += points;
    wallet.history.push({
      points,
      type: "EARNED",
      description: `Reward for recycling ${request.itemType.name}`,
    });
    await wallet.save();
  }

  const updatedRequest = await request.save();
  res.json(updatedRequest);
});

const getDashboardStats = asyncHandler(async (req, res) => {
  const totalRequests = await PickupRequest.countDocuments();
  const totalWeightResult = await PickupRequest.aggregate([
    { $group: { _id: null, totalWeight: { $sum: "$approxWeight" } } }
  ]);
  const totalWeight = totalWeightResult.length > 0 ? totalWeightResult[0].totalWeight : 0;

  // Category-wise breakdown
  const categoryStats = await PickupRequest.aggregate([
    { $group: { _id: "$itemType", count: { $sum: 1 }, weight: { $sum: "$approxWeight" } } },
    { $lookup: { from: "categories", localField: "_id", foreignField: "_id", as: "category" } },
    { $unwind: "$category" },
    { $project: { name: "$category.name", count: 1, weight: 1 } }
  ]);

  // Status breakdown
  const statusStats = await PickupRequest.aggregate([
    { $group: { _id: "$status", count: { $sum: 1 } } }
  ]);

  res.json({
    totalRequests,
    totalWeight,
    categoryStats,
    statusStats,
  });
});

export { 
  createRequest, 
  getCitizenRequests, 
  getAllRequests, 
  assignAgent, 
  getAgentRequests, 
  updateStatus,
  getDashboardStats
};
