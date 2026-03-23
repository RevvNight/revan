// src/components/MusicPlayer.js
import { useState } from "react";
import api from "../api";

export default function MusicPlayer() {
  const [song, setSong] = useState("");
  const [message, setMessage] = useState("");

  const play = async () => {
    if(!song) return setMessage("Masukkan link / nama lagu dulu!");
    const res = await api.post("/ai/music", { songLink: song });
    setMessage(res.message);
    setSong("");
  };

  return (
    <div>
      <h3>Play Music</h3>
      <input value={song} onChange={(e) => setSong(e.target.value)} placeholder="Link / nama lagu"/>
      <button onClick={play}>Play</button>
      {message && <p>{message}</p>}
    </div>
  );
}
