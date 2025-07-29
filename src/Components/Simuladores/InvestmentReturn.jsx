import { useState } from "react";
import { motion } from "framer-motion";

const InvestmentReturn = () => {
  const [investment, setInvestment] = useState("");
  const [rate, setRate] = useState("");
  const [years, setYears] = useState("");
  const [result, setResult] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    const inv = parseFloat(investment) || 0;
    const r = parseFloat(rate) / 100 || 0;
    const y = parseInt(years) || 0;
    const retorno = inv * Math.pow(1 + r, y);
    setResult({ retorno, risco: r > 0.08 });
  };

  return (
    <div style={{ textAlign: "center", padding: "1rem 0" }}>
      <h2 style={{ color: "#8cb4bc", fontWeight: 700 }}>Retorno de Ações!</h2>
      <form className="simulador-form" onSubmit={handleSubmit}>
        <label>Investimento (€):</label>
        <input type="number" value={investment} onChange={e => setInvestment(e.target.value)} placeholder="Ex: 2000" min="0" className="simulador-input" />
        <label>Taxa esperada (%):</label>
        <input type="number" value={rate} onChange={e => setRate(e.target.value)} placeholder="Ex: 10" min="0" className="simulador-input" />
        <label>Anos:</label>
        <input type="number" value={years} onChange={e => setYears(e.target.value)} placeholder="Ex: 5" min="0" className="simulador-input" />
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
      {result && (
        <div style={{ marginTop: 16 }}>
          <p style={{ fontSize: 22, color: "#4b0082", fontWeight: 800 }}>
            Retorno: €{result.retorno.toFixed(2)}{result.risco ? " (Alto risco)" : ""}
          </p>
        </div>
      )}
    </div>
  );
};

export default InvestmentReturn;