import express from "express";
import { generateImage, editImage, deleteImage } from "../utils/storage.js";
const router = express.Router();

// Generate gambar
router.post("/", async (req, res) => {
  const { prompt } = req.body;
  const url = await generateImage(prompt);
  res.json({ url });
});

// Edit gambar
router.post("/edit", async (req, res) => {
  const { url, prompt } = req.body;
  const newUrl = await editImage(url, prompt);
  res.json({ url: newUrl });
});

// Delete gambar
router.post("/image-delete", async (req, res) => {
  const { url } = req.body;
  await deleteImage(url);
  res.json({ message: "Gambar berhasil dihapus" });
});

export default router;
