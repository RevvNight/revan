import express from "express";
import { sendMessageToAI } from "../utils/aiClient.js";
const router = express.Router();

router.post("/", async (req, res) => {
  const { user, message } = req.body;
  try {
    const reply = await sendMessageToAI(user, message);
    res.json({ reply });
  } catch (e) {
    res.status(500).json({ reply: "Revan gagal membalas 😓" });
  }
});

export default router;
