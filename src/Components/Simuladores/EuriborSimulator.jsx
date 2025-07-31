import { useState } from "react";
import { motion } from "framer-motion";

const EuriborSimulator = () => {
  const [loanAmount, setLoanAmount] = useState("150000");
  const [loanTerm, setLoanTerm] = useState("480");
  const [firstPayment, setFirstPayment] = useState("");
  const [euriborTerm, setEuriborTerm] = useState("");
  const [customRate, setCustomRate] = useState("");
  const [spread, setSpread] = useState("1.5");
  const [budget, setBudget] = useState("1000");
  const [result, setResult] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const amount = parseFloat(loanAmount) || 0;
    const term = parseInt(loanTerm) || 0;
    const spreadValue = parseFloat(spread) / 100 || 0;
    const budgetValue = parseFloat(budget) || 0;
    
    let euriborRate;
    
    if (euriborTerm === 'custom') {
      euriborRate = parseFloat(customRate) / 100 || 0;
    } else {
      const rates = {
        '3': 0.03901, // March 2025, 3-month Euribor
        '6': 0.03715, // March 2025, 6-month Euribor
        '12': 0.02398 // March 2025, 12-month Euribor
      };
      euriborRate = rates[euriborTerm] || 0;
    }

    if (!euriborRate || isNaN(euriborRate)) {
      alert('Por favor, insira uma taxa Euribor válida.');
      return;
    }

    const monthlyRate = (euriborRate + spreadValue) / 12;
    const n = term;
    const monthlyPayment = amount * (monthlyRate * Math.pow(1 + monthlyRate, n)) / (Math.pow(1 + monthlyRate, n) - 1);
    const budgetRatio = (monthlyPayment / budgetValue) * 100;

    setResult({
      monthlyPayment: monthlyPayment.toFixed(2),
      budgetRatio: budgetRatio.toFixed(1),
      isHighRisk: budgetRatio > 30
    });
  };

  return (
    <div style={{ textAlign: "center", padding: "1rem 0" }}>
      <h2 style={{ color: "#8cb4bc", fontWeight: 700 }}>Simulador Euribor 2025</h2>
      <p style={{ color: "#666", fontSize: "1rem", marginBottom: "1.5rem" }}>
        Simula o impacto da Taxa Euribor na prestação de crédito
      </p>
      
      <form className="simulador-form" onSubmit={handleSubmit}>
        <label>Valor do Financiamento (€):</label>
        <input 
          type="number" 
          value={loanAmount} 
          onChange={e => setLoanAmount(e.target.value)} 
          placeholder="Ex: 150000" 
          min="0" 
          className="simulador-input" 
        />
        
        <label>Prazo (meses):</label>
        <input 
          type="number" 
          value={loanTerm} 
          onChange={e => setLoanTerm(e.target.value)} 
          placeholder="Ex: 480" 
          min="1" 
          className="simulador-input" 
        />
        
        <label>Mês da 1ª Prestação:</label>
        <input 
          type="text" 
          value={firstPayment} 
          onChange={e => setFirstPayment(e.target.value)} 
          placeholder="mm/aaaa" 
          className="simulador-input" 
        />
        
        <label>Prazo da Euribor:</label>
        <select 
          value={euriborTerm} 
          onChange={e => setEuriborTerm(e.target.value)} 
          className="simulador-select"
        >
          <option value="">Seleciona um prazo</option>
          <option value="3">3 meses (3,901%)</option>
          <option value="6">6 meses (3,715%)</option>
          <option value="12">12 meses (2,398%)</option>
          <option value="custom">Outra taxa</option>
        </select>
        
        {euriborTerm === 'custom' && (
          <>
            <label>Taxa Euribor Personalizada (%):</label>
            <input 
              type="number" 
              step="0.001" 
              value={customRate} 
              onChange={e => setCustomRate(e.target.value)} 
              placeholder="Ex: 3.5" 
              min="0" 
              className="simulador-input" 
            />
          </>
        )}
        
        <label>Spread (%):</label>
        <input 
          type="number" 
          step="0.1" 
          value={spread} 
          onChange={e => setSpread(e.target.value)} 
          placeholder="Ex: 1.5" 
          min="0" 
          className="simulador-input" 
        />
        
        <label>Orçamento Familiar Mensal (€):</label>
        <input 
          type="number" 
          value={budget} 
          onChange={e => setBudget(e.target.value)} 
          placeholder="Ex: 1000" 
          min="0" 
          className="simulador-input" 
        />
        
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
        <div style={{ marginTop: 20, padding: "1rem", backgroundColor: "#f8f9fa", borderRadius: "10px", border: "2px solid #eac862" }}>
          <h3 style={{ color: "#8cb4bc", fontWeight: 700, marginBottom: "0.5rem" }}>Resultado da Simulação</h3>
          <p style={{ fontSize: "1.2rem", color: "#4b0082", fontWeight: 600, marginBottom: "0.5rem" }}>
            Prestação Mensal: €{result.monthlyPayment}
          </p>
          <p style={{ 
            fontSize: "1rem", 
            color: result.isHighRisk ? "#d32f2f" : "#2e7d32", 
            fontWeight: 500 
          }}>
            {result.isHighRisk 
              ? `Atenção: A prestação representa ${result.budgetRatio}% do seu orçamento mensal, acima do recomendado (30%). Considere renegociar ou ajustar as condições do crédito.`
              : `A prestação representa ${result.budgetRatio}% do seu orçamento mensal, dentro do limite recomendado (30%).`
            }
          </p>
        </div>
      )}
    </div>
  );
};

export default EuriborSimulator; 