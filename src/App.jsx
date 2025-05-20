import { HashRouter, Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";
import WhoWeAre from "./Pages/WhoWeAre";
import WhereWeAt from "./Pages/WhereWeAt";
import WhatWeDo from "./Pages/WhatWeDo";

const App = () => {
    return (
        <>
            <HashRouter>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/quemsomos" element={<WhoWeAre />} />
                    <Route path="/oquefazemos" element={<WhatWeDo />} />
                    <Route path="/ondeestamos" element={<WhereWeAt />} />
                </Routes>
            </HashRouter>
        </>
    )
}

export default App;