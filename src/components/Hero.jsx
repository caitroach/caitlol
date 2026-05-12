import { useEffect, useState } from "react";
import "./Hero.css";

// ── EDIT THESE ──────────────────────────────────────────
const CURRENTLY_READING = {
  title: "The Secret History",
  author: "Donna Tartt",
};

const NOW_PLAYING = {
  song: "Only Time",
  artist: "Enya",
};
// ────────────────────────────────────────────────────────

export default function Hero({ setActivePage }) {
  const [time, setTime] = useState("");

  useEffect(() => {
    const tick = () => {
      const now = new Date();
      setTime(now.toLocaleTimeString("en-CA", { hour12: false }));
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <section className="hero">
      <div className="hero-meta">
        <span>{time}</span>
        <span>toronto, on</span>
      </div>

      <h1 className="hero-name">
        hi, i'm cait.<span className="blink">_</span>
      </h1>
      <p className="hero-bio">
        designer & developer. i make things for the internet and collect
        fonts i'll never use.
      </p>

      <div className="hero-status">
        <div className="status-row">
          <span className="status-dot playing" />
          <span className="status-label">listening to</span>
          <span className="status-val">
            {NOW_PLAYING.song} — {NOW_PLAYING.artist}
          </span>
        </div>
        <div className="status-row">
          <span className="status-dot reading" />
          <span className="status-label">reading</span>
          <span className="status-val">
            {CURRENTLY_READING.title}{" "}
            <span className="status-author">by {CURRENTLY_READING.author}</span>
          </span>
        </div>
      </div>
    </section>
  );
}
