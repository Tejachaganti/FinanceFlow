import express from "express";
import {
  forgotPassword,
  getCurrentUser,
  loginUser,
  registerUser,
  resetPassword,
  changePassword,
  deleteAccount,
} from "../controllers/authController.js";
import { protect } from "../middleware/authMiddleware.js";
import { changePassword } from "../controllers/authController.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/forgot-password", forgotPassword);
router.post("/reset-password/:token", resetPassword);
router.get("/me", protect, getCurrentUser);
router.put(
    "/change-password",
    protect,
    changePassword
);
router.delete("/delete-account", protect, deleteAccount);
export default router;
