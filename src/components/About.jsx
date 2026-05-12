import "./About.css";

// ── EDIT THESE ──────────────────────────────────────────
const BIO = `i'm a toronto-based designer and developer who likes making
quiet corners of the internet. when i'm not staring at figma
or a terminal, i'm probably reading, rewatching gilmore girls,
or finding new fonts to hoard.`;

const LINKS = [
  { label: "github", href: "https://github.com/cait" },
  { label: "are.na", href: "https://are.na/cait" },
  { label: "letterboxd", href: "https://letterboxd.com/cait" },
  { label: "email", href: "mailto:hi@cait.lol" },
];
// ────────────────────────────────────────────────────────

export default function About() {
  return (
    <section className="about">
      <p className="sec-label">about</p>
      <p className="about-bio">{BIO}</p>
      <div className="about-links">
        {LINKS.map((l) => (
          <a
            key={l.label}
            href={l.href}
            target={l.href.startsWith("http") ? "_blank" : undefined}
            rel="noreferrer"
            className="about-link"
          >
            ↗ {l.label}
          </a>
        ))}
      </div>
    </section>
  );
}
