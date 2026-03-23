import { useState } from "react";
import axios from "axios";

export default function Music() {
  const [song, setSong] = useState("");
  const [url, setUrl] = useState("");

  async function playSong() {
    const res = await axios.post(`${process.env.REACT_APP_BACKEND}/api/music/play`, { song });
    setUrl(res.data.url);
  }

  return (
    <div>
      <h2>Play Music</h2>
      <input value={song} onChange={e=>setSong(e.target.value)} />
      <button onClick={playSong}>Play</button>
      {url && <audio controls src={url} autoPlay />}
    </div>
  )
    }
