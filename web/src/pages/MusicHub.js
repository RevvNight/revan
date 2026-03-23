// src/pages/MusicHub.js
import { useState } from "react";
import api from "../api";
import Navbar from "../components/Navbar";

export default function MusicHub() {
  const [song, setSong] = useState("");
  const [message, setMessage] = useState("");

  const play = async () => {
    const res = await api.post("/ai/music", { songLink: song });
    setMessage(res.message);
    setSong("");
  };

  return (
    <div>
      <Navbar />
      <h2>Play Music</h2>
      <input value={song} onChange={(e) => setSong(e.target.value)} placeholder="Link atau nama lagu" />
      <button onClick={play}>Play</button>
      {message && <p>{message}</p>}
    </div>
  );
    }
