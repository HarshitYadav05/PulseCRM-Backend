import jwt from "jsonwebtoken";
import User from "../models/User.js";

export const protect = async (req, res, next) => {
  let token;

  try {
    // Check for Bearer token
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];

      // Verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // FIXED: Your token payload uses _id, not id
      const userId = decoded._id;

      if (!userId) {
        console.error("❌ Token decoded but no _id found:", decoded);
        return res
          .status(401)
          .json({ message: "Not authorized, invalid token payload" });
      }

      // Attach user to request
      req.user = await User.findById(userId).select("-password");

      if (!req.user) {
        return res
          .status(401)
          .json({ message: "Not authorized, user not found" });
      }

      // Continue
      return next();
    }

    // No token
    return res.status(401).json({ message: "Not authorized, no token" });
  } catch (error) {
    console.error("❌ Auth Middleware Error:", error.message);
    return res.status(401).json({ message: "Not authorized, token failed" });
  }
};
