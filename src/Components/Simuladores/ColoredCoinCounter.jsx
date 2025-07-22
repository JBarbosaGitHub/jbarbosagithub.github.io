import { useState } from "react";

const ColoredCoinCounter = () => {
  const [total, setTotal] = useState(0);
  return (
    <div style={{ textAlign: 'center', padding: '1rem 0' }}>
      <h2 style={{ color: '#8cb4bc', fontWeight: 700 }}>Conta as Moedas Coloridas!</h2>
      <p style={{ color: '#444', marginBottom: 16 }}>Clica nas moedas para adicionar ao mealheiro!</p>
      <div className="simulador-buttons-row">
        <button className="coin-btn coin-red" onClick={() => setTotal(prev => prev + 1)}>+1€ Vermelha</button>
        <button className="coin-btn coin-green" onClick={() => setTotal(prev => prev + 2)}>+2€ Verde</button>
        <button className="coin-btn coin-blue" onClick={() => setTotal(prev => prev + 3)}>+3€ Azul</button>
      </div>
      <p style={{ fontSize: 28, color: '#eac862', fontWeight: 800 }}>Total: {total}€</p>
      <p style={{ color: '#7d925c', fontWeight: 600 }}>{total > 0 ? 'Boa! Continua!' : ''}</p>
    </div>
  );
};

export default ColoredCoinCounter; 