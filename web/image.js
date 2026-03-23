import { useState } from "react";
import axios from "axios";

export default function Image() {
  const [prompt, setPrompt] = useState("");
  const [imgUrl, setImgUrl] = useState("");

  async function generateImage() {
    const res = await axios.post(`${process.env.REACT_APP_BACKEND}/api/image/generate`, { prompt });
    setImgUrl(res.data.url);

    // Hapus gambar setelah tampil
    setTimeout(async ()=>{
      await axios.post(`${process.env.REACT_APP_BACKEND}/api/image/delete`, { url: res.data.url });
      setImgUrl("");
    }, 5000);
  }

  return (
    <div>
      <h2>Generate Image</h2>
      <input value={prompt} onChange={e=>setPrompt(e.target.value)} />
      <button onClick={generateImage}>Generate</button>
      {imgUrl && <img src={imgUrl} alt="Revan AI" />}
    </div>
  )
    }
