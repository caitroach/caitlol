import "./About.css";

const BIO = `hi, i'm cait!! bio here!`;

const LINKS = [
  { label: "github", href: "https://github.com/caitroach" },
  { label: "are.na", href: "https://are.na/cait" },
  { label: "letterboxd", href: "https://letterboxd.com/cait42" },
  { label: "email", href: "roachc006@gmail.com" },
];

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
