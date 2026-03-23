import { useState, useEffect } from "react";
import axios from "axios";

export default function Chat() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  // Typing effect pattern
  const typingPattern = [".> ", " .> ", "  .> ", "   .> "];

  async function sendMessage() {
    setMessages(prev => [...prev, { from: "You", text: input }]);
    setInput("");

    const res = await axios.post(`${process.env.REACT_APP_BACKEND}/api/chat/send`, {
      message: input
    });

    let aiText = res.data.reply;
    let display = "";
    for (let i=0; i<aiText.length; i++){
      display += aiText[i];
      setMessages(prev => [...prev.slice(0,-1), { from:"Revan", text: display + typingPattern[i%4] }]);
      await new Promise(r=>setTimeout(r,50));
    }
  }

  useEffect(()=>{
    async function fetchHistory(){
      const res = await axios.get(`${process.env.REACT_APP_BACKEND}/api/chat/history`);
      setMessages(res.data);
    }
    fetchHistory();
  }, []);

  return (
    <div>
      <h2>Chat with Revan</h2>
      <div>
        {messages.map((m,i)=><div key={i}><b>{m.from}:</b> {m.text}</div>)}
      </div>
      <input value={input} onChange={e=>setInput(e.target.value)} />
      <button onClick={sendMessage}>Send</button>
    </div>
  )
}
