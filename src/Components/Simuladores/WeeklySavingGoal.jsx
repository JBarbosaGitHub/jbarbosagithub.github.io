import React, { useState } from 'react';
import { motion } from 'framer-motion';

const WeeklySavingGoal = () => {
  const [goal, setGoal] = useState('');
  const [saved, setSaved] = useState('');
  const [message, setMessage] = useState('');

  const handleCheck = (e) => {
    e.preventDefault();
    const g = parseFloat(goal) || 0;
    const s = parseFloat(saved) || 0;
    if (s >= g && g > 0) {
      setMessage('Meta alcançada!');
    } else if (g > 0) {
      setMessage(`Faltam €${(g - s).toFixed(2)}`);
    } else {
      setMessage('Insere a meta!');
    }
  };

  return (
    <div className="simulador-main-box" style={{ textAlign: 'center', padding: '1rem 0' }}>
      <h2>Alcança a Tua Meta Semanal!</h2>
      <form className="simulador-form" onSubmit={handleCheck}>
        <label>Meta (€):</label>
        <input type="number" className="simulador-input" value={goal} onChange={e => setGoal(e.target.value)} placeholder="Ex: 10" min="0" />
        <label>Poupado (€):</label>
        <input type="number" className="simulador-input" value={saved} onChange={e => setSaved(e.target.value)} placeholder="Ex: 7" min="0" />
        <div className="simulador-submit-row">
          <motion.button
            type="submit"
            className="simulador-submit-btn"
            whileHover={{ scale: 1.08, boxShadow: '0 0 16px #8cb4bc55', filter: 'brightness(0.85)' }}
            whileTap={{ scale: 0.95 }}
          >
            Verificar
          </motion.button>
        </div>
      </form>
      {message && (
        <p style={{ fontSize: 24, color: message === 'Meta alcançada!' ? '#228b22' : '#ff0000', fontWeight: 800 }}>
          {message}
        </p>
      )}
    </div>
  );
};

export default WeeklySavingGoal; 