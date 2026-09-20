import RewardWallet from "../models/rewardWalletModel.js";
import asyncHandler from "../middlewares/asyncHandler.js";

const getMyWallet = asyncHandler(async (req, res) => {
  let wallet = await RewardWallet.findOne({ user: req.user._id });
  
  if (!wallet) {
    // If citizen hasn't earned points yet, return an empty wallet representation
    wallet = { balance: 0, history: [] };
  }
  
  res.json(wallet);
});

export { getMyWallet };
