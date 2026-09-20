import mongoose from "mongoose";

const rewardWalletSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true, unique: true },
    balance: { type: Number, required: true, default: 0 },
    history: [
      {
        points: { type: Number, required: true },
        type: { type: String, required: true, enum: ["EARNED", "REDEEMED"] },
        description: { type: String, required: true },
        date: { type: Date, default: Date.now },
      },
    ],
  },
  { timestamps: true }
);

const RewardWallet = mongoose.model("RewardWallet", rewardWalletSchema);
export default RewardWallet;
