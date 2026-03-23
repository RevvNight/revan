import { useState } from "react";
import api from "../api";

export default function ImageGenerator() {
  const [prompt, setPrompt] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [status, setStatus] = useState("");

  // Generate gambar baru
  const generate = async () => {
    if(!prompt) return setStatus("Masukkan deskripsi gambar dulu!");
    setStatus("Membuat gambar...");
    try {
      const res = await api.post("/ai/image", { prompt });
      setImageUrl(res.url);
      setPrompt("");
      setStatus("Gambar siap! ⚡");

      // Auto-delete dari storage setelah 1 menit
      setTimeout(async () => {
        await api.post("/ai/image-delete", { url: res.url });
        setImageUrl(""); // hapus dari state juga
        setStatus("Gambar dihapus dari storage 🗑️");
      }, 60*1000);
    } catch (e) {
      setStatus("Gagal membuat gambar ❌");
    }
  };

  // Edit gambar
  const editImage = async (newPrompt) => {
    if(!imageUrl) return setStatus("Belum ada gambar untuk di-edit!");
    setStatus("Mengedit gambar...");
    try {
      const res = await api.post("/ai/image-edit", { url: imageUrl, prompt: newPrompt });
      setImageUrl(res.url);
      setStatus("Gambar berhasil diedit! 🎨");
    } catch (e) {
      setStatus("Gagal mengedit gambar ❌");
    }
  };

  return (
    <div>
      <h3>Generate / Edit Gambar</h3>
      <input
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        placeholder="Masukkan deskripsi / prompt"
      />
      <button onClick={generate}>Generate</button>
      
      {imageUrl && (
        <div>
          <img src={imageUrl} alt="AI Generated" style={{ maxWidth: "400px", marginTop:"10px" }} />
          <br />
          <input
            placeholder="Deskripsi untuk edit gambar"
            onKeyDown={(e) => e.key === "Enter" && editImage(e.target.value)}
          />
          <p>Tekan Enter untuk edit gambar</p>
        </div>
      )}
      {status && <p>{status}</p>}
    </div>
  );
}
