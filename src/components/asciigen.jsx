import { useState } from "react";
import "./asciigen.css";

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
]

async function generate_ascii(text) {
    //maybe wait 2 seconds with fake loading? but here minimal logic
    const rand_kao = ASCII_LIST[Math.floor(Math.random()*ASCII_LIST.length)];
    return rand_kao
}

export default function ascii_gen() {
    const [input, setInput] = useState("");
    const [output, setOutput] = useState(
        `/\\_/\\  
        ( o.o ) 
        > ^ <  
        cait.lol`
        ); //might update this l8r

    const [loading, setLoading] = useState(false);
    const[mode, setMode] = useState("ai") //?? 
}

const generate = async() => {
    if (!input.trim()) return;
    if (mode==="block") {
        setOutput(toBlock(input));
        return;
    }
    setLoading(true); //what should it do though?

    try { 
        const result = await generate_ascii(input.trim());
        setOuput(result);
    } finally {
        setLoading(false);
    }

    };

const copy = () => {
    navigator.clipboard.writeText(output);

};

return (
    <div className="ascii-wrap">
        <div className="ascii-constrols">
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
      <pre className="ascii-output">{output}</pre>
      <button className="outline copy-btn" onClick={copy}>copy ↗</button>
    </div>
  );



