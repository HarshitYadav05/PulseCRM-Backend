import express from "express";
import { registerUser, authUser } from "../controllers/authController.js";

const router = express.Router();

// Routes for authentication
router.post("/signup", registerUser);
router.post("/login", authUser);

export default router;

