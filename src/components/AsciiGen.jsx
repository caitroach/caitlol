import { useState } from "react";
import "./AsciiGen.css";

const ASCII_LIST = [
  "(* ^ ω ^)",
  "(´ ∀ *)",
  "٩(◕‿◕｡)۶",
  "☆*:.｡.o(≧▽≦)o.｡.:*☆",
  "(o^▽^o)",
  "(⌒▽⌒)☆",
  "<(￣︶￣)>",
  "。.:☆*:･'(*⌒―⌒*)))",
  "(´｡• ω •｡)",
  "(─‿‿─)",
  "٩(｡•́‿•̀｡)۶",
  "(✧ω✧)",
  "(っ˘ω˘ς )",
  "(╯✧▽✧)╯",
  "(„• ֊ •„)",
  "♡〜٩( ˃́▿˂̀ )۶〜♡",
  "ヽ(♡‿♡)ノ",
  "(♡˙︶˙♡)",
  "(°◡°♡)",
  "(´,,•ω•,,)♡",
  "(⁄ ⁄•⁄ω⁄•⁄ ⁄)",
  "(；￣Д￣)",
  "(눈_눈)",
  "(︶︹︺)",
  "凸(￣ヘ￣)",
  "(＞﹏＜)",
  "(⇀‸↼‶)",
  "凸( ﾛ ´ )凸",
  "(；一_一)",
  "(҂⌣̀_⌣́)",
  "＼＼٩(๑`^´๑)۶／／",
  "(╬ Ò﹏Ó)",
  ".｡･ﾟﾟ･(＞_＜)･ﾟﾟ･｡.",
  "(｡•́︿•̀｡)",
  "( ╥ω╥ )",
  "｡ﾟ･ (>﹏<) ･ﾟ｡",
  "(´-ω-)",
  "(ಡ‸ಡ)",
  "(×_×)⌒☆",
  "(☆_@)",
  "o(｀ω´*)o",
  "..・ヾ(。＞＜)シ",
  "Σ(っ °Д °;)っ",
  "ᕕ( ᐛ )ᕗ",
  "┐(￣ヮ￣)┌",
  "ლ(¯ロ¯ლ)",
  "Σ(‘◉⌓◉’)",
  "(・・?",
  "Σ( ° △ °|||)︴",
  "(→_→)",
  "Σ(°ロ°)",
  "(ʘ言ʘ╬)",
  "Σ(º ﾛ º๑)",
  "(´• ω •)ﾉ",
  "ヾ(☆▽☆)",
  "(⌒ω⌒)ﾉ",
  "⊂(´• ω •⊂)",
  "(^_−)☆",
  "┬┴┬┴┤( ͡° ͜ʖ├┬┴┬┴",
  "ε=ε=ε=ε=ε=ε=┌(;￣▽￣)┘",
  "(∪｡∪)｡｡｡zzZ",
  "(=^･ω･^)y＝",
  "ʕ•́ᴥ•̀ʔっ",
  "／(=･ × ･=)＼",
  "ヾ(・ω・)メ(・ω・)ノ"
];

const BLOCK_MAP = {
 //make ascii blocks here 

};

function toBlock(text) {
  return text
    .toUpperCase()
    .split("")
    .map(ch => BLOCK_MAP[ch] || ch)
    .join(" ");
}

async function generateAscii(text) {
  
  //display text says "that face when..."
  //fake loading 
  //grab random line from ascii text list... or array? return.

  const rand_kao = ASCII_LIST[Math.floor(Math.random()*ASCII_LIST.length)];
  return rand_kao
  
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
  const [mode, setMode] = useState("ai"); //nyehhh fix this....

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
          placeholder="that face when..."
          maxLength={30}
        />
        <button onClick={generate} disabled={loading}>
          {loading ? "..." : "GO!"}
        </button>
      </div>
      <div className="ascii-mode">
        <button
          className={mode === "kaomoji" ? "" : "block text"}
          onClick={() => setMode("kaomoji")}
          style={{ fontSize: "11px", padding: "2px 10px" }}
        >
          kaomoji
        </button>
        <button
          className={mode === "block" ? "" : "block text"}
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
