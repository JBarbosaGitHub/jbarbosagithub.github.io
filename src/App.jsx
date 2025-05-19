import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";
import About from "./Pages/About";
import Contact from "./Pages/Contact";
import Workshop from "./Pages/Workshop";

const App = () => {
    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/workshops" element={<Workshop />} />
                    <Route path="/sobre" element={<About />} />
                    <Route path="/contactos" element={<Contact />} />
                </Routes>
            </BrowserRouter>
        </>
    )
}

export default App;