// src/components/Reminder.js
import { useState } from "react";
import api from "../api";

export default function Reminder() {
  const [time, setTime] = useState("");
  const [note, setNote] = useState("");
  const [status, setStatus] = useState("");

  const setReminder = async () => {
    if(!time || !note) return setStatus("Isi waktu & pesan pengingat!");
    const user = localStorage.getItem("userToken");
    const res = await api.post("/ai/reminder", { user, time, message: note });
    setStatus(res.message);
    setTime("");
    setNote("");
  };

  return (
    <div>
      <h3>Set Reminder / Timer</h3>
      <input type="time" value={time} onChange={(e) => setTime(e.target.value)} />
      <input value={note} onChange={(e) => setNote(e.target.value)} placeholder="Pesan pengingat" />
      <button onClick={setReminder}>Set</button>
      {status && <p>{status}</p>}
    </div>
  );
}
