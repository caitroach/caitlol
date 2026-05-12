import "./About.css";

const BIO = `hi, i'm cait!! bio here!`;

const LINKS = [
  { label: "github", href: "https://github.com/caitroach" },
  { label: "the gram", href: "https://instagram.com/cait.42" },
  { label: "fable", href: "https://fable.co/fabler/cait-594836290790"}
  { label: "letterboxd", href: "https://letterboxd.com/cait42" },
  { label: "spotify", href: "https://open.spotify.com/user/pkzv78wyv7jntbq6nt56minc9"},
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
