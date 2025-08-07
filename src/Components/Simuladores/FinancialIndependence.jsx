import { useState } from "react";
import { motion } from "framer-motion";

const FinancialIndependence = () => {
  // Acumulação
  const [initialInvestment, setInitialInvestment] = useState(10000);
  const [investmentYears, setInvestmentYears] = useState(35);
  const [monthlyContribution, setMonthlyContribution] = useState(400);
  const [annualReturn, setAnnualReturn] = useState(8);
  // Rendimento
  const [retirementYears, setRetirementYears] = useState(30);
  const [retirementReturn, setRetirementReturn] = useState(1);
  // Resultado
  const [result, setResult] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Fase de acumulação
    const initial = parseFloat(initialInvestment) || 0;
    const years = parseInt(investmentYears) || 0;
    const monthly = parseFloat(monthlyContribution) || 0;
    const annual = parseFloat(annualReturn) / 100 || 0;
    // Fase de rendimento
    const retYears = parseInt(retirementYears) || 0;
    const retReturn = parseFloat(retirementReturn) / 100 || 0;
    // Cálculo
    const monthlyReturn = Math.pow(1 + annual, 1 / 12) - 1;
    const nAccumulation = years * 12;
    const futureValueInitial = initial * Math.pow(1 + monthlyReturn, nAccumulation);
    const futureValueContributions = monthly * (Math.pow(1 + monthlyReturn, nAccumulation) - 1) / monthlyReturn;
    const accumulatedWealth = futureValueInitial + futureValueContributions;
    // Cálculo da retirada
    let withdrawalText = "";
    if (retYears === 0) {
      const withdrawal = accumulatedWealth * retReturn;
      withdrawalText = `Poderá retirar €${withdrawal.toFixed(2)} por mês indefinidamente.`;
    } else {
      const nRetirement = retYears * 12;
      const withdrawal = accumulatedWealth * retReturn / (1 - Math.pow(1 + retReturn, -nRetirement));
      withdrawalText = `Poderá retirar €${withdrawal.toFixed(2)} por mês durante ${nRetirement} meses (${retYears} anos).`;
    }
    setResult({
      accumulatedWealth: accumulatedWealth.toFixed(2),
      withdrawalText,
    });
  };

  return (
    <div style={{ textAlign: "center", padding: "1rem 0" }}>
      <h2 style={{ color: "#8cb4bc", fontWeight: 700 }}>Simulador de Independência Financeira</h2>
      <form className="simulador-form" onSubmit={handleSubmit}>
        {/* Fase de Acumulação */}
        <label>Capital inicial disponível (€):</label>
        <input type="number" className="simulador-input" min="0" value={initialInvestment} onChange={e => setInitialInvestment(e.target.value)} />
        <label>Período de investimento (anos):</label>
        <input type="number" className="simulador-input" min="0" value={investmentYears} onChange={e => setInvestmentYears(e.target.value)} />
        <label>Contribuição mensal (€):</label>
        <input type="number" className="simulador-input" min="0" value={monthlyContribution} onChange={e => setMonthlyContribution(e.target.value)} />
        <label>Rentabilidade anual (%):</label>
        <input type="number" className="simulador-input" min="0" step="0.01" value={annualReturn} onChange={e => setAnnualReturn(e.target.value)} />
        {/* Fase de Rendimento */}
        <label>Período de retirada (anos, 0 para indefinido):</label>
        <input type="number" className="simulador-input" min="0" value={retirementYears} onChange={e => setRetirementYears(e.target.value)} />
        <label>Rentabilidade mensal na reforma (%):</label>
        <input type="number" className="simulador-input" min="0" step="0.01" value={retirementReturn} onChange={e => setRetirementReturn(e.target.value)} />
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
        <div style={{ marginTop: 24, background: "#f8f9fa", borderRadius: 12, padding: 18, display: "inline-block" }}>
          <p style={{ fontWeight: 700, color: "#8cb4bc" }}>Fase de Acumulação</p>
          <p>Património acumulado: €{Number(result.accumulatedWealth).toLocaleString('pt-PT', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
          <p style={{ fontWeight: 700, color: "#eac862", marginTop: 12 }}>Fase de Rendimento</p>
          <p>{result.withdrawalText}</p>
        </div>
      )}
    </div>
  );
};

export default FinancialIndependence;