import express from "express";
import { registerUser,getUsers,getAllUsers,loginUser,deleteUser } from "../controllers/authController.js";
import { protect, superAdminOnly } from "../middleware/authMiddlewere.js";


const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/", getUsers);
router.get("/all-users",protect,superAdminOnly,getAllUsers);
router.delete("/user/:id", protect, superAdminOnly, deleteUser);

export default router;