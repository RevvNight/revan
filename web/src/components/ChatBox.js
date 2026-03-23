// src/components/ChatBox.js
export default function ChatBox({ messages }) {
  return (
    <div style={{ border: "1px solid #ccc", padding: "10px", height: "400px", overflowY: "scroll" }}>
      {messages.map((m, i) => (
        <div key={i} style={{ marginBottom: "10px" }}>
          <b>{m.user}:</b> {m.message} <br />
          <i>Revan:</i> {m.reply}
        </div>
      ))}
    </div>
  );
}
