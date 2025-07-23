import { useState } from "react";
import { motion } from "framer-motion";

const TripBudget = () => {
  const [available, setAvailable] = useState(0);
  const [transport, setTransport] = useState(0);
  const [snack, setSnack] = useState(0);
  const [balance, setBalance] = useState(null);
  return (
    <div style={{ textAlign: 'center', padding: '1rem 0' }}>
      <h2 style={{ color: '#8cb4bc', fontWeight: 700 }}>Planeia a Viagem Escolar!</h2>
      <form className="simulador-form" onSubmit={e => { e.preventDefault(); setBalance(available - (transport + snack)); }}>
        <label>Dinheiro disponível (€):</label>
        <input type="number" value={available} onChange={e => setAvailable(Number(e.target.value))} placeholder="Ex: 20" className="simulador-input" />
        <label>Transporte (€):</label>
        <input type="number" value={transport} onChange={e => setTransport(Number(e.target.value))} placeholder="Ex: 5" className="simulador-input" />
        <label>Lanche (€):</label>
        <input type="number" value={snack} onChange={e => setSnack(Number(e.target.value))} placeholder="Ex: 3" className="simulador-input" />
        <div className="simulador-submit-row">
          <motion.button
            type="submit"
            className="simulador-submit-btn"
            whileHover={{ scale: 1.08, boxShadow: '0 4px 24px #8cb4bc55', filter: 'brightness(0.85)' }}
            whileTap={{ scale: 0.96 }}
          >
            Calcular
          </motion.button>
        </div>
      </form>
      {balance !== null && (
        <p style={{ fontSize: 22, color: balance >= 0 ? '#7d925c' : '#ff0000', fontWeight: 800 }}>Saldo: €{balance.toFixed(2)} - {balance < 0 ? 'Ajusta se negativo!' : 'Boa gestão!'}</p>
      )}
    </div>
  );
};

export default TripBudget; 