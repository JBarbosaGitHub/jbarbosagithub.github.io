import { useState } from "react";
import { motion } from "framer-motion";

const CompoundInterestSaving = () => {
  const [initial, setInitial] = useState('');
  const [rate, setRate] = useState('');
  const [years, setYears] = useState('');
  const [total, setTotal] = useState(null);
  return (
    <div style={{ textAlign: 'center', padding: '1rem 0' }}>
      <h2 style={{ color: '#8cb4bc', fontWeight: 700 }}>Poupança com Juros Compostos!</h2>
      <form className="simulador-form" onSubmit={e => { e.preventDefault(); setTotal((parseFloat(initial) || 0) * Math.pow(1 + (parseFloat(rate) || 0) / 100, parseInt(years) || 0)); }}>
        <label>Valor inicial (€):</label>
        <input type="number" value={initial} onChange={e => setInitial(e.target.value)} placeholder="Ex: 50" min="0" className="simulador-input" />
        <label>Taxa anual (%):</label>
        <input type="number" value={rate} onChange={e => setRate(e.target.value)} placeholder="Ex: 3" min="0" className="simulador-input" />
        <label>Anos:</label>
        <input type="number" value={years} onChange={e => setYears(e.target.value)} placeholder="Ex: 2" min="0" className="simulador-input" />
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
      {total !== null && (
        <p style={{ fontSize: 22, color: '#eac862', fontWeight: 800 }}>Total: €{total.toFixed(2)}</p>
      )}
    </div>
  );
};

export default CompoundInterestSaving; 