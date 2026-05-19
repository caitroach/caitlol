import { useState } from "react";
import "./Blog.css";
 
// ─── ADD YOUR POSTS HERE ───────────────────────────────────────────────────
// When you add a new .md file to /src/posts/, import it here and add it to
// the POSTS array. Keep newest first.
// ──────────────────────────────────────────────────────────────────────────
 
import post1Raw from "../posts/2026-05-18-hello-world.md?raw";
import post2Raw from "../posts/2026-04-30-fonts.md?raw";
 
// Parse frontmatter + body from raw markdown string
function parsePost(raw, id) {
  const fmMatch = raw.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);
  if (!fmMatch) return null;
  const fm = {};
  fmMatch[1].split("\n").forEach((line) => {
    const [k, ...v] = line.split(": ");
    if (k && v.length) fm[k.trim()] = v.join(": ").trim();
  });
  const tagsMatch = fm.tags?.match(/\[(.+)\]/);
  fm.tags = tagsMatch ? tagsMatch[1].split(",").map((t) => t.trim()) : [];
  return { id, frontmatter: fm, body: fmMatch[2].trim() };
}
 
const RAW_POSTS = [
  { raw: post1Raw, id: "hello-world" },
  { raw: post2Raw, id: "fonts" },
];
 
const POSTS = RAW_POSTS.map(({ raw, id }) => parsePost(raw, id)).filter(Boolean);
 
// Very minimal markdown renderer (bold, inline code, line breaks, paragraphs)
function renderMarkdown(text) {
  const lines = text.split("\n");
  const elements = [];
  let i = 0;
 
  while (i < lines.length) {
    const line = lines[i];
 
    if (line.trim() === "") {
      i++;
      continue;
    }
 
    // Collect paragraph lines
    const paraLines = [];
    while (i < lines.length && lines[i].trim() !== "") {
      paraLines.push(lines[i]);
      i++;
    }
 
    const paraText = paraLines.join("\n");
    elements.push(
      <p key={i} className="post-para">
        {renderInline(paraText)}
      </p>
    );
  }
 
  return elements;
}
 
function renderInline(text) {
  // Split on **bold** and `code`
  const parts = text.split(/(\*\*[^*]+\*\*|`[^`]+`)/g);
  return parts.map((part, i) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      return <strong key={i}>{part.slice(2, -2)}</strong>;
    }
    if (part.startsWith("`") && part.endsWith("`")) {
      return <code key={i} className="post-code">{part.slice(1, -1)}</code>;
    }
    // Preserve line breaks within paragraphs
    return part.split("\n").map((line, j, arr) => (
      <span key={`${i}-${j}`}>
        {line}
        {j < arr.length - 1 && <br />}
      </span>
    ));
  });
}
 
function PostView({ post, onBack }) {
  const { frontmatter: fm, body } = post;
  return (
    <div className="post-view">
      <button className="post-back" onClick={onBack}>← back</button>
      <div className="post-header">
        <span className="post-date-full">[{fm.date}]</span>
        <h1 className="post-title-full">{fm.title}</h1>
        {fm.listening && (
          <div className="post-listening">
            <span className="listening-dot" />
            {fm.listening}
          </div>
        )}
        <div className="post-tags-row">
          {fm.tags.map((t) => <span key={t} className="post-tag">[{t}]</span>)}
        </div>
      </div>
      <div className="post-body">{renderMarkdown(body)}</div>
    </div>
  );
}
 
export default function Blog({ full }) {
  const [open, setOpen] = useState(null);
  const posts = full ? POSTS : POSTS.slice(0, 3);
 
  if (open) {
    return (
      <section className="blog">
        <PostView post={open} onBack={() => setOpen(null)} />
      </section>
    );
  }
 
  return (
    <section className="blog">
      <p className="sec-label">blog</p>
      <div className="post-list">
        {posts.map((post) => {
          const { frontmatter: fm, body } = post;
          const preview = body.split("\n\n")[0].replace(/\*\*|`/g, "");
          return (
            <article key={post.id} className="post-item" onClick={() => setOpen(post)}>
              <div className="post-meta">
                <span className="post-date">[{fm.date}]</span>
                {fm.tags.map((t) => <span key={t} className="post-tag">[{t}]</span>)}
              </div>
              <h2 className="post-title">{fm.title}</h2>
              <p className="post-preview">{preview}</p>
              <span className="post-read">read →</span>
            </article>
          );
        })}
      </div>
    </section>
  );
}