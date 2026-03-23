import { useState } from "react";
import axios from "axios";

export default function Chat() {
  const [msg, setMsg] = useState("");
  const [chat, setChat] = useState([]);

  const sendMsg = async () => {
    const res = await axios.post(`${process.env.REACT_APP_BACKEND}/api/ai/chat`, { message: msg });
    setChat([...chat, { user: msg, ai: res.data.reply }]);
    setMsg("");
  };

  return (
    <div>
      <h2>Chat AI</h2>
      <div style={{border:"1px solid gray", padding:"10px", maxHeight:"200px", overflow:"auto"}}>
        {chat.map((c,i)=><div key={i}><b>You:</b> {c.user}<br/><b>AI:</b> {c.ai}</div>)}
      </div>
      <input type="text" value={msg} onChange={e=>setMsg(e.target.value)} placeholder="Tulis pesan..." />
      <button onClick={sendMsg}>Kirim</button>
    </div>
  );
    }
