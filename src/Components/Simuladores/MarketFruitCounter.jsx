import { useState } from "react";

const MarketFruitCounter = () => {
  const [total, setTotal] = useState(0);

  return (
    <div style={{ textAlign: 'center', padding: '1rem 0' }}>
      <h2 style={{ color: '#8cb4bc', fontWeight: 700 }}>Conta Frutas no Mercado!</h2>
      <p style={{ color: '#444', marginBottom: 16 }}>Clica para adicionar frutas!</p>
      <div className="simulador-buttons-row">
        <button className="fruit-btn fruit-yellow" onClick={() => setTotal(prev => prev + 1.5)}>+ Banana</button>
        <button className="fruit-btn fruit-red" onClick={() => setTotal(prev => prev + 1)}>+ Maçã</button>
        <button className="fruit-btn fruit-green" onClick={() => setTotal(prev => prev + 2)}>+ Pêra</button>
      </div>
      <p style={{ fontSize: 28, color: '#006400', fontWeight: 800 }}>Total: {total}€</p>
    </div>
  );
};

export default MarketFruitCounter; 