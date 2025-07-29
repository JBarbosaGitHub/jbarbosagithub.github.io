import React, { useState } from 'react';
import { motion } from 'framer-motion';

const WeeklyAllowance = () => {
  const [allowance, setAllowance] = useState('');
  const [expense, setExpense] = useState('');
  const [balance, setBalance] = useState(null);

  const handleCalculate = (e) => {
    e.preventDefault();
    const a = parseFloat(allowance) || 0;
    const g = parseFloat(expense) || 0;
    setBalance(a - g);
  };

  return (
    <div className="simulador-main-box" style={{ textAlign: 'center', padding: '1rem 0' }}>
      <h2>Gerencia a Tua Mesada!</h2>
      <form className="simulador-form" onSubmit={handleCalculate}>
        <label>Mesada (€):</label>
        <input type="number" className="simulador-input" value={allowance} onChange={e => setAllowance(e.target.value)} placeholder="Ex: 5" min="0" />
        <label>Gasto (€):</label>
        <input type="number" className="simulador-input" value={expense} onChange={e => setExpense(e.target.value)} placeholder="Ex: 2" min="0" />
        <div className="simulador-submit-row">
          <motion.button
            type="submit"
            className="simulador-submit-btn"
            whileHover={{ scale: 1.08, boxShadow: '0 0 16px #8cb4bc55', filter: 'brightness(0.85)' }}
            whileTap={{ scale: 0.95 }}
          >
            Calcular Saldo
          </motion.button>
        </div>
      </form>
      {balance !== null && (
        <p style={{ fontSize: 24, color: balance >= 0 ? '#228b22' : '#ff0000', fontWeight: 800 }}>
          Saldo: €{balance}
        </p>
      )}
    </div>
  );
};

export default WeeklyAllowance; 