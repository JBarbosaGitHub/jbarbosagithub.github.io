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
import MiniGames from "./Pages/MiniGames";
import Profile from './Pages/Profile';
import Agenda from './Pages/Agenda';
import ProtectedRoute from './Components/ProtectedRoute';
import ResetPassword from './Pages/ResetPassword';

const AnimatedRoutes = () => {
  const location = useLocation();

  // Supondo que a rota de contacto é "/contacte-nos""
  const isContactPage =
    location.pathname === "/contacte-nos";

  const isHomePage =
    location.pathname === "/";

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
        <Route path="/game" element={<MiniGames />} />
        <Route path="/jogos" element={<ProtectedRoute><MiniGames /></ProtectedRoute>} />
        <Route path="/perfil" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
        <Route path="/agenda" element={<ProtectedRoute><Agenda /></ProtectedRoute>} />
      </Routes>
      {/* Renderiza o chatbot só se não estiveres na página de contacto */}
      {!isContactPage && <ElfsightChatbot />}
    </AnimatePresence>
  );
};

const App = () => {
  return (
    <HashRouter>
      <AnimatedRoutes />
    </HashRouter>
  );
};

export default App;