// src/components/Navbar.js
import { Link } from "react-router-dom";

export default function Navbar() {
  const logout = () => {
    localStorage.removeItem("userToken");
    window.location.href = "/login-hub";
  };

  return (
    <nav style={{ display: "flex", justifyContent: "space-between", padding: "10px", borderBottom: "1px solid #ccc" }}>
      <div>
        <Link to="/chat-hub">Chat</Link> | 
        <Link to="/image-hub">Gambar</Link> | 
        <Link to="/music-hub">Musik</Link> | 
        <Link to="/reminder-hub">Reminder</Link>
      </div>
      <button onClick={logout}>Logout</button>
    </nav>
  );
}
