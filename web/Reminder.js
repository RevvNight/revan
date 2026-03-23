import { useState, useEffect } from "react";

export default function Reminder() {
  const [time, setTime] = useState("");
  const [msg, setMsg] = useState("");
  const [alerted, setAlerted] = useState(false);

  useEffect(()=>{
    const interval = setInterval(()=>{
      if(time && !alerted && new Date()>=new Date(time)){
        alert(msg || "Waktunya!");
        setAlerted(true);
      }
    },1000);
    return ()=>clearInterval(interval);
  },[time,msg,alerted]);

  return (
    <div>
      <h2>Reminder</h2>
      <input type="datetime-local" value={time} onChange={e=>setTime(e.target.value)} />
      <input type="text" placeholder="Pesan" value={msg} onChange={e=>setMsg(e.target.value)} />
      <button onClick={()=>setAlerted(false)}>Set Reminder</button>
    </div>
  );
    }
