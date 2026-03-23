import { useEffect, useState } from "react";
import axios from "axios";

export default function AdminPanel() {
  const [users, setUsers] = useState([]);
  const [chats, setChats] = useState([]);

  async function fetchUsers() {
    const res = await axios.get(`${process.env.REACT_APP_BACKEND}/api/admin/users`);
    setUsers(res.data);
  }

  async function fetchChats() {
    const res = await axios.get(`${process.env.REACT_APP_BACKEND}/api/admin/chats`);
    setChats(res.data);
  }

  useEffect(()=>{
    fetchUsers();
    fetchChats();
  }, []);

  return (
    <div>
      <h2>Admin Panel</h2>
      <button onClick={fetchUsers}>Cek akun client</button>
      <button onClick={fetchChats}>Cek chat client</button>

      <h3>Users</h3>
      {users.map((u,i)=><div key={i}>{u.username} | {u.email}</div>)}

      <h3>Chats</h3>
      {chats.map((c,i)=><div key={i}>{c.userId}: {c.messages.map(m=>m.text).join(", ")}</div>)}
    </div>
  )
    }
