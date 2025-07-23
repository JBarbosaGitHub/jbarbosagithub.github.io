import { useState } from "react";
import { motion } from "framer-motion";

const FamilyMonthlyBudget = () => {
  const [income, setIncome] = useState(0);
  const [fixedExpenses, setFixedExpenses] = useState(0);
  const [variableExpenses, setVariableExpenses] = useState(0);
  const [balance, setBalance] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    const result = income - (fixedExpenses + variableExpenses);
    setBalance(result);
  };

  return (
    <div style={{ textAlign: 'center', padding: '1rem 0' }}>
      <h2 style={{ color: '#8cb4bc', fontWeight: 700 }}>Orçamento Mensal!</h2>
      <form className="simulador-form" onSubmit={handleSubmit}>
        <label>Receitas (€):</label>
        <input type="number" value={income} onChange={e => setIncome(Number(e.target.value))} placeholder="Ex: 100" className="simulador-input" />
        <label>Despesas fixas (€):</label>
        <input type="number" value={fixedExpenses} onChange={e => setFixedExpenses(Number(e.target.value))} placeholder="Ex: 40" className="simulador-input" />
        <label>Despesas variáveis (€):</label>
        <input type="number" value={variableExpenses} onChange={e => setVariableExpenses(Number(e.target.value))} placeholder="Ex: 30" className="simulador-input" />
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
        <p style={{ fontSize: 24, color: balance >= 0 ? '#228b22' : '#ff0000', fontWeight: 800 }}>
          Saldo: €{balance.toFixed(2)}
        </p>
      )}
    </div>
  );
};

export default FamilyMonthlyBudget; 