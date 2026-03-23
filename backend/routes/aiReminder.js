import express from "express";
const router = express.Router();

const reminders = [];

router.post("/", (req, res) => {
  const { user, time, message } = req.body;
  reminders.push({ user, time, message });
  // di production bisa simpan ke database + scheduler
  res.json({ message: `Pengingat berhasil diset untuk ${time}` });
});

export default router;
