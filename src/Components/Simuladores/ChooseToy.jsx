import React, { useState } from 'react';
import { motion } from 'framer-motion';

const toys = [
  { name: 'Boneca', emoji: '🧸' },
  { name: 'Carrinho', emoji: '🚗' },
  { name: 'Bola', emoji: '⚽' },
  { name: 'Puzzle', emoji: '🧩' }
];

const ChooseToy = () => {
  const [chosenToy, setChosenToy] = useState(null);
  const [message, setMessage] = useState('');

  const handleChoose = (toy) => {
    if (!chosenToy) {
      setChosenToy(toy);
      setMessage(`Brinquedo escolhido: ${toy.name}!`);
    } else {
      setMessage('Só podes escolher um brinquedo por vez!');
    }
  };

  return (
    <div className="simulador-main-box" style={{ textAlign: 'center', padding: '1rem 0' }}>
      <h2>Escolhe um Brinquedo!</h2>
      <p>Clica no brinquedo que queres (custa 3 estrelas)!</p>
      <div style={{ display: 'flex', justifyContent: 'center', gap: 16, flexWrap: 'wrap', margin: '16px 0' }}>
        {toys.map((toy) => (
          <motion.button
            key={toy.name}
            className="simulador-submit-btn"
            whileHover={{ scale: 1.08, boxShadow: '0 0 16px #8cb4bc55', filter: 'brightness(0.85)' }}
            whileTap={{ scale: 0.95 }}
            onClick={() => handleChoose(toy)}
            style={{ fontSize: 28, background: '#ff69b4', margin: 4, minWidth: 90 }}
            disabled={!!chosenToy}
          >
            <span style={{ fontSize: 32 }}>{toy.emoji}</span><br />{toy.name}<br />⭐⭐⭐
          </motion.button>
        ))}
      </div>
      <p style={{ fontSize: 24, color: '#8b4513', margin: 8 }}>Estrelas gastas: {chosenToy ? 3 : 0}</p>
      <p style={{ minHeight: 24 }}>{message}</p>
    </div>
  );
};

export default ChooseToy; 