import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import euriborService from "../../services/euriborService";
import EuriborStatus from "../EuriborStatus";

const HousingLoan = () => {
  const [youth, setYouth] = useState("no");
  const [acquisitionValue, setAcquisitionValue] = useState("150000");
  const [loanValue, setLoanValue] = useState("120000");
  const [transfer, setTransfer] = useState("no");
  const [rateType, setRateType] = useState("variable");
  const [termYears, setTermYears] = useState("40");
  const [indexer, setIndexer] = useState("");
  const [result, setResult] = useState(null);
  const [euriborRates, setEuriborRates] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadEuriborRates();
  }, []);

  const loadEuriborRates = async () => {
    try {
      const rates = await euriborService.getCurrentEuriborRates();
      setEuriborRates(rates);
      setLoading(false);
    } catch (error) {
      console.error('Erro ao carregar taxas Euribor:', error);
      setLoading(false);
    }
  };

  const fixedBaseRates = {
    5: 2.5,
    10: 2.85,
    15: 3.0,
    20: 3.0,
    25: 3.1,
    30: 3.2,
    35: 3.3,
    40: 3.4
  };

  const mixedBaseRates = {
    5: 2.6,
    10: 2.85,
    15: 3.0,
    20: 3.0,
    25: 3.1,
    30: 3.2,
    35: 3.3,
    40: 3.4
  };

  const populateIndexer = (type) => {
    if (type === 'variable') {
      return Object.keys(euriborRates).map(key => ({
        value: key,
        label: `Euribor ${key} (${euriborRates[key]?.toFixed(3) || 'N/A'}%)`
      }));
    } else {
      const rates = type === 'fixed' ? fixedBaseRates : mixedBaseRates;
      return Object.keys(rates).map(years => ({
        value: years,
        label: `${years} anos (${rates[years]}%)`
      }));
    }
  };

  useEffect(() => {
    const indexers = populateIndexer(rateType);
    if (indexers.length > 0) {
      setIndexer(indexers[0].value);
    }
  }, [rateType]);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const acquisition = parseFloat(acquisitionValue) || 0;
    const loan = parseFloat(loanValue) || 0;
    const youthValue = youth === "yes";
    const term = parseInt(termYears) || 0;
    const ltv = loan / acquisition;

    if (ltv > 1) {
      alert('O montante do empréstimo não pode exceder o valor da aquisição.');
      return;
    }
    if (!youthValue && ltv > 0.9) {
      alert('Para rácios superiores a 90%, é necessária a Garantia Estatal para jovens.');
      return;
    }

    let baseRate;
    let baseDisplay;
    if (rateType === 'variable') {
      baseRate = euriborRates[indexer] || 0;
      baseDisplay = `Euribor ${indexer} meses: ${baseRate.toFixed(3)} %`;
    } else {
      baseRate = (rateType === 'fixed' ? fixedBaseRates : mixedBaseRates)[indexer];
      baseDisplay = `Taxa base ${indexer} anos: ${baseRate.toFixed(3)} %`;
    }

    const spread = 1.5;
    const annualRate = baseRate + spread;
    const monthlyRate = annualRate / 100 / 12;
    const n = term * 12;

    if (monthlyRate === 0) {
      alert('A taxa de juro não pode ser zero.');
      return;
    }

    const payment = loan * (monthlyRate * Math.pow(1 + monthlyRate, n)) / (Math.pow(1 + monthlyRate, n) - 1);

    // Approximate TAEG based on type
    let taegDiff;
    if (rateType === 'variable') taegDiff = 0.75;
    else if (rateType === 'fixed') taegDiff = 0.8;
    else taegDiff = 0.7;
    const taeg = annualRate + taegDiff;

    const mtic = payment * n;

    setResult({
      payment: payment.toFixed(2),
      rateType: rateType.charAt(0).toUpperCase() + rateType.slice(1),
      baseDisplay,
      annualRate: annualRate.toFixed(3),
      taeg: taeg.toFixed(1),
      mtic: mtic.toFixed(2)
    });
  };

  const handleYouthChange = (value) => {
    setYouth(value);
    if (value === "yes") {
      alert(`Condições para o Crédito Jovem
Ao selecionar esta oferta declaro que todos os proponentes:
• Estão a simular aquisição de 1ª Habitação Própria Permanente
• Têm domiciliação fiscal em Portugal
• Têm idade igual ou inferior a 35 anos
• Têm rendimentos até ao 8 escalão (inclusive) do IRS
• Têm a situação tributária e contributiva regularizadas
• Não são proprietários de prédio urbano habitacional
• Nunca usufruiu(iram) da garantia pessoal do estado
• Todos os adquirentes do imóvel serão mutuários do empréstimo.`);
    }
  };

  return (
    <div style={{ textAlign: "center", padding: "1rem 0" }}>
      {loading ? (
        <div style={{ padding: "2rem", color: "#666" }}>
          <p>A carregar taxas Euribor atualizadas...</p>
        </div>
      ) : (
        <>
          <EuriborStatus onRatesUpdate={loadEuriborRates} />
          
          <h2 style={{ color: "#8cb4bc", fontWeight: 700 }}>Simule o Seu Empréstimo para Habitação</h2>
          
          <form className="simulador-form" onSubmit={handleSubmit}>
            <label>Possui menos de 36 anos e deseja simular com Garantia Estatal?</label>
            <div style={{ display: "flex", gap: "20px", justifyContent: "center", marginBottom: "10px" }}>
              <label style={{ display: "flex", alignItems: "center", gap: "5px" }}>
                <input 
                  type="radio" 
                  name="youth" 
                  value="no" 
                  checked={youth === "no"}
                  onChange={e => handleYouthChange(e.target.value)}
                />
                Não
              </label>
              <label style={{ display: "flex", alignItems: "center", gap: "5px" }}>
                <input 
                  type="radio" 
                  name="youth" 
                  value="yes" 
                  checked={youth === "yes"}
                  onChange={e => handleYouthChange(e.target.value)}
                />
                Sim
              </label>
            </div>
            
            <label>Valor da Compra do Imóvel (€):</label>
            <input 
              type="number" 
              value={acquisitionValue} 
              onChange={e => setAcquisitionValue(e.target.value)} 
              placeholder="Ex: 150000" 
              min="0" 
              className="simulador-input" 
            />
            
            <label>Montante do Empréstimo (€):</label>
            <input 
              type="number" 
              value={loanValue} 
              onChange={e => setLoanValue(e.target.value)} 
              placeholder="Ex: 120000" 
              min="0" 
              className="simulador-input" 
            />
            
            <label>Transferência de outro banco?</label>
            <div style={{ display: "flex", gap: "20px", justifyContent: "center", marginBottom: "10px" }}>
              <label style={{ display: "flex", alignItems: "center", gap: "5px" }}>
                <input 
                  type="radio" 
                  name="transfer" 
                  value="no" 
                  checked={transfer === "no"}
                  onChange={e => setTransfer(e.target.value)}
                />
                Não
              </label>
              <label style={{ display: "flex", alignItems: "center", gap: "5px" }}>
                <input 
                  type="radio" 
                  name="transfer" 
                  value="yes" 
                  checked={transfer === "yes"}
                  onChange={e => setTransfer(e.target.value)}
                />
                Sim
              </label>
            </div>
            
            <label>Tipo de Taxa de Juro:</label>
            <select 
              value={rateType} 
              onChange={e => setRateType(e.target.value)} 
              className="simulador-select"
            >
              <option value="variable">Taxa Variável</option>
              <option value="fixed">Taxa Fixa</option>
              <option value="mixed">Taxa Mista</option>
            </select>
            
            <label>Prazo Total (anos):</label>
            <input 
              type="number" 
              value={termYears} 
              onChange={e => setTermYears(e.target.value)} 
              placeholder="Ex: 40" 
              min="1" 
              max="40" 
              className="simulador-input" 
            />
            
            <label>Indexante:</label>
            <select 
              value={indexer} 
              onChange={e => setIndexer(e.target.value)} 
              className="simulador-select"
            >
              {populateIndexer(rateType).map(option => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
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
          
          {result && (
            <div style={{ marginTop: 20, padding: "1rem", backgroundColor: "#f8f9fa", borderRadius: "10px", border: "2px solid #eac862" }}>
              <h3 style={{ color: "#8cb4bc", fontWeight: 700, marginBottom: "0.5rem" }}>Opções Disponíveis</h3>
              <div style={{ textAlign: "left", fontSize: "0.95rem", color: "#666" }}>
                <p style={{ fontWeight: 600, marginBottom: "0.5rem" }}>Prestação Base</p>
                <p style={{ fontSize: "1.3rem", color: "#4b0082", fontWeight: 700, marginBottom: "0.5rem" }}>
                  {result.payment} €
                </p>
                <p style={{ fontSize: "0.9rem", color: "#888", marginBottom: "0.5rem" }}>sem produtos de venda cruzada</p>
                <p><strong>Tipo taxa:</strong> {result.rateType}</p>
                <p><strong>{result.baseDisplay}</strong></p>
                <p><strong>Spread Base:</strong> 1,500 %</p>
                <p><strong>TAN:</strong> {result.annualRate} %</p>
                <p><strong>TAEG:</strong> {result.taeg} %</p>
                <p><strong>MTIC:</strong> {result.mtic} €</p>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default HousingLoan; 