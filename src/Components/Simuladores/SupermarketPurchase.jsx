import { useState } from "react";
import { motion } from "framer-motion";

const SupermarketPurchase = () => {
  const [item, setItem] = useState('');
  const [price, setPrice] = useState('');
  const [quantity, setQuantity] = useState('');
  const [items, setItems] = useState([]);
  const [total, setTotal] = useState(0);

  const handleAdd = (e) => {
    e.preventDefault();
    if (item && price && quantity) {
      setItems([...items, { item, price: parseFloat(price), quantity: parseInt(quantity) }]);
      setTotal(total + parseFloat(price) * parseInt(quantity));
      setItem('');
      setPrice('');
      setQuantity('');
    }
  };

  return (
    <div style={{ textAlign: 'center', padding: '1rem 0' }}>
      <h2 style={{ color: '#8cb4bc', fontWeight: 700 }}>Compra no Supermercado!</h2>
      <form className="simulador-form" onSubmit={handleAdd}>
        <label>Item:</label>
        <input type="text" value={item} onChange={e => setItem(e.target.value)} placeholder="Ex: Maçã" className="simulador-input" />
        <label>Preço (€):</label>
        <input type="number" value={price} onChange={e => setPrice(e.target.value)} placeholder="Ex: 2" min="0" className="simulador-input" />
        <label>Quantidade:</label>
        <input type="number" value={quantity} onChange={e => setQuantity(e.target.value)} placeholder="Ex: 1" min="0" className="simulador-input" />
        <div className="simulador-submit-row">
          <motion.button
            type="submit"
            className="simulador-submit-btn"
            whileHover={{ scale: 1.08, boxShadow: '0 4px 24px #8cb4bc55', filter: 'brightness(0.85)' }}
            whileTap={{ scale: 0.96 }}
          >
            Adicionar
          </motion.button>
        </div>
      </form>
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {items.map((i, idx) => (
          <li key={idx}>{i.quantity}x {i.item} - €{(i.price * i.quantity).toFixed(2)}</li>
        ))}
      </ul>
      <p style={{ fontSize: 22, color: '#eac862', fontWeight: 800 }}>Total: €{total.toFixed(2)}</p>
    </div>
  );
};

export default SupermarketPurchase; 