import { useState } from "react";

export default function Music() {
  const [url, setUrl] = useState("");

  return (
    <div>
      <h2>Play Music</h2>
      <input type="text" placeholder="Link lagu" value={url} onChange={e=>setUrl(e.target.value)} />
      {url && <audio controls src={url}></audio>}
    </div>
  );
      }
