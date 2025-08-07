import { useState } from "react";
import { motion } from "framer-motion";

const defaultItems = [
  { name: 'Jantar a dois em restaurante', price: 200 },
  { name: 'Roupa nova', price: 150 },
  { name: 'Telemóvel novo', price: 2500 },
  { name: 'Viagem de férias', price: 5000 },
  { name: 'Carro novo (popular)', price: 85000 },
  { name: 'Casa própria', price: 400000 },
  { name: 'Bilhete de cinema', price: 30 },
  { name: 'Subscrição mensal de streaming', price: 45 },
  { name: 'Ténis de ginásio', price: 1000 },
  { name: 'Perfume', price: 490 }
];

function formatHours(hours) {
  const wholeHours = Math.floor(hours);
  const minutes = Math.round((hours - wholeHours) * 60);
  return `${wholeHours}h ${minutes.toString().padStart(2, '0')}min`;
}
function formatDays(hours, dailyHours) {
  const days = Math.floor(hours / dailyHours);
  const remainingHours = hours % dailyHours;
  const wholeHours = Math.floor(remainingHours);
  const minutes = Math.round((remainingHours - wholeHours) * 60);
  return `${days}d ${wholeHours}h ${minutes.toString().padStart(2, '0')}min`;
}

const LifeTimeCost = () => {
  const [monthlySalary, setMonthlySalary] = useState(3000);
  const [monthlyHours, setMonthlyHours] = useState(220);
  const [dailyHours, setDailyHours] = useState(8);
  const [results, setResults] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    const salary = parseFloat(monthlySalary) || 0;
    const mHours = parseInt(monthlyHours) || 0;
    const dHours = parseInt(dailyHours) || 0;
    if (mHours <= 0 || dHours <= 0) {
      alert('As horas trabalhadas devem ser maiores que zero.');
      return;
    }
    const hourlyWage = salary / mHours;
    const weeklyIncome = salary / 4.333;
    const table = defaultItems.map(item => {
      const hours = item.price / hourlyWage;
      return {
        name: item.name,
        price: item.price,
        hours: formatHours(hours),
        days: formatDays(hours, dHours)
      };
    });
    setResults({ hourlyWage, weeklyIncome, table });
  };

  return (
    <div style={{ textAlign: "center", padding: "1rem 0" }}>
      <h2 style={{ color: "#8cb4bc", fontWeight: 700 }}>Quanto Tempo de Vida Custa Isso?</h2>
      <form className="simulador-form" onSubmit={handleSubmit}>
        <label>Salário Líquido Mensal (€):</label>
        <input type="number" className="simulador-input" min="0" value={monthlySalary} onChange={e => setMonthlySalary(e.target.value)} />
        <label>Horas Trabalhadas por Mês:</label>
        <input type="number" className="simulador-input" min="1" value={monthlyHours} onChange={e => setMonthlyHours(e.target.value)} />
        <label>Horas por Dia de Trabalho:</label>
        <input type="number" className="simulador-input" min="1" value={dailyHours} onChange={e => setDailyHours(e.target.value)} />
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
        <div style={{ marginTop: 24, background: "#f8f9fa", borderRadius: 12, padding: 18, display: "inline-block", maxWidth: 700 }}>
          <h3 style={{ color: '#8cb4bc', fontWeight: 700, marginBottom: 12 }}>Resultados</h3>
          <p style={{ marginBottom: 8 }}>Valor da Hora Trabalhada: <b>€{results.hourlyWage.toLocaleString('pt-PT', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</b></p>
          <p style={{ marginBottom: 16 }}>Renda Semanal: <b>€{results.weeklyIncome.toLocaleString('pt-PT', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</b></p>
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', fontSize: 15, borderCollapse: 'collapse' }}>
              <thead style={{ background: '#f3f3f3' }}>
                <tr>
                  <th style={{ padding: 6 }}>Item</th>
                  <th style={{ padding: 6 }}>Preço (€)</th>
                  <th style={{ padding: 6 }}>Custo em Horas</th>
                  <th style={{ padding: 6 }}>Custo em Dias</th>
                </tr>
              </thead>
              <tbody>
                {results.table.map((row, idx) => (
                  <tr key={idx}>
                    <td style={{ padding: 6 }}>{row.name}</td>
                    <td style={{ padding: 6 }}>€{row.price.toLocaleString('pt-PT', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</td>
                    <td style={{ padding: 6 }}>{row.hours}</td>
                    <td style={{ padding: 6 }}>{row.days}</td>
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

export default LifeTimeCost;