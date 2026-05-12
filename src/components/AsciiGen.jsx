import { useState } from "react";
import "./AsciiGen.css";

const BLOCK_MAP = {
  A:"▄▀█",B:"█▀▄█",C:"▄▀▀",D:"█▀▄█",E:"█▀▀▀█",F:"█▀▀▄",G:"▄▀▄█",
  H:"█ █▀█",I:"▀█▀",J:"  █▌",K:"█▄▀█",L:"█  ▀",M:"███ █",N:"█▄ █▀",
  O:"▄█▄",P:"█▀▀█",Q:"▄█▄▌",R:"█▀▀█▀",S:"▀▀▄",T:"▀█▀",U:"█ ▀▄",
  V:"█ ▀",W:"█▄█▄█",X:"▀▄▄▀",Y:"▀▄▀",Z:"▀▄▀",
  "0":"▄█▄","1":" █","2":"▀▄▀","3":"▀▄▄","4":"█▄█","5":"█▀▀",
  "6":"▄▀▀","7":"▀▄","8":"▀█▀","9":"▀▄▄"," ":"   ",
  "!":"█ ▪",".":"▪",",":"▄","?":"▀ ▪","★":"★","♡":"♡"
};

function toBlock(text) {
  return text
    .toUpperCase()
    .split("")
    .map(ch => BLOCK_MAP[ch] || ch)
    .join(" ");
}

// Uses Claude API for creative ASCII art
async function generateAscii(text) {
  const res = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      model: "claude-sonnet-4-20250514",
      max_tokens: 1000,
      messages: [{
        role: "user",
        content: `Create a cute ASCII art representation of: "${text}"
Rules:
- Use only printable ASCII characters
- Keep it small, max 8 lines tall, max 40 chars wide
- Make it charming and minimal
- No explanation, just the ASCII art itself
- Center each line with spaces if needed`
      }]
    })
  });
  const data = await res.json();
  return data.content?.[0]?.text || toBlock(text);
}

export default function AsciiGen() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState(
`  /\\_/\\  
 ( o.o ) 
  > ^ <  
 cait.lol`
  );
  const [loading, setLoading] = useState(false);
  const [mode, setMode] = useState("ai"); // ai | block

  const generate = async () => {
    if (!input.trim()) return;
    if (mode === "block") {
      setOutput(toBlock(input));
      return;
    }
    setLoading(true);
    try {
      const result = await generateAscii(input.trim());
      setOutput(result);
    } catch {
      setOutput(toBlock(input));
    } finally {
      setLoading(false);
    }
  };

  const copy = () => {
    navigator.clipboard.writeText(output);
  };

  return (
    <div className="ascii-wrap">
      <div className="ascii-controls">
        <input
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={e => e.key === "Enter" && generate()}
          placeholder="type anything..."
          maxLength={30}
        />
        <button onClick={generate} disabled={loading}>
          {loading ? "..." : "gen"}
        </button>
      </div>
      <div className="ascii-mode">
        <button
          className={mode === "ai" ? "" : "outline"}
          onClick={() => setMode("ai")}
          style={{ fontSize: "11px", padding: "2px 10px" }}
        >
          ai art
        </button>
        <button
          className={mode === "block" ? "" : "outline"}
          onClick={() => setMode("block")}
          style={{ fontSize: "11px", padding: "2px 10px" }}
        >
          block text
        </button>
      </div>
      <pre className="ascii-output">{output}</pre>
      <button className="outline copy-btn" onClick={copy}>copy ↗</button>
    </div>
  );
}
