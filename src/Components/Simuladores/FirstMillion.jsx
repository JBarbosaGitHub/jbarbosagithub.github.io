import { useState } from "react";
import { motion } from "framer-motion";

const periods = [5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55, 60];

const FirstMillion = () => {
  const [goalAmount, setGoalAmount] = useState(1000000);
  const [monthlyReturn, setMonthlyReturn] = useState(0.5);
  const [investmentYears, setInvestmentYears] = useState(10);
  const [results, setResults] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    const goal = parseFloat(goalAmount) || 0;
    const monthlyR = parseFloat(monthlyReturn) / 100 || 0;
    const selectedYears = parseInt(investmentYears) || 0;
    const table = periods.map(years => {
      const months = years * 12;
      const monthlyInvestment = goal * monthlyR / (Math.pow(1 + monthlyR, months) - 1);
      return { years, months, monthlyInvestment };
    });
    setResults({ table, selectedYears, goal, monthlyR });
  };

  return (
    <div style={{ textAlign: "center", padding: "1rem 0" }}>
      <h2 style={{ color: "#8cb4bc", fontWeight: 700 }}>Simulador do 1º Milhão</h2>
      <form className="simulador-form" onSubmit={handleSubmit}>
        <label>Montante do Objetivo (€):</label>
        <input type="number" className="simulador-input" min="0" value={goalAmount} onChange={e => setGoalAmount(e.target.value)} />
        <label>Rentabilidade Mensal (%):</label>
        <input type="number" className="simulador-input" min="0" step="0.01" value={monthlyReturn} onChange={e => setMonthlyReturn(e.target.value)} />
        <label>Período de Investimento (anos):</label>
        <select className="simulador-input" value={investmentYears} onChange={e => setInvestmentYears(e.target.value)}>
          {periods.map(y => <option key={y} value={y}>{y} anos</option>)}
        </select>
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
      {results && (
        <div style={{ marginTop: 24, background: "#f8f9fa", borderRadius: 12, padding: 18, display: "inline-block", maxWidth: 600 }}>
          <h3 style={{ color: '#8cb4bc', fontWeight: 700, marginBottom: 12 }}>Resultados da Simulação</h3>
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', fontSize: 15, borderCollapse: 'collapse' }}>
              <thead style={{ background: '#f3f3f3' }}>
                <tr>
                  <th style={{ padding: 6 }}>Anos</th>
                  <th style={{ padding: 6 }}>Nº de Meses</th>
                  <th style={{ padding: 6 }}>Rentabilidade Mensal</th>
                  <th style={{ padding: 6 }}>Objetivo</th>
                  <th style={{ padding: 6 }}>Investimento Mensal</th>
                </tr>
              </thead>
              <tbody>
                {results.table.map(row => (
                  <tr key={row.years} style={row.years === results.selectedYears ? { background: '#e3f0fa', fontWeight: 700 } : {}}>
                    <td style={{ padding: 6 }}>{row.years}</td>
                    <td style={{ padding: 6 }}>{row.months}</td>
                    <td style={{ padding: 6 }}>{(results.monthlyR * 100).toFixed(2)}%</td>
                    <td style={{ padding: 6 }}>€{results.goal.toLocaleString('pt-PT', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</td>
                    <td style={{ padding: 6 }}>€{row.monthlyInvestment.toLocaleString('pt-PT', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default FirstMillion;