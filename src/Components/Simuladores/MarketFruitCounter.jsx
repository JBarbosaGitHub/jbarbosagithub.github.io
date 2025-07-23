import { useState } from "react";
import { motion } from "framer-motion";

const MarketFruitCounter = () => {
  const [total, setTotal] = useState(0);

  return (
    <div style={{ textAlign: 'center', padding: '1rem 0' }}>
      <h2 style={{ color: '#8cb4bc', fontWeight: 700 }}>Conta Frutas no Mercado!</h2>
      <p style={{ color: '#444', marginBottom: 16 }}>Clica para adicionar frutas!</p>
      <div className="simulador-buttons-row">
        <motion.button
          className="fruit-btn fruit-yellow"
          onClick={() => setTotal(prev => prev + 1.5)}
          whileHover={{ scale: 1.08, boxShadow: '0 4px 24px #8cb4bc55', filter: 'brightness(0.85)' }}
          whileTap={{ scale: 0.96 }}
        >
          + Banana
        </motion.button>
        <motion.button
          className="fruit-btn fruit-red"
          onClick={() => setTotal(prev => prev + 1)}
          whileHover={{ scale: 1.08, boxShadow: '0 4px 24px #8cb4bc55', filter: 'brightness(0.85)' }}
          whileTap={{ scale: 0.96 }}
        >
          + Maçã
        </motion.button>
        <motion.button
          className="fruit-btn fruit-green"
          onClick={() => setTotal(prev => prev + 2)}
          whileHover={{ scale: 1.08, boxShadow: '0 4px 24px #8cb4bc55', filter: 'brightness(0.85)' }}
          whileTap={{ scale: 0.96 }}
        >
          + Pêra
        </motion.button>
      </div>
      <p style={{ fontSize: 28, color: '#006400', fontWeight: 800 }}>Total: {total}€</p>
    </div>
  );
};

export default MarketFruitCounter; 