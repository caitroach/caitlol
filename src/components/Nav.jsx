const links = ["home", "tools", "blog", "guestbook"];
import "./Nav.css"

export default function Nav({ activePage, setActivePage }) {
  return (
    <header className="nav">
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
