import mongoose from "mongoose";

const usersSchema = mongoose.Schema(
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

const Users = mongoose.model("Users", usersSchema);

export default Users;