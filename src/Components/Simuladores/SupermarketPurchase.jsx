import { useState } from "react";
import { motion } from "framer-motion";

const SupermarketPurchase = () => {
  const [total, setTotal] = useState(0);

  return (
    <div style={{ textAlign: 'center', padding: '1rem 0' }}>
      <h2 style={{ color: '#8cb4bc', fontWeight: 700 }}>Compra no Supermercado!</h2>
      <p style={{ color: '#444', marginBottom: 16 }}>Clica nos itens para adicionar ao carrinho!</p>
      <div className="simulador-buttons-row">
        <motion.button
          className="market-btn market-blue"
          onClick={() => setTotal(prev => prev + 1)}
          whileHover={{ scale: 1.08, boxShadow: '0 4px 24px #8cb4bc55', filter: 'brightness(0.85)' }}
          whileTap={{ scale: 0.96 }}
        >
          + Leite (1€)
        </motion.button>
        <motion.button
          className="market-btn market-orange"
          onClick={() => setTotal(prev => prev + 2)}
          whileHover={{ scale: 1.08, boxShadow: '0 4px 24px #8cb4bc55', filter: 'brightness(0.85)' }}
          whileTap={{ scale: 0.96 }}
        >
          + Pão (2€)
        </motion.button>
      </div>
      <p style={{ fontSize: 24, color: '#ff4500', fontWeight: 800 }}>Total: {total}€</p>
    </div>
  );
};

export default SupermarketPurchase; 