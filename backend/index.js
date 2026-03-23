// backend/index.js
import express from "express";
import cors from "cors";
import dotenv from "dotenv";

// Routes
import authRoutes from "./routes/auth.js";
import chatRoutes from "./routes/aiChat.js";
import imageRoutes from "./routes/aiImage.js";
import musicRoutes from "./routes/aiMusic.js";
import reminderRoutes from "./routes/aiReminder.js";

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/ai/chat", chatRoutes);
app.use("/api/ai/image", imageRoutes);
app.use("/api/ai/music", musicRoutes);
app.use("/api/ai/reminder", reminderRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Backend Revan running on port ${PORT}`));
