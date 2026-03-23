require('dotenv').config();
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const nodemailer = require("nodemailer");
const cron = require("node-cron");
const { MongoClient } = require("mongodb");

const app = express();
app.use(cors());
app.use(bodyParser.json());

// MongoDB
const client = new MongoClient(process.env.MONGO_URI);
let db;
client.connect().then(() => { db = client.db("revanDB"); console.log("MongoDB connected"); });

// Nodemailer setup
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

// OTP temporary storage
let otpStorage = {};

// Routes
const authRoutes = require("./routes/auth")(app, transporter, otpStorage, db);
const adminRoutes = require("./routes/admin")(app, db);

// Cron job – update AI setiap tanggal 1
cron.schedule("0 0 1 * *", async () => {
  const pending = await db.collection("monthly_suggestions").find({status:"pending"}).toArray();
  for(const s of pending){
    await db.collection("ai_status").updateOne({}, {$inc:{knowledgeLevel:1,speedLevel:1,stability:1}});
    await db.collection("monthly_suggestions").updateOne({_id:s._id},{$set:{status:"applied"}});
  }
  console.log("Monthly AI update applied.");
});

app.listen(process.env.PORT, () => console.log(`Server running on port ${process.env.PORT}`));
