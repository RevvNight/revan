import express from "express";
const router = express.Router();

router.post("/", async (req, res) => {
  const { songLink } = req.body;
  // implementasi play / fetch musik
  res.json({ message: `Musik ${songLink} siap diputar! 🎵` });
});

export default router;
