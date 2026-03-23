import { useState } from "react";
import api from "../api";
import ChatBox from "../components/ChatBox";

export default function ChatHub() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  const sendMessage = async () => {
    const user = localStorage.getItem("userToken");
    const res = await api.post("/ai/chat", { user, message: input });
    setMessages([...messages, { user, message: input, reply: res.reply }]);
    setInput("");
  };

  return (
    <div>
      <h2>Chat dengan Revan</h2>
      <ChatBox messages={messages}/>
      <input value={input} onChange={e=>setInput(e.target.value)} />
      <button onClick={sendMessage}>Kirim</button>
    </div>
  );
                                            }
