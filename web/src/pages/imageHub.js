// src/pages/ImageHub.js
import { useState } from "react";
import api from "../api";
import Navbar from "../components/Navbar";

export default function ImageHub() {
  const [prompt, setPrompt] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  const generate = async () => {
    const res = await api.post("/ai/image", { prompt });
    setImageUrl(res.url);
    setPrompt("");
  };

  return (
    <div>
      <Navbar />
      <h2>Generate / Edit Gambar</h2>
      <input value={prompt} onChange={(e) => setPrompt(e.target.value)} placeholder="Deskripsi gambar" />
      <button onClick={generate}>Generate</button>
      {imageUrl && <img src={imageUrl} alt="AI Generated" style={{ maxWidth: "400px" }} />}
    </div>
  );
        }
