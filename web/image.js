import { useState } from "react";
import axios from "axios";

export default function Image() {
  const [prompt, setPrompt] = useState("");
  const [imgUrl, setImgUrl] = useState("");

  const generate = async () => {
    const res = await axios.post(`${process.env.REACT_APP_BACKEND}/api/ai/image`, { prompt });
    setImgUrl(res.data.url);
  };

  const deleteImage = () => setImgUrl("");

  return (
    <div>
      <h2>Generate Image</h2>
      <input type="text" placeholder="Masukkan prompt" value={prompt} onChange={e=>setPrompt(e.target.value)} />
      <button onClick={generate}>Generate</button>
      {imgUrl && <>
        <div><img src={imgUrl} alt="AI" style={{maxWidth:"200px"}}/></div>
        <button onClick={deleteImage}>Hapus Gambar</button>
      </>}
    </div>
  );
    }
