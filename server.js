import express from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import cors from "cors";
import connectDB from "./config/db.js";

// Route imports
import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/user.js";
import leadRoutes from "./routes/lead.js";
import dashboardRoutes from "./routes/dashboard.js";
import customerRoutes from "./routes/customer.js";

dotenv.config();

// Connect DB
connectDB();

const app = express();

// ---- FIXED: Body Parsers ----
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ---- FIXED: CORS Configuration ----
app.use(
  cors({
    origin: "*", // allow all for now
    credentials: true,
  })
);

// Logging
app.use(morgan("dev"));

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/leads", leadRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/customers", customerRoutes);

// Root
app.get("/", (req, res) => {
  res.send("✅ API is running...");
});

// Global Error Handler
app.use((err, req, res, next) => {
  console.error("❌ Global Error:", err.stack);
  res.status(500).json({
    message: "Something broke!",
    error: err.message,
  });
});

// Start Server
const PORT = process.env.PORT || 5000;

app.listen(PORT, "0.0.0.0", () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
