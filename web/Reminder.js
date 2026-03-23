import { useState } from "react";
import axios from "axios";

export default function Reminder() {
  const [message,setMessage]=useState("");
  const [time,setTime]=useState("");

  async function setReminder() {
    await axios.post(`${process.env.REACT_APP_BACKEND}/api/reminder/set`, {
      message, remindAt: time
    });
    alert("Reminder set!");
  }

  return (
    <div>
      <h2>Reminder / Timer</h2>
      <input placeholder="Message" value={message} onChange={e=>setMessage(e.target.value)} />
      <input placeholder="Time (YYYY-MM-DD HH:mm)" value={time} onChange={e=>setTime(e.target.value)} />
      <button onClick={setReminder}>Set</button>
    </div>
  )
                                          }
