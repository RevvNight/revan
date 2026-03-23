import { useEffect, useState } from "react";
import axios from "axios";

export default function AIStatus() {
  const [level,setLevel]=useState({ speed:1,intelligence:1,endurance:1 });

  useEffect(()=>{
    async function fetchLevel() {
      const res = await axios.get(`${process.env.REACT_APP_BACKEND}/api/ai/level`);
      setLevel(res.data);
    }
    fetchLevel();
  },[]);

  return (
    <div>
      <h2>Revan AI Level</h2>
      <p>Speed: {level.speed}</p>
      <p>Intelligence: {level.intelligence}</p>
      <p>Endurance: {level.endurance}</p>
    </div>
  )
}
