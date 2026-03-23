import cron from "node-cron";
import { AILevel } from "./models.js";

export async function runMonthlyUpdate() {
  let level = await AILevel.findOne();
  if(!level) level = new AILevel();

  level.speed += 0.2;
  level.intelligence += 0.3;
  level.endurance += 0.2;
  level.lastUpdate = new Date();

  await level.save();
  console.log("Revan AI updated:", level);
}

// Cron job tiap tanggal 1 jam 00:00
cron.schedule("0 0 1 * *", () => {
  console.log("Running monthly update...");
  runMonthlyUpdate();
});
