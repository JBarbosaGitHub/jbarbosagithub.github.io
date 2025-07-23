import { useState } from "react";
import { motion } from "framer-motion";

const BookSaving = () => {
  const [monthlySaving, setMonthlySaving] = useState(0);
  const [months, setMonths] = useState(0);
  const [total, setTotal] = useState(null);
  return (
    <div style={{ textAlign: 'center', padding: '1rem 0' }}>
      <h2 style={{ color: '#8cb4bc', fontWeight: 700 }}>Poupa para Comprar um Livro!</h2>
      <form className="simulador-form" onSubmit={e => { e.preventDefault(); setTotal(monthlySaving * months); }}>
        <label>Poupa por mês (€):</label>
        <input type="number" value={monthlySaving} onChange={e => setMonthlySaving(Number(e.target.value))} placeholder="Ex: 2" className="simulador-input" />
        <label>Meses:</label>
        <input type="number" value={months} onChange={e => setMonths(Number(e.target.value))} placeholder="Ex: 4" className="simulador-input" />
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
        <p style={{ fontSize: 22, color: '#eac862', fontWeight: 800 }}>Total poupado: €{total} - {total >= 15 ? 'Podes comprar!' : 'Continua!'}</p>
      )}
    </div>
  );
};

export default BookSaving; 