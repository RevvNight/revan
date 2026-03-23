import { useState, useEffect } from "react";
import axios from "axios";

export default function Chat({ username }) {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  async function sendMessage() {
    const res = await axios.post(`${process.env.REACT_APP_BACKEND}/api/chat/send`, {
      username, message: input
    });
    setMessages(res.data);
    setInput("");
  }

  useEffect(()=>{
    async function fetchMessages(){
      const res = await axios.get(`${process.env.REACT_APP_BACKEND}/api/chat/history?username=${username}`);
      setMessages(res.data);
    }
    fetchMessages();
  },[]);

  return (
    <div>
      {messages.map((m,i)=><div key={i}>{m.from}: {m.text}</div>)}
      <input value={input} onChange={e=>setInput(e.target.value)}/>
      <button onClick={sendMessage}>Send</button>
    </div>
  )
  }
