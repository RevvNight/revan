// src/pages/ReminderHub.js
import { useState } from "react";
import api from "../api";
import Navbar from "../components/Navbar";

export default function ReminderHub() {
  const [time, setTime] = useState("");
  const [note, setNote] = useState("");
  const [status, setStatus] = useState("");

  const setReminder = async () => {
    const user = localStorage.getItem("userToken");
    const res = await api.post("/ai/reminder", { user, time, message: note });
    setStatus(res.message);
    setTime("");
    setNote("");
  };

  return (
    <div>
      <Navbar />
      <h2>Set Reminder / Timer</h2>
      <input type="time" value={time} onChange={(e) => setTime(e.target.value)} />
      <input value={note} onChange={(e) => setNote(e.target.value)} placeholder="Pesan pengingat" />
      <button onClick={setReminder}>Set</button>
      {status && <p>{status}</p>}
    </div>
  );
}
