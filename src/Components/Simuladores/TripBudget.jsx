import { useState } from "react";
import { motion } from "framer-motion";

const TripBudget = () => {
  const [available, setAvailable] = useState('');
  const [transport, setTransport] = useState('');
  const [snack, setSnack] = useState('');
  const [balance, setBalance] = useState(null);
  return (
    <div style={{ textAlign: 'center', padding: '1rem 0' }}>
      <h2 style={{ color: '#8cb4bc', fontWeight: 700 }}>Planeia a Viagem Escolar!</h2>
      <form className="simulador-form" onSubmit={e => { e.preventDefault(); setBalance((parseFloat(available) || 0) - ((parseFloat(transport) || 0) + (parseFloat(snack) || 0))); }}>
        <label>Dinheiro disponível (€):</label>
        <input type="number" value={available} onChange={e => setAvailable(e.target.value)} placeholder="Ex: 20" min="0" className="simulador-input" />
        <label>Transporte (€):</label>
        <input type="number" value={transport} onChange={e => setTransport(e.target.value)} placeholder="Ex: 5" min="0" className="simulador-input" />
        <label>Lanche (€):</label>
        <input type="number" value={snack} onChange={e => setSnack(e.target.value)} placeholder="Ex: 3" min="0" className="simulador-input" />
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