import React from "react";
import Chat from "./Chat";
import Image from "./Image";
import Music from "./Music";
import AdminPanel from "./AdminPanel";
import Auth from "./Auth";
import Reminder from "./Reminder";
import AIStatus from "./AIStatus";

export default function App() {
  return (
    <div>
      <h1>Revan Web</h1>
      <Auth />
      <AIStatus />
      <Chat />
      <Image />
      <Music />
      <Reminder />
      <AdminPanel />
    </div>
  );
    }
