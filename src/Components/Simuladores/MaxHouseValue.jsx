import { useState } from "react";
import { motion } from "framer-motion";

const MaxHouseValue = () => {
  const [exemption, setExemption] = useState("no");
  const [downPayment, setDownPayment] = useState("");
  const [income, setIncome] = useState("");
  const [expenses, setExpenses] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [interestRate, setInterestRate] = useState("3.5");
  const [result, setResult] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const downPaymentValue = parseFloat(downPayment) || 0;
    const incomeValue = parseFloat(income) || 0;
    const expensesValue = parseFloat(expenses) || 0;
    const annualRate = parseFloat(interestRate) / 100 || 0;
    
    if (expensesValue >= incomeValue) {
      alert('As despesas não podem ser iguais ou superiores aos rendimentos.');
      return;
    }

    // Calculate age as of July 30, 2025
    const [day, month, year] = birthDate.split('/').map(Number);
    if (!day || !month || !year) {
      alert('Por favor, insira uma data de nascimento válida (dd/mm/aaaa).');
      return;
    }
    
    const currentDate = new Date(2025, 6, 30); // July is 6 (0-indexed)
    const birthDateObj = new Date(year, month - 1, day);
    let age = currentDate.getFullYear() - birthDateObj.getFullYear();
    if (currentDate.getMonth() < birthDateObj.getMonth() || (currentDate.getMonth() === birthDateObj.getMonth() && currentDate.getDate() < birthDateObj.getDate())) {
      age--;
    }

    // Determine max loan term in years
    let maxTermYears;
    if (age <= 30) {
      maxTermYears = 40;
    } else if (age <= 35) {
      maxTermYears = 37;
    } else {
      maxTermYears = 35;
    }
    const n = maxTermYears * 12; // months

    const disposable = incomeValue - expensesValue;
    const maxMonthlyPayment = disposable * 0.35; // 35% DSTI threshold
    const monthlyRate = annualRate / 12;

    if (monthlyRate === 0) {
      alert('A taxa de juro não pode ser zero.');
      return;
    }

    // Max loan from affordability
    const pow = Math.pow(1 + monthlyRate, -n);
    const maxLoanAfford = maxMonthlyPayment * (1 - pow) / monthlyRate;

    // Max loan from LTV (90%)
    const maxLoanLTV = 9 * downPaymentValue;

    // Overall max loan
    const maxLoan = Math.min(maxLoanAfford, maxLoanLTV);

    // Max house price
    const maxHousePrice = maxLoan + downPaymentValue;

    setResult({
      maxHousePrice: maxHousePrice.toFixed(2),
      maxLoan: maxLoan.toFixed(2),
      maxMonthlyPayment: maxMonthlyPayment.toFixed(2),
      maxTermYears: maxTermYears
    });
  };

  return (
    <div style={{ textAlign: "center", padding: "1rem 0" }}>
      <h2 style={{ color: "#8cb4bc", fontWeight: 700 }}>Valor máximo da casa</h2>
      <p style={{ color: "#666", fontSize: "1rem", marginBottom: "1.5rem" }}>
        Qual é o valor máximo da casa que posso comprar?
      </p>
      
      <form className="simulador-form" onSubmit={handleSubmit}>
        <label>Cumpres os requisitos para a isenção de IMT e IS para jovens?</label>
        <div style={{ display: "flex", gap: "20px", justifyContent: "center", marginBottom: "10px" }}>
          <label style={{ display: "flex", alignItems: "center", gap: "5px" }}>
            <input 
              type="radio" 
              name="exemption" 
              value="no" 
              checked={exemption === "no"}
              onChange={e => setExemption(e.target.value)}
            />
            Não
          </label>
          <label style={{ display: "flex", alignItems: "center", gap: "5px" }}>
            <input 
              type="radio" 
              name="exemption" 
              value="yes" 
              checked={exemption === "yes"}
              onChange={e => setExemption(e.target.value)}
            />
            Sim
          </label>
        </div>
        
        <label>Quanto dinheiro tens disponível para a entrada? (€):</label>
        <input 
          type="number" 
          value={downPayment} 
          onChange={e => setDownPayment(e.target.value)} 
          placeholder="Ex: 30000" 
          min="0" 
          className="simulador-input" 
        />
        
        <label>Qual o valor dos rendimentos mensais? (€):</label>
        <input 
          type="number" 
          value={income} 
          onChange={e => setIncome(e.target.value)} 
          placeholder="Ex: 1000" 
          min="0" 
          className="simulador-input" 
        />
        
        <label>Qual o valor das despesas mensais? (€):</label>
        <input 
          type="number" 
          value={expenses} 
          onChange={e => setExpenses(e.target.value)} 
          placeholder="Ex: 300" 
          min="0" 
          className="simulador-input" 
        />
        
        <label>Data de nascimento do titular mais velho:</label>
        <input 
          type="text" 
          value={birthDate} 
          onChange={e => setBirthDate(e.target.value)} 
          placeholder="dd/mm/aaaa" 
          className="simulador-input" 
        />
        
        <label>Taxa de juro (Spread + Euribor) (%):</label>
        <input 
          type="number" 
          step="0.1" 
          value={interestRate} 
          onChange={e => setInterestRate(e.target.value)} 
          placeholder="Ex: 3.5" 
          min="0" 
          className="simulador-input" 
        />
        <p style={{ fontSize: "0.9rem", color: "#666", marginTop: "5px", marginBottom: "10px" }}>
          Euribor hoje: 3 meses (2.026%) | 6 meses (2.083%) | 12 meses (2.116%)
        </p>
        
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
            Valor máximo da casa: €{result.maxHousePrice}
          </p>
          <div style={{ fontSize: "0.95rem", color: "#666", textAlign: "left", marginTop: "10px" }}>
            <p><strong>Detalhes:</strong></p>
            <p>• Empréstimo máximo: €{result.maxLoan}</p>
            <p>• Prestação mensal máxima: €{result.maxMonthlyPayment}</p>
            <p>• Prazo máximo: {result.maxTermYears} anos</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default MaxHouseValue; 