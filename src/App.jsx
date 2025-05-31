import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";
import WhoWeAre from "./Pages/WhoWeAre";
import WhereWeAt from "./Pages/WhereWeAt";
import Training from "./Pages/Training";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import Success from "./Pages/Success";
import Cancel from "./Pages/Cancel";

const stripePromise = loadStripe('pk_test_51RTnkPGhaBptfacfMqv4niRWglthVZCNklXm4TSrCRxq5FAPdXYgXleUAu5KMglv24ff6znSfLIgiGlIBIPlq9nN00Q81fHW52')

const App = () => {
    return (
        <>
            <Elements stripe={stripePromise}>
                <BrowserRouter>
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
                </BrowserRouter>
            </Elements>
        </>
    )
}

export default App;