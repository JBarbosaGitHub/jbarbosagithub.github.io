import { useState } from "react";
import { motion } from "framer-motion";

const CompoundInvestment = () => {
  const [initial, setInitial] = useState('');
  const [annualDeposit, setAnnualDeposit] = useState('');
  const [rate, setRate] = useState('');
  const [years, setYears] = useState('');
  const [total, setTotal] = useState(null);
  return (
    <div style={{ textAlign: 'center', padding: '1rem 0' }}>
      <h2 style={{ color: '#8cb4bc', fontWeight: 700 }}>Investimento Composto!</h2>
      <form className="simulador-form" onSubmit={e => { e.preventDefault(); let result = parseFloat(initial) || 0; for (let i = 0; i < (parseInt(years) || 0); i++) { result = (result + (parseFloat(annualDeposit) || 0)) * (1 + (parseFloat(rate) || 0) / 100); } setTotal(result); }}>
        <label>Valor inicial (€):</label>
        <input type="number" value={initial} onChange={e => setInitial(e.target.value)} placeholder="Ex: 1000" min="0" className="simulador-input" />
        <label>Depósitos anuais (€):</label>
        <input type="number" value={annualDeposit} onChange={e => setAnnualDeposit(e.target.value)} placeholder="Ex: 500" min="0" className="simulador-input" />
        <label>Taxa anual (%):</label>
        <input type="number" value={rate} onChange={e => setRate(e.target.value)} placeholder="Ex: 7" min="0" className="simulador-input" />
        <label>Anos:</label>
        <input type="number" value={years} onChange={e => setYears(e.target.value)} placeholder="Ex: 10" min="0" className="simulador-input" />
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
        <p style={{ fontSize: 22, color: '#eac862', fontWeight: 800 }}>Total: €{total.toLocaleString('pt-PT', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
      )}
    </div>
  );
};

export default CompoundInvestment; 