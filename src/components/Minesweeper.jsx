import { useState, useEffect, useCallback } from "react";
import "./Minesweeper.css";

const ROWS = 9, COLS = 9, MINE_COUNT = 10;

function createEmpty() {
  return Array.from({ length: ROWS }, () =>
    Array.from({ length: COLS }, () => ({
      mine: false, revealed: false, flagged: false, adj: 0,
    }))
  );
}

function placeMines(grid, skipR, skipC) {
  const g = grid.map(r => r.map(c => ({ ...c })));
  let placed = 0;
  while (placed < MINE_COUNT) {
    const r = Math.floor(Math.random() * ROWS);
    const c = Math.floor(Math.random() * COLS);
    if (!g[r][c].mine && !(r === skipR && c === skipC)) {
      g[r][c].mine = true;
      placed++;
    }
  }
  for (let r = 0; r < ROWS; r++) {
    for (let c = 0; c < COLS; c++) {
      if (g[r][c].mine) continue;
      let adj = 0;
      for (let dr = -1; dr <= 1; dr++)
        for (let dc = -1; dc <= 1; dc++) {
          const nr = r + dr, nc = c + dc;
          if (nr >= 0 && nr < ROWS && nc >= 0 && nc < COLS && g[nr][nc].mine) adj++;
        }
      g[r][c].adj = adj;
    }
  }
  return g;
}

function floodReveal(grid, r, c) {
  if (r < 0 || r >= ROWS || c < 0 || c >= COLS) return grid;
  if (grid[r][c].revealed || grid[r][c].flagged || grid[r][c].mine) return grid;
  grid[r][c] = { ...grid[r][c], revealed: true };
  if (grid[r][c].adj === 0)
    for (let dr = -1; dr <= 1; dr++)
      for (let dc = -1; dc <= 1; dc++)
        grid = floodReveal(grid, r + dr, c + dc);
  return grid;
}

const ADJ_COLORS = ["", "#1a6fbd", "#2a8a2a", "#c0392b", "#8e44ad", "#922b21", "#117a8b", "#111", "#555"];

export default function Minesweeper() {
  const [grid, setGrid] = useState(createEmpty);
  const [status, setStatus] = useState("idle"); // idle | playing | won | lost
  const [flags, setFlags] = useState(0);
  const [secs, setSecs] = useState(0);

  useEffect(() => {
    if (status !== "playing") return;
    const id = setInterval(() => setSecs(s => s + 1), 1000);
    return () => clearInterval(id);
  }, [status]);

  const reset = () => {
    setGrid(createEmpty());
    setStatus("idle");
    setFlags(0);
    setSecs(0);
  };

  const reveal = useCallback((r, c) => {
    if (status === "won" || status === "lost") return;
    if (grid[r][c].revealed || grid[r][c].flagged) return;

    let g = grid.map(row => row.map(cell => ({ ...cell })));

    if (status === "idle") {
      g = placeMines(g, r, c);
      setStatus("playing");
    }

    if (g[r][c].mine) {
      g = g.map((row, ri) => row.map((cell, ci) =>
        cell.mine ? { ...cell, revealed: true } : cell
      ));
      g[r][c] = { ...g[r][c], hit: true };
      setGrid(g);
      setStatus("lost");
      return;
    }

    g = floodReveal(g, r, c);

    const won = g.flat().every(cell => cell.mine || cell.revealed);
    setGrid(g);
    if (won) setStatus("won");
  }, [grid, status]);

  const flag = useCallback((e, r, c) => {
    e.preventDefault();
    if (status === "won" || status === "lost" || status === "idle") return;
    if (grid[r][c].revealed) return;
    const g = grid.map(row => row.map(cell => ({ ...cell })));
    g[r][c].flagged = !g[r][c].flagged;
    setFlags(f => g[r][c].flagged ? f + 1 : f - 1);
    setGrid(g);
  }, [grid, status]);

  const remaining = MINE_COUNT - flags;

  return (
    <div className="ms-wrap">
      <div className="ms-hud">
        <span className="ms-count">{String(remaining).padStart(3, "0")}</span>
        <button className="ms-face" onClick={reset}>
          {status === "won" ? "★" : status === "lost" ? "×" : "○"}
        </button>
        <span className="ms-count">{String(Math.min(secs, 999)).padStart(3, "0")}</span>
      </div>
      <div className="ms-grid" style={{ gridTemplateColumns: `repeat(${COLS}, 1fr)` }}>
        {grid.map((row, r) =>
          row.map((cell, c) => {
            let content = "";
            let cls = "ms-cell";
            if (cell.revealed) {
              cls += " revealed";
              if (cell.mine) { cls += cell.hit ? " hit" : " mine"; content = "✸"; }
              else if (cell.adj > 0) content = cell.adj;
            } else if (cell.flagged) {
              content = "⚑";
            }
            return (
              <div
                key={`${r}-${c}`}
                className={cls}
                onClick={() => reveal(r, c)}
                onContextMenu={e => flag(e, r, c)}
                style={cell.revealed && cell.adj > 0 && !cell.mine
                  ? { color: ADJ_COLORS[cell.adj] }
                  : undefined}
              >
                {content}
              </div>
            );
          })
        )}
      </div>
      {status === "won" && <p className="ms-msg">you win ★</p>}
      {status === "lost" && <p className="ms-msg">boom. <button className="outline" onClick={reset} style={{fontSize:"12px",padding:"2px 8px",marginLeft:"6px"}}>retry</button></p>}
    </div>
  );
}
