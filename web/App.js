import Auth from "./Auth";
import Chat from "./Chat";
import Image from "./Image";
import Music from "./Music";
import Reminder from "./Reminder";
import AdminPanel from "./AdminPanel";
import AIStatus from "./AIStatus";

export default function App() {
  return (
    <div style={{ padding: "20px" }}>
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
