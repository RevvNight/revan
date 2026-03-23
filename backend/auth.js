import express from "express";
import { User } from "./models.js";
import nodemailer from "nodemailer";

const router = express.Router();

// Create transporter Gmail
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

// Send OTP
router.post("/send-otp", async (req,res)=>{
  const { email } = req.body;
  const otp = Math.floor(100000 + Math.random() * 900000);

  // Save OTP temporarily (simplified)
  await User.updateOne({ email }, { $set: { otp } });

  await transporter.sendMail({
    from: process.env.EMAIL_USER,
    to: email,
    subject: "Your Revan OTP",
    text: `Your OTP code is ${otp}`
  });

  res.json({ success:true });
});

export default router;
