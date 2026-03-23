const { ObjectId } = require("mongodb");

module.exports = (app, transporter, otpStorage, db) => {
  
  // Kirim OTP
  app.post("/api/auth/send-otp", async (req,res)=>{
    const { email } = req.body;
    const otp = Math.floor(100000 + Math.random()*900000).toString();
    otpStorage[email]={code:otp,expires:Date.now()+300000};
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Revan OTP Code",
      text: `Kode OTP Anda: ${otp}`
    });
    res.json({message:"OTP terkirim!"});
  });

  // Verifikasi OTP
  app.post("/api/auth/verify-otp", async (req,res)=>{
    const { email, otp } = req.body;
    const record = otpStorage[email];
    if(!record) return res.status(400).json({message:"Belum request OTP"});
    if(record.expires<Date.now()) return res.status(400).json({message:"OTP expired"});
    if(record.code!==otp) return res.status(400).json({message:"OTP salah"});
    delete otpStorage[email];
    res.json({message:"OTP berhasil diverifikasi!"});
  });

  // Reset password
  app.post("/api/auth/reset-password", async (req,res)=>{
    const { email, newPassword } = req.body;
    await db.collection("users").updateOne({email},{$set:{passwordHash:newPassword}});
    res.json({message:"Password berhasil direset!"});
  });
};
