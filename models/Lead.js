import mongoose from "mongoose";

const leadSchema = new mongoose.Schema(
  {
    // ✅ The user who created this lead (linked to logged-in user)
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      trim: true,
      lowercase: true,
    },
    phone: {
      type: String,
      trim: true,
    },
    status: {
      type: String,
      enum: ["New", "Contacted", "Qualified", "Lost", "Converted"],
      default: "New",
    },
    notes: {
      type: String,
      trim: true,
    },
  },
  {
    timestamps: true, // ✅ Automatically adds createdAt & updatedAt
  }
);

export default mongoose.model("Lead", leadSchema);
