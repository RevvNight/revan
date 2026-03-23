import express from "express";
import nodemailer from "nodemailer";

const router = express.Router();
const otpStore = {}; // simpan sementara OTP per email

// Kirim OTP
router.post("/send-otp", async (req, res) => {
  const { email } = req.body;
  const otp = Math.floor(100000 + Math.random() * 900000);
  otpStore[email] = otp;

  // kirim email (simple nodemailer)
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    }
  });

  await transporter.sendMail({
    from: process.env.EMAIL_USER,
    to: email,
    subject: "OTP Login Revan",
    text: `OTP kamu: ${otp}`
  });

  res.json({ message: "OTP terkirim" });
});

// Verifikasi OTP
router.post("/verify-otp", (req, res) => {
  const { email, otp } = req.body;
  if (otpStore[email] && parseInt(otp) === otpStore[email]) {
    delete otpStore[email];
    res.json({ message: "OTP berhasil diverifikasi!" });
  } else {
    res.status(400).json({ message: "OTP salah" });
  }
});

export default router;
