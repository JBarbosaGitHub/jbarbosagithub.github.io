import { HashRouter, Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import Home from "./Pages/Home";
import WhoWeAre from "./Pages/WhoWeAre";
import WhereWeAt from "./Pages/WhereWeAt";
import Training from "./Pages/Training";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import Success from "./Pages/Success";
import Cancel from "./Pages/Cancel";
import ContactUs from "./Pages/ContactUs";
import ElfsightChatbot from "./Components/ElfsightChatbot";
import MiniGamesSelection from "./Pages/MiniGames";
import CoinGame from "./Components/MiniGames";
import Profile from './Pages/Profile';
import Agenda from './Pages/Agenda';
import PiggyWise from './Components/PiggyWise';
import Simulations from "./Pages/Simulations";
import ProtectedRoute from './Components/ProtectedRoute';
import ResetPassword from './Pages/ResetPassword';
import { useEffect } from 'react';


const AnimatedRoutes = () => {
  const location = useLocation();

  const isContactPage =
    location.pathname === "/contacte-nos";
    
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Home />} />
        <Route path="/quemsomos" element={<WhoWeAre />} />
        <Route path="/formacoes" element={<Training />} />
        <Route path="/ondeestamos" element={<WhereWeAt />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/success" element={<Success />} />
        <Route path="/cancel" element={<Cancel />} />
        <Route path="/contacte-nos" element={<ContactUs />} />
        <Route path="/jogos" element={<ProtectedRoute><MiniGamesSelection /></ProtectedRoute>} />
        <Route path="/jogos/moedas" element={<ProtectedRoute><CoinGame /></ProtectedRoute>} />
        <Route path="/jogos/porquinho-sabio" element={<ProtectedRoute><PiggyWise /></ProtectedRoute>} />
        <Route path="/perfil" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
        <Route path="/agenda" element={<ProtectedRoute><Agenda /></ProtectedRoute>} />
        <Route path="/simuladores" element={<ProtectedRoute><Simulations /></ProtectedRoute>} />
      </Routes>
      {!isContactPage && <ElfsightChatbot />}
    </AnimatePresence>
  );
};

const App = () => {
  useEffect(() => {
    // Configuração iubenda
    window._iub = window._iub || [];
    window._iub.csConfiguration = { "siteId": 4151535, "cookiePolicyId": 35764406, "lang": "pt", "storage": { "useSiteId": true } };

    // Script autoblocking
    const autoblockingScript = document.createElement('script');
    autoblockingScript.type = 'text/javascript';
    autoblockingScript.src = 'https://cs.iubenda.com/autoblocking/4151535.js';
    document.body.appendChild(autoblockingScript);

    // Script principal iubenda
    const iubendaScript = document.createElement('script');
    iubendaScript.type = 'text/javascript';
    iubendaScript.src = '//cdn.iubenda.com/cs/iubenda_cs.js';
    iubendaScript.charset = 'UTF-8';
    iubendaScript.async = true;
    document.body.appendChild(iubendaScript);

    return () => {
      document.body.removeChild(autoblockingScript);
      document.body.removeChild(iubendaScript);
    };
  }, []);
  return (
    <HashRouter>
      <AnimatedRoutes />
    </HashRouter>
  );
};

export default App;