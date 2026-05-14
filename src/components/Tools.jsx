import { useState } from "react";
import Minesweeper from "./Minesweeper.jsx";
import AsciiGen from "./AsciiGen.jsx";
import TarotCard from "./Tarotreading.jsx";
import "./Tools.css";

const TOOLS = [
  { id: "minesweeper", label: "minesweeper" },
  { id: "ascii", label: "ascii generator" },
  { id: "tarot", label: "tarot reading" },  // ← added
];

export default function Tools({ full }) {
  const [active, setActive] = useState("minesweeper");

  return (
    <section className={`tools ${full ? "full" : ""}`}>
      <p className="sec-label">tools & games</p>
      <div className="tool-tabs">
        {TOOLS.map(t => (
          <button
            key={t.id}
            className={active === t.id ? "" : "outline"}
            onClick={() => setActive(t.id)}
            style={{ fontSize: "12px", padding: "4px 14px 2px" }}
          >
            {t.label}
          </button>
        ))}
      </div>
      <div className="tool-body">
        {active === "minesweeper" && <Minesweeper />}
        {active === "ascii" && <AsciiGen />}
        {active === "tarot" && <TarotCard />}  {/* ← fixed */}
      </div>
    </section>
  );
}