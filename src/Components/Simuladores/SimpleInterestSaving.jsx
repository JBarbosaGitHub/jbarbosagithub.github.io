import { useState } from "react";
import { motion } from "framer-motion";

const SimpleInterestSaving = () => {
  const [initial, setInitial] = useState(0);
  const [months, setMonths] = useState(0);
  const [result, setResult] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    const interest = initial * 0.01 * months;
    const total = initial + interest;
    setResult({ total, interest });
  };

  return (
    <div style={{ textAlign: 'center', padding: '1rem 0' }}>
      <h2 style={{ color: '#8cb4bc', fontWeight: 700 }}>Poupança com Juros!</h2>
      <form className="simulador-form" onSubmit={handleSubmit}>
        <label>Valor inicial (€):</label>
        <input type="number" value={initial} onChange={e => setInitial(Number(e.target.value))} placeholder="Ex: 10" className="simulador-input" />
        <label>Meses:</label>
        <input type="number" value={months} onChange={e => setMonths(Number(e.target.value))} placeholder="Ex: 6" className="simulador-input" />
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
        <p style={{ fontSize: 24, color: '#228b22', fontWeight: 800 }}>
          Total: €{result.total.toFixed(2)} (Juros: €{result.interest.toFixed(2)})
        </p>
      )}
    </div>
  );
};

export default SimpleInterestSaving; 