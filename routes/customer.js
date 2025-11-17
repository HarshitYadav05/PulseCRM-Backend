import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import Customer from "../models/Customer.js";

const router = express.Router();

// ✅ Get all customers
router.get("/", protect, async (req, res) => {
  try {
    const customers = await Customer.find({ user: req.user._id }).sort({ createdAt: -1 });
    res.json(customers);
  } catch (error) {
    console.error("❌ Error fetching customers:", error);
    res.status(500).json({ message: "Server Error" });
  }
});

// ✅ Add a new customer
router.post("/", protect, async (req, res) => {
  const { name, email, phone, address } = req.body;

  try {
    const newCustomer = new Customer({
      user: req.user._id,
      name,
      email,
      phone,
      address,
    });

    const createdCustomer = await newCustomer.save();
    res.status(201).json(createdCustomer);
  } catch (error) {
    console.error("❌ Error adding customer:", error);
    res.status(500).json({ message: "Failed to add customer" });
  }
});

// ✅ Update a customer
router.put("/:id", protect, async (req, res) => {
  try {
    const customer = await Customer.findById(req.params.id);

    if (!customer) return res.status(404).json({ message: "Customer not found" });
    if (customer.user.toString() !== req.user._id.toString())
      return res.status(403).json({ message: "Not authorized" });

    customer.name = req.body.name || customer.name;
    customer.email = req.body.email || customer.email;
    customer.phone = req.body.phone || customer.phone;
    customer.address = req.body.address || customer.address;

    const updatedCustomer = await customer.save();
    res.json(updatedCustomer);
  } catch (error) {
    console.error("❌ Error updating customer:", error);
    res.status(500).json({ message: "Failed to update customer" });
  }
});

// ✅ Delete a customer
router.delete("/:id", protect, async (req, res) => {
  try {
    const customer = await Customer.findById(req.params.id);

    if (!customer) return res.status(404).json({ message: "Customer not found" });
    if (customer.user.toString() !== req.user._id.toString())
      return res.status(403).json({ message: "Not authorized" });

    await customer.deleteOne();
    res.json({ message: "Customer deleted" });
  } catch (error) {
    console.error("❌ Error deleting customer:", error);
    res.status(500).json({ message: "Failed to delete customer" });
  }
});

export default router;
