import mongoose from "mongoose";

// User
export const UserSchema = new mongoose.Schema({
  username: String,
  email: String,
  password: String,
  phone: String,
  role: { type: String, default: "client" } // client / owner
});

// Chat Logs
export const ChatLogSchema = new mongoose.Schema({
  userId: String,
  messages: [{ from: String, text: String, time: Date }]
});

// Images
export const ImageSchema = new mongoose.Schema({
  userId: String,
  imageUrl: String,
  createdAt: { type: Date, default: Date.now }
});

// Reminder
export const ReminderSchema = new mongoose.Schema({
  userId: String,
  message: String,
  remindAt: Date
});

// AI Level
export const AILevelSchema = new mongoose.Schema({
  speed: { type: Number, default: 1 },
  intelligence: { type: Number, default: 1 },
  endurance: { type: Number, default: 1 },
  lastUpdate: { type: Date, default: Date.now }
});

export const User = mongoose.model("User", UserSchema);
export const ChatLog = mongoose.model("ChatLog", ChatLogSchema);
export const Image = mongoose.model("Image", ImageSchema);
export const Reminder = mongoose.model("Reminder", ReminderSchema);
export const AILevel = mongoose.model("AILevel", AILevelSchema);
