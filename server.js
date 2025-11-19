import express from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import cors from "cors";
import connectDB from "./config/db.js";

// ✅ Route imports
import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/user.js";
import leadRoutes from "./routes/lead.js";
import dashboardRoutes from "./routes/dashboard.js";
import customerRoutes from "./routes/customer.js";

dotenv.config();

// ✅ Connect Database
connectDB();

const app = express();

// ✅ Middleware
app.use(
  cors({
    origin: [
      "http://localhost:3000",                // Local frontend
      "https://your-frontend-domain.com",     // Replace after deploying frontend
    ],
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
app.use("/api/customers", customerRoutes);

// ✅ Root Route
app.get("/", (req, res) => {
  res.send("✅ API is running...");
});

// ✅ Global Error Handler
app.use((err, req, res, next) => {
  console.error("❌ Global Error:", err.stack);
  res.status(500).json({
    message: "Something broke!",
    error: err.message,
  });
});

// ✅ Start Server (IMPORTANT for Render)
const PORT = process.env.PORT || 5000;

app.listen(PORT, "0.0.0.0", () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
