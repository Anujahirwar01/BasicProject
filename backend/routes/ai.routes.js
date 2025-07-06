// routes/ai.routes.js
import express from "express";
import { generateAIAnswer } from "../controllers/aiController.js";

const router = express.Router();
router.post("/generate", generateAIAnswer);
export default router;
