import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";
import WhoWeAre from "./Pages/WhoWeAre";
import WhereWeAt from "./Pages/WhereWeAt";
import WhatWeDo from "./Pages/WhatWeDo";

const App = () => {
    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/quemsomos" element={<WhoWeAre />} />
                    <Route path="/oquefazemos" element={<WhatWeDo />} />
                    <Route path="/ondeestamos" element={<WhereWeAt />} />
                </Routes>
            </BrowserRouter>
        </>
    )
}

export default App;