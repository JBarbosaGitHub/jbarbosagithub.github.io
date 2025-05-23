import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";
import WhoWeAre from "./Pages/WhoWeAre";
import WhereWeAt from "./Pages/WhereWeAt";
import WhatWeDo from "./Pages/WhatWeDo";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import ProtectedRoute from "./Components/ProtectedRoute";

const App = () => {
    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/quemsomos" element={<WhoWeAre />} />
                    <Route path="/oquefazemos" element={<WhatWeDo />} />
                    <Route path="/ondeestamos" element={<WhereWeAt />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                </Routes>
            </BrowserRouter>
        </>
    )
}

export default App;