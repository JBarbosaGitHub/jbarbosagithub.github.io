import { useState } from "react";
import { motion } from "framer-motion";

const CompoundInvestment = () => {
  const [initial, setInitial] = useState(0);
  const [annualDeposit, setAnnualDeposit] = useState(0);
  const [rate, setRate] = useState(0);
  const [years, setYears] = useState(0);
  const [total, setTotal] = useState(null);
  return (
    <div style={{ textAlign: 'center', padding: '1rem 0' }}>
      <h2 style={{ color: '#8cb4bc', fontWeight: 700 }}>Investimento Composto!</h2>
      <form className="simulador-form" onSubmit={e => { e.preventDefault(); let result = initial; for (let i = 0; i < years; i++) { result = (result + annualDeposit) * (1 + rate / 100); } setTotal(result); }}>
        <label>Valor inicial (€):</label>
        <input type="number" value={initial} onChange={e => setInitial(Number(e.target.value))} placeholder="Ex: 1000" className="simulador-input" />
        <label>Depósitos anuais (€):</label>
        <input type="number" value={annualDeposit} onChange={e => setAnnualDeposit(Number(e.target.value))} placeholder="Ex: 500" className="simulador-input" />
        <label>Taxa anual (%):</label>
        <input type="number" value={rate} onChange={e => setRate(Number(e.target.value))} placeholder="Ex: 7" className="simulador-input" />
        <label>Anos:</label>
        <input type="number" value={years} onChange={e => setYears(Number(e.target.value))} placeholder="Ex: 10" className="simulador-input" />
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

export default CompoundInvestment; 