// routes/ai.routes.js
import express from "express";
import * as aiController from "../controller/ai.controller.js";

const router = express.Router();
router.get("/test", (req, res) => res.send("✅ AI route is working."));
router.post("/generate", aiController.generateAIAnswer);
export default router;
