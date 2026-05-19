import "./Nav.css";

const links = ["blog","about", "tools", "guestbook"];

export default function Nav({ activePage, setActivePage }) {
  return (
    <header className="nav">
      <button
        className="nav-logo outline"
        onClick={() => setActivePage("home")}
        style={{ border: "none", fontSize: "22px", padding: "0" }}
      >
        cait.lol<span className="blink">_</span>
      </button>
      <nav className="nav-links">
        {links.map((l) => (
          <button
            key={l}
            className={`nav-link outline ${activePage === l ? "active" : ""}`}
            onClick={() =>
              setActivePage(activePage === l ? "home" : l)
            }
          >
            {l}
          </button>
        ))}
      </nav>
    </header>
  );
}
