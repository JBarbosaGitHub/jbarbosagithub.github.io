import { useState } from "react";
import { motion } from "framer-motion";

const ColoredCoinCounter = () => {
  const [total, setTotal] = useState(0);
  return (
    <div style={{ textAlign: 'center', padding: '1rem 0' }}>
      <h2 style={{ color: '#8cb4bc', fontWeight: 700 }}>Conta as Moedas Coloridas!</h2>
      <p style={{ color: '#444', marginBottom: 16 }}>Clica nas moedas para adicionar ao mealheiro!</p>
      <div className="simulador-buttons-row">
        <motion.button
          className="coin-btn coin-red"
          onClick={() => setTotal(prev => prev + 1)}
          whileHover={{ scale: 1.08, boxShadow: '0 4px 24px #8cb4bc55', filter: 'brightness(0.85)' }}
          whileTap={{ scale: 0.96 }}
        >
          +1€ Vermelha
        </motion.button>
        <motion.button
          className="coin-btn coin-green"
          onClick={() => setTotal(prev => prev + 2)}
          whileHover={{ scale: 1.08, boxShadow: '0 4px 24px #8cb4bc55', filter: 'brightness(0.85)' }}
          whileTap={{ scale: 0.96 }}
        >
          +2€ Verde
        </motion.button>
        <motion.button
          className="coin-btn coin-blue"
          onClick={() => setTotal(prev => prev + 3)}
          whileHover={{ scale: 1.08, boxShadow: '0 4px 24px #8cb4bc55', filter: 'brightness(0.85)' }}
          whileTap={{ scale: 0.96 }}
        >
          +3€ Azul
        </motion.button>
      </div>
      <p style={{ fontSize: 28, color: '#eac862', fontWeight: 800 }}>Total: {total}€</p>
      <p style={{ color: '#7d925c', fontWeight: 600 }}>{total > 0 ? 'Boa! Continua!' : ''}</p>
    </div>
  );
};

export default ColoredCoinCounter; 