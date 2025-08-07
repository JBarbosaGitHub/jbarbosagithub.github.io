import { useState } from "react";
import { motion } from "framer-motion";

const RetirementPlanning = () => {
  const [expenses, setExpenses] = useState("");
  const [rate, setRate] = useState("");
  const [years, setYears] = useState("");
  const [result, setResult] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    const d = parseFloat(expenses) || 0;
    const r = parseFloat(rate) / 100 || 0;
    const y = parseInt(years) || 0;
    let amount = 0;
    if (r > 0) {
      amount = d * (1 - Math.pow(1 + r, -y)) / r;
    } else {
      amount = d * y;
    }
    setResult(amount);
  };

  return (
    <div style={{ textAlign: "center", padding: "1rem 0" }}>
      <h2 style={{ color: "#8cb4bc", fontWeight: 700 }}>Planeja a tua Reforma!</h2>
      <form className="simulador-form" onSubmit={handleSubmit}>
        <label>Despesas anuais na Reforma (€):</label>
        <input type="number" value={expenses} onChange={e => setExpenses(e.target.value)} placeholder="Ex: 20000" min="0" className="simulador-input" />
        <label>Taxa de retorno (%):</label>
        <input type="number" value={rate} onChange={e => setRate(e.target.value)} placeholder="Ex: 5" min="0" className="simulador-input" />
        <label>Anos de Reforma:</label>
        <input type="number" value={years} onChange={e => setYears(e.target.value)} placeholder="Ex: 25" min="0" className="simulador-input" />
        <div className="simulador-submit-row">
          <motion.button
            type="submit"
            className="simulador-submit-btn"
            whileHover={{ scale: 1.08, boxShadow: "0 4px 24px #8cb4bc55", filter: "brightness(0.85)" }}
            whileTap={{ scale: 0.96 }}
          >
            Calcular
          </motion.button>
        </div>
      </form>
      {result !== null && (
        <p style={{ fontSize: 22, color: "#800080", fontWeight: 800, marginTop: 16 }}>
          Montante necessário: €{result.toLocaleString('pt-PT', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
        </p>
      )}
    </div>
  );
};

export default RetirementPlanning;