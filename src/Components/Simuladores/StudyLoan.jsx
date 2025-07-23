import { useState } from "react";
import { motion } from "framer-motion";

const StudyLoan = () => {
  const [amount, setAmount] = useState(0);
  const [rate, setRate] = useState(0);
  const [years, setYears] = useState(1);
  const [result, setResult] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    const months = years * 12;
    const monthlyRate = rate / 100 / 12;
    const installment = amount * (monthlyRate * Math.pow(1 + monthlyRate, months)) / (Math.pow(1 + monthlyRate, months) - 1);
    const total = installment * months;
    setResult({ installment, total });
  };

  return (
    <div style={{ textAlign: 'center', padding: '1rem 0' }}>
      <h2 style={{ color: '#8cb4bc', fontWeight: 700 }}>Empréstimo para Estudos!</h2>
      <form className="simulador-form" onSubmit={handleSubmit}>
        <label>Valor (€):</label>
        <input type="number" value={amount} onChange={e => setAmount(Number(e.target.value))} placeholder="Ex: 5000" className="simulador-input" />
        <label>Taxa anual (%):</label>
        <input type="number" value={rate} onChange={e => setRate(Number(e.target.value))} placeholder="Ex: 4" className="simulador-input" />
        <label>Anos:</label>
        <input type="number" value={years} onChange={e => setYears(Number(e.target.value))} placeholder="Ex: 5" className="simulador-input" />
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
      {result && (
        <p style={{ fontSize: 24, color: '#ff4500', fontWeight: 800 }}>
          Prestação mensal: €{result.installment.toFixed(2)} - Total: €{result.total.toFixed(2)}
        </p>
      )}
    </div>
  );
};

export default StudyLoan; 