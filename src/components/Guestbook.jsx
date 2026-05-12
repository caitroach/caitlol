import { useState, useEffect } from "react";
import "./Guestbook.css";

// ── SETUP ────────────────────────────────────────────────
// 1. Create a Google Sheet with columns: timestamp, name, message
// 2. Extensions → Apps Script → paste the backend script (see README)
// 3. Deploy as Web App → copy the URL here
const APPS_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbz2DMG4FtIoiDZWKRtDLuQL6ZdObntQdttW9NcsuxLF0WMobNG7AiiZik2lcGVBhHoi/exec";

// Fallback messages shown before real data loads
const SEED_MESSAGES = [
  { name: "pixelghost", message: "love this site so much ✦", timestamp: "2025-01-03" },
  { name: "y2k_forever", message: "bookmarked !", timestamp: "2025-01-02" },
  { name: "moonreader", message: "the minesweeper got me", timestamp: "2025-01-01" },
];
// ────────────────────────────────────────────────────────

export default function Guestbook({ full }) {
  const [messages, setMessages] = useState(SEED_MESSAGES);
  const [name, setName] = useState("");
  const [msg, setMsg] = useState("");
  const [status, setStatus] = useState(""); // "" | "sending" | "sent" | "error"
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (APPS_SCRIPT_URL === APP_SCRIPT_URL) return;
    fetch(`${APPS_SCRIPT_URL}?action=get`)
      .then(r => r.json())
      .then(data => {
        if (data.messages?.length) {
          setMessages(data.messages.reverse());
          setLoaded(true);
        }
      })
      .catch(() => {});
  }, []);

  const submit = async () => {
    if (!msg.trim()) return;
    setStatus("sending");
    const entry = {
      name: name.trim() || "anon",
      message: msg.trim(),
      timestamp: new Date().toISOString().slice(0, 10),
    };

    // Optimistic update
    setMessages(prev => [entry, ...prev]);
    setName("");
    setMsg("");

    if (APPS_SCRIPT_URL !== "https://script.google.com/macros/s/AKfycbz2DMG4FtIoiDZWKRtDLuQL6ZdObntQdttW9NcsuxLF0WMobNG7AiiZik2lcGVBhHoi/exec") {
      try {
        await fetch(APPS_SCRIPT_URL, {
          method: "POST",
          mode: "no-cors",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ action: "post", ...entry }),
        });
        setStatus("sent");
      } catch {
        setStatus("error");
      }
    } else {
      setStatus("sent");
    }

    setTimeout(() => setStatus(""), 3000);
  };

  const display = full ? messages : messages.slice(0, 5);

  return (
    <section className="guestbook">
      <p className="sec-label">guestbook</p>

      <div className="gb-form">
        <input
          value={name}
          onChange={e => setName(e.target.value)}
          placeholder="name (or leave blank)"
          maxLength={30}
          style={{ marginBottom: "8px" }}
        />
        <div className="gb-input-row">
          <input
            value={msg}
            onChange={e => setMsg(e.target.value)}
            onKeyDown={e => e.key === "Enter" && submit()}
            placeholder="leave a note ..."
            maxLength={120}
          />
          <button onClick={submit} disabled={status === "sending"}>
            {status === "sending" ? "..." : "post"}
          </button>
        </div>
        {status === "sent" && <p className="gb-status">posted ✓</p>}
        {status === "error" && <p className="gb-status error">something went wrong</p>}
      </div>

      <div className="gb-messages">
        {display.map((m, i) => (
          <div key={i} className="gb-row">
            <span className="gb-name">{m.name}</span>
            <span className="gb-sep">—</span>
            <span className="gb-msg">{m.message}</span>
            <span className="gb-date">{m.timestamp}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
