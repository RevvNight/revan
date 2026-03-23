import { useState, useEffect } from "react";
import axios from "axios";

export default function AIStatus() {
  const [status,setStatus] = useState({knowledgeLevel:0,speedLevel:0,stability:0});

  const fetchStatus = async () => {
    const res = await axios.get(`${process.env.REACT_APP_BACKEND}/api/admin/ai-status`);
    setStatus(res.data);
  };

  useEffect(()=>{ fetchStatus() },[]);

  return (
    <div>
      <h2>Status AI</h2>
      <p>Knowledge Level: {status.knowledgeLevel}</p>
      <p>Speed Level: {status.speedLevel}</p>
      <p>Stability: {status.stability}</p>
    </div>
  );
    }
