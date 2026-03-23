module.exports = (app, db)=>{
  // Kirim saran update bulanan
  app.post("/api/admin/suggest-update", async (req,res)=>{
    const { adminUsername, suggestion } = req.body;
    await db.collection("monthly_suggestions").insertOne({
      adminUsername,
      suggestion,
      dateSubmitted:new Date(),
      status:"pending"
    });
    res.json({message:"Saran update bulanan berhasil dikirim!"});
  });

  // Lihat saran
  app.get("/api/admin/suggestions", async (req,res)=>{
    const suggestions = await db.collection("monthly_suggestions").find().toArray();
    res.json(suggestions);
  });
};
