import express from "express";
import { chat, extractExpense } from "../controllers/ai.controller.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.use(protect);
router.get("/test", (_req, res) => res.json({ success: true, message: "AI Route Working" }));
router.post("/chat", chat);
router.post("/extract-expense", extractExpense);

export default router;
