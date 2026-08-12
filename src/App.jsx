import { useState } from "react";
import Nav from "./components/Nav"
import "./App.css"
import Tools from "./components/Tools"
import Blog from "./components/Blog"
import Guestbook from "./components/Guestbook"

function App() {
    const [activePage, setActivePage] = useState("home");
    console.log(activePage);
    return (
        <main>
    <div className="site">
        <Nav activePage={activePage} setActivePage={setActivePage} />
        {activePage === "home" && (
            <>
                <h1>welcome to cait.lol</h1>
                <p>this site is under construction and so am i</p>
            </>
        )}
        {activePage === "tools" && <Tools full />}
        {activePage === "blog" && <Blog full />}
        {activePage === "guestbook" && <Guestbook full/>}

    </div>

</main>
    )
}
export default App;
