import { useState, useEffect } from "react";
import Nav from "./components/Nav";
import Hero from "./components/Hero";
import About from "./components/About";
import Tools from "./components/Tools";
import Guestbook from "./components/Guestbook";
import Footer from "./components/Footer";
import "./App.css";

export default function App() {
  const [activePage, setActivePage] = useState("home");

  return (
    <div className="site">
      <Nav activePage={activePage} setActivePage={setActivePage} />
      <main>
        {activePage === "home" && (
          <>
            <Hero setActivePage={setActivePage} />
            <About />
            <Tools />
            <Guestbook />
          </>
        )}
        {activePage === "guestbook" && <Guestbook full />}
        {activePage === "tools" && <Tools full />}
      </main>
      <Footer />
    </div>
  );
}
