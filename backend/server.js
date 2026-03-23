import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";

import { runMonthlyUpdate } from "./updater.js";
import { User, ChatLog, AILevel } from "./models.js";

import authRoutes from "./auth.js";
import chatRoutes from "./chat.js";
import imageRoutes from "./image.js";
import musicRoutes from "./music.js";
import reminderRoutes from "./reminder.js";
import adminRoutes from "./admin.js";

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

// Connect MongoDB
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(()=>console.log("MongoDB Connected"))
  .catch(err=>console.log(err));

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/chat", chatRoutes);
app.use("/api/image", imageRoutes);
app.use("/api/music", musicRoutes);
app.use("/api/reminder", reminderRoutes);
app.use("/api/admin", adminRoutes);

// AI Level endpoint
app.get("/api/ai/level", async (req,res)=>{
  let level = await AILevel.findOne();
  if(!level) level = new AILevel();
  res.json(level);
});

// Run monthly update immediately for testing
runMonthlyUpdate();

const PORT = process.env.PORT || 5000;
app.listen(PORT, ()=>console.log("Backend running on port", PORT));
