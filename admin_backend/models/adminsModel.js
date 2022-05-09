import mongoose from "mongoose";

const adminsSchema = mongoose.Schema(
  {
    walletAddress: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Admins = mongoose.model("Admins", adminsSchema);

export default Admins;