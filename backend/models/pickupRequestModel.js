import mongoose from "mongoose";

const pickupRequestSchema = new mongoose.Schema(
  {
    citizen: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    agent: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    itemType: { type: mongoose.Schema.Types.ObjectId, ref: "Category", required: true },
    quantity: { type: Number, required: true, default: 1 },
    approxWeight: { type: Number, required: true },
    address: { type: String, required: true },
    preferredDate: { type: Date, required: true },
    status: {
      type: String,
      required: true,
      default: "REQUESTED",
      enum: ["REQUESTED", "SCHEDULED", "COLLECTED", "RECYCLED"],
    },
    rewardPoints: { type: Number, default: 0 },
  },
  { timestamps: true }
);

const PickupRequest = mongoose.model("PickupRequest", pickupRequestSchema);
export default PickupRequest;
