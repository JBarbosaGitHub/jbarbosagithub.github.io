import { useState } from "react";
import { motion } from "framer-motion";

const StudyLoan = () => {
  const [amount, setAmount] = useState('');
  const [rate, setRate] = useState('');
  const [years, setYears] = useState('');
  const [result, setResult] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    const months = (parseInt(years) || 0) * 12;
    const monthlyRate = (parseFloat(rate) || 0) / 100 / 12;
    const installment = (parseFloat(amount) || 0) * (monthlyRate * Math.pow(1 + monthlyRate, months)) / (Math.pow(1 + monthlyRate, months) - 1);
    const total = installment * months;
    setResult({ installment, total });
  };

  return (
    <div style={{ textAlign: 'center', padding: '1rem 0' }}>
      <h2 style={{ color: '#8cb4bc', fontWeight: 700 }}>Empréstimo para Estudos!</h2>
      <form className="simulador-form" onSubmit={handleSubmit}>
        <label>Valor (€):</label>
        <input type="number" value={amount} onChange={e => setAmount(e.target.value)} placeholder="Ex: 5000" min="0" className="simulador-input" />
        <label>Taxa anual (%):</label>
        <input type="number" value={rate} onChange={e => setRate(e.target.value)} placeholder="Ex: 4" min="0" className="simulador-input" />
        <label>Anos:</label>
        <input type="number" value={years} onChange={e => setYears(e.target.value)} placeholder="Ex: 5" min="0" className="simulador-input" />
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
        <div style={{ marginTop: 16 }}>
          <p style={{ fontSize: 18, color: '#228b22', fontWeight: 700 }}>
            Prestação mensal: €{result.installment.toLocaleString('pt-PT', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </p>
          <p style={{ fontSize: 18, color: '#8b4513', fontWeight: 700 }}>
            Total pago: €{result.total.toLocaleString('pt-PT', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </p>
        </div>
      )}
    </div>
  );
};

export default StudyLoan; 