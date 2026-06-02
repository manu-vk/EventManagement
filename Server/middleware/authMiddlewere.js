import jwt from "jsonwebtoken";
import User from "../models/userModel.js";

export const protect = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Not authorized",
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = await User.findById(decoded.id).select("-password");

    next();

  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "Invalid token",
    });
  }
};

export const adminOnly = (req, res, next) => {
  if (
    req.user.role !== "admin" &&
    req.user.role !== "superadmin"
  ) {
    return res.status(403).json({
      success: false,
      message: "Admin access required",
    });
  }

  next();
};

export const superAdminOnly = (req, res, next) => {
  if (req.user.role !== "superadmin") {
    return res.status(403).json({
      success: false,
      message: "Super Admin access required",
    });
  }

  next();
};