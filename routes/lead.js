import express from "express";
import Lead from "../models/Lead.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

/* ===============================
 📩 CREATE A NEW LEAD (with debug)
=============================== */
router.post("/", protect, async (req, res) => {
  try {
    console.log("📨 Incoming Lead Data:", req.body);
    console.log("👤 Authenticated User:", req.user);

    const lead = await Lead.create({
      ...req.body,
      createdBy: req.user._id, // must match your model field
    });

    console.log("✅ Lead created successfully:", lead);
    res.status(201).json(lead);
  } catch (error) {
    console.error("❌ Lead Create Error (Detailed):");
    console.error("Error Name:", error.name);
    console.error("Error Message:", error.message);
    console.error("Error Stack:", error.stack);
    res.status(500).json({
      message: "Failed to create lead",
      error: error.message,
    });
  }
});

/* ===============================
 📋 GET ALL LEADS
=============================== */
router.get("/", protect, async (req, res) => {
  try {
    const leads = await Lead.find({ createdBy: req.user._id }).sort({ createdAt: -1 });
    res.status(200).json(leads);
  } catch (error) {
    console.error("❌ Lead Fetch Error:", error);
    res.status(500).json({ message: "Failed to fetch leads", error: error.message });
  }
});

/* ===============================
 ✏️ UPDATE LEAD
=============================== */
router.put("/:id", protect, async (req, res) => {
  try {
    const lead = await Lead.findById(req.params.id);
    if (!lead) return res.status(404).json({ message: "Lead not found" });

    if (lead.createdBy.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: "Not authorized" });
    }

    const updatedLead = await Lead.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json(updatedLead);
  } catch (error) {
    console.error("❌ Lead Update Error:", error);
    res.status(500).json({ message: "Failed to update lead", error: error.message });
  }
});

/* ===============================
 🗑️ DELETE LEAD
=============================== */
router.delete("/:id", protect, async (req, res) => {
  try {
    const lead = await Lead.findById(req.params.id);
    if (!lead) return res.status(404).json({ message: "Lead not found" });

    if (lead.createdBy.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: "Not authorized" });
    }

    await lead.deleteOne();
    res.status(200).json({ message: "Lead deleted successfully" });
  } catch (error) {
    console.error("❌ Lead Delete Error:", error);
    res.status(500).json({ message: "Failed to delete lead", error: error.message });
  }
});

export default router;
