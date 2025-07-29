import React, { useState } from 'react';
import { motion } from 'framer-motion';

const BookSaving = () => {
  const [price, setPrice] = useState('');
  const [current, setCurrent] = useState('');
  const [perMonth, setPerMonth] = useState('');
  const [result, setResult] = useState(null);

  const handleCalc = (e) => {
    e.preventDefault();
    const p = parseFloat(price) || 0;
    const c = parseFloat(current) || 0;
    const m = parseFloat(perMonth) || 0;
    if (m > 0) {
      const months = Math.max(0, Math.ceil((p - c) / m));
      setResult(months);
    } else {
      setResult(null);
    }
  };

  return (
    <div className="simulador-main-box" style={{ textAlign: 'center', padding: '1rem 0' }}>
      <h2>Poupa para Comprar um Livro!</h2>
      <form className="simulador-form" onSubmit={handleCalc}>
        <label>Preço do livro (€):</label>
        <input type="number" className="simulador-input" value={price} onChange={e => setPrice(e.target.value)} placeholder="Ex: 20" min="0" />
        <label>Quanto já tens (€):</label>
        <input type="number" className="simulador-input" value={current} onChange={e => setCurrent(e.target.value)} placeholder="Ex: 5" min="0" />
        <label>Quanto poupas por mês (€):</label>
        <input type="number" className="simulador-input" value={perMonth} onChange={e => setPerMonth(e.target.value)} placeholder="Ex: 3" min="0" />
        <div className="simulador-submit-row">
          <motion.button
            type="submit"
            className="simulador-submit-btn"
            whileHover={{ scale: 1.08, boxShadow: '0 0 16px #8cb4bc55', filter: 'brightness(0.85)' }}
            whileTap={{ scale: 0.95 }}
          >
            Calcular Meses
          </motion.button>
        </div>
      </form>
      {result !== null && (
        <p style={{ fontSize: 24, color: '#228b22', fontWeight: 800 }}>
          Vais demorar {result} mês(es) a conseguir comprar o livro.
        </p>
      )}
    </div>
  );
};

export default BookSaving; 