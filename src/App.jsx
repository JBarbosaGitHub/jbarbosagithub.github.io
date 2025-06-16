import { HashRouter, Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";
import WhoWeAre from "./Pages/WhoWeAre";
import WhereWeAt from "./Pages/WhereWeAt";
import Training from "./Pages/Training";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import Success from "./Pages/Success";
import Cancel from "./Pages/Cancel";

const App = () => {
    return (
        <>
            <HashRouter>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/quemsomos" element={<WhoWeAre />} />
                    <Route path="/formacoes" element={<Training />} />
                    <Route path="/ondeestamos" element={<WhereWeAt />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/success" element={<Success />} />
                    <Route path="/cancel" element={<Cancel />} />
                </Routes>
            </HashRouter>
        </>
    )
}

export default App;