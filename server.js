import express from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import cors from "cors";
import connectDB from "./config/db.js";

// ✅ Route imports (filenames confirmed)
import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/user.js";
import leadRoutes from "./routes/lead.js";
import dashboardRoutes from "./routes/dashboard.js";
import customerRoutes from "./routes/customer.js"; // ✅ newly added

dotenv.config();

// ✅ Connect to MongoDB before starting the server
connectDB();

const app = express();

// ✅ Middleware
app.use(
  cors({
    origin: "http://localhost:3000", // Allow React frontend
    credentials: true,
  })
);
app.use(express.json());
app.use(morgan("dev"));

// ✅ API Routes
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/leads", leadRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/customers", customerRoutes); // ✅ added route

// ✅ Root route
app.get("/", (req, res) => {
  res.send("✅ API is running...");
});

// ✅ Global error handler
app.use((err, req, res, next) => {
  console.error("❌ Global Error:", err.stack);
  res.status(500).json({
    message: "Something broke!",
    error: err.message,
  });
});

// ✅ Start Server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(
    `🚀 Server running in ${process.env.NODE_ENV || "development"} mode on port ${PORT}`
  );
});
