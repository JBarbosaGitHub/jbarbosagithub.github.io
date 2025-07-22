import { useState } from "react";

const CompoundInterestSaving = () => {
  const [initial, setInitial] = useState(0);
  const [rate, setRate] = useState(0);
  const [years, setYears] = useState(0);
  const [total, setTotal] = useState(null);
  return (
    <div style={{ textAlign: 'center', padding: '1rem 0' }}>
      <h2 style={{ color: '#8cb4bc', fontWeight: 700 }}>Poupança com Juros Compostos!</h2>
      <form className="simulador-form" onSubmit={e => { e.preventDefault(); setTotal(initial * Math.pow(1 + rate / 100, years)); }}>
        <label>Valor inicial (€):</label>
        <input type="number" value={initial} onChange={e => setInitial(Number(e.target.value))} placeholder="Ex: 50" className="simulador-input" />
        <label>Taxa anual (%):</label>
        <input type="number" value={rate} onChange={e => setRate(Number(e.target.value))} placeholder="Ex: 3" className="simulador-input" />
        <label>Anos:</label>
        <input type="number" value={years} onChange={e => setYears(Number(e.target.value))} placeholder="Ex: 2" className="simulador-input" />
        <div className="simulador-submit-row">
          <button type="submit" className="simulador-submit-btn">Calcular</button>
        </div>
      </form>
      {total !== null && (
        <p style={{ fontSize: 22, color: '#eac862', fontWeight: 800 }}>Total: €{total.toFixed(2)}</p>
      )}
    </div>
  );
};

export default CompoundInterestSaving; 