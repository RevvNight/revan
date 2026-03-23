module.exports = (app, db) => {
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

  app.get("/api/admin/suggestions", async (req,res)=>{
    const suggestions = await db.collection("monthly_suggestions").find().toArray();
    res.json(suggestions);
  });

  app.get("/api/admin/ai-status", async (req,res)=>{
    const status = await db.collection("ai_status").findOne({});
    res.json(status || {knowledgeLevel:0, speedLevel:0, stability:0});
  });
};
