import { useState, useEffect } from "react";
import axios from "axios";

export default function AdminPanel() {
  const [suggestion, setSuggestion] = useState("");
  const [list, setList] = useState([]);

  const sendSuggestion = async () => {
    await axios.post(`${process.env.REACT_APP_BACKEND}/api/admin/suggest-update`, {
      adminUsername:"Admin",
      suggestion
    });
    setSuggestion("");
    fetchList();
  };

  const fetchList = async () => {
    const res = await axios.get(`${process.env.REACT_APP_BACKEND}/api/admin/suggestions`);
    setList(res.data);
  };

  useEffect(()=>{ fetchList() },[]);

  return (
    <div>
      <h2>Admin Panel</h2>
      <textarea placeholder="Masukkan saran update AI" value={suggestion} onChange={e=>setSuggestion(e.target.value)}></textarea>
      <button onClick={sendSuggestion}>Kirim</button>
      <ul>
        {list.map((s,i)=><li key={i}>{s.dateSubmitted}: {s.suggestion} [{s.status}]</li>)}
      </ul>
    </div>
  );
    }
