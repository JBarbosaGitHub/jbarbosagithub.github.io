import Header from "../Components/Header";
import Footer from "../Components/Footer";
import PageTransition from "../Components/PageTransition";
import { useState } from "react";
import '../styles/Simulations.css';

// Pré-escolar (3-5 anos): Contador de Moedas Coloridas
const ContadorMoedasColoridas = () => {
  const [total, setTotal] = useState(0);
  return (
    <div style={{ textAlign: 'center', padding: '1rem 0' }}>
      <h2 style={{ color: '#8cb4bc', fontWeight: 700 }}>Conta as Moedas Coloridas!</h2>
      <p style={{ color: '#444', marginBottom: 16 }}>Clica nas moedas para adicionar ao mealheiro!</p>
      <div style={{ display: 'flex', justifyContent: 'center', gap: 24, marginBottom: 24 }}>
        <button style={{ backgroundColor: '#ff0000', color: '#fff', fontSize: 24, border: 'none', borderRadius: 12, padding: '1rem 2rem', cursor: 'pointer', fontWeight: 700 }} onClick={() => setTotal(t => t + 1)}>+1€ Vermelha</button>
        <button style={{ backgroundColor: '#00ff00', color: '#fff', fontSize: 24, border: 'none', borderRadius: 12, padding: '1rem 2rem', cursor: 'pointer', fontWeight: 700 }} onClick={() => setTotal(t => t + 2)}>+2€ Verde</button>
      </div>
      <p style={{ fontSize: 28, color: '#eac862', fontWeight: 800 }}>Total: {total}€</p>
      <p style={{ color: '#7d925c', fontWeight: 600 }}>{total > 0 ? 'Boa! Continua!' : ''}</p>
    </div>
  );
};

// 1º Ciclo (6-9 anos): Poupança para um Livro
const PoupancaLivro = () => {
  const [deposito, setDeposito] = useState(0);
  const [meses, setMeses] = useState(0);
  const [total, setTotal] = useState(null);
  return (
    <div style={{ textAlign: 'center', padding: '1rem 0' }}>
      <h2 style={{ color: '#8cb4bc', fontWeight: 700 }}>Poupa para Comprar um Livro!</h2>
      <form className="simulador-form" onSubmit={e => { e.preventDefault(); setTotal(deposito * meses); }}>
        <label>Poupa por mês (€):</label>
        <input type="number" value={deposito} onChange={e => setDeposito(Number(e.target.value))} placeholder="Ex: 2" className="simulador-input" />
        <label>Meses:</label>
        <input type="number" value={meses} onChange={e => setMeses(Number(e.target.value))} placeholder="Ex: 4" className="simulador-input" />
        <div style={{ gridColumn: '1 / -1', display: 'flex', justifyContent: 'center', marginTop: 10 }}>
          <button type="submit" style={{ background: '#8cb4bc', color: '#fff', border: 'none', borderRadius: 10, padding: '0.7rem 1.5rem', fontWeight: 700, fontSize: '1.1rem', cursor: 'pointer', marginBottom: 16 }}>Calcular</button>
        </div>
      </form>
      {total !== null && (
        <p style={{ fontSize: 22, color: '#eac862', fontWeight: 800 }}>Total poupado: €{total} - {total >= 15 ? 'Podes comprar!' : 'Continua!'}</p>
      )}
    </div>
  );
};

// 2º Ciclo (10-12 anos): Orçamento para Viagem Escolar
const OrcamentoViagem = () => {
  const [disponivel, setDisponivel] = useState(0);
  const [transporte, setTransporte] = useState(0);
  const [lanche, setLanche] = useState(0);
  const [saldo, setSaldo] = useState(null);
  return (
    <div style={{ textAlign: 'center', padding: '1rem 0' }}>
      <h2 style={{ color: '#8cb4bc', fontWeight: 700 }}>Planeia a Viagem Escolar!</h2>
      <form className="simulador-form" onSubmit={e => { e.preventDefault(); setSaldo(disponivel - (transporte + lanche)); }}>
        <label>Dinheiro disponível (€):</label>
        <input type="number" value={disponivel} onChange={e => setDisponivel(Number(e.target.value))} placeholder="Ex: 20" className="simulador-input" />
        <label>Transporte (€):</label>
        <input type="number" value={transporte} onChange={e => setTransporte(Number(e.target.value))} placeholder="Ex: 5" className="simulador-input" />
        <label>Lanche (€):</label>
        <input type="number" value={lanche} onChange={e => setLanche(Number(e.target.value))} placeholder="Ex: 3" className="simulador-input" />
        <div style={{ gridColumn: '1 / -1', display: 'flex', justifyContent: 'center', marginTop: 10 }}>
          <button type="submit" style={{ background: '#8cb4bc', color: '#fff', border: 'none', borderRadius: 10, padding: '0.7rem 1.5rem', fontWeight: 700, fontSize: '1.1rem', cursor: 'pointer', marginBottom: 16 }}>Calcular</button>
        </div>
      </form>
      {saldo !== null && (
        <p style={{ fontSize: 22, color: saldo >= 0 ? '#7d925c' : '#ff0000', fontWeight: 800 }}>Saldo: €{saldo.toFixed(2)} - {saldo < 0 ? 'Ajusta se negativo!' : 'Boa gestão!'}</p>
      )}
    </div>
  );
};

// 3º Ciclo (13-15 anos): Poupança com Juros Compostos
const PoupancaJurosCompostos = () => {
  const [inicial, setInicial] = useState(0);
  const [taxa, setTaxa] = useState(0);
  const [anos, setAnos] = useState(0);
  const [total, setTotal] = useState(null);
  return (
    <div style={{ textAlign: 'center', padding: '1rem 0' }}>
      <h2 style={{ color: '#8cb4bc', fontWeight: 700 }}>Poupança com Juros Compostos!</h2>
      <form className="simulador-form" onSubmit={e => { e.preventDefault(); setTotal(inicial * Math.pow(1 + taxa / 100, anos)); }}>
        <label>Valor inicial (€):</label>
        <input type="number" value={inicial} onChange={e => setInicial(Number(e.target.value))} placeholder="Ex: 50" className="simulador-input" />
        <label>Taxa anual (%):</label>
        <input type="number" value={taxa} onChange={e => setTaxa(Number(e.target.value))} placeholder="Ex: 3" className="simulador-input" />
        <label>Anos:</label>
        <input type="number" value={anos} onChange={e => setAnos(Number(e.target.value))} placeholder="Ex: 2" className="simulador-input" />
        <div style={{ gridColumn: '1 / -1', display: 'flex', justifyContent: 'center', marginTop: 10 }}>
          <button type="submit" style={{ background: '#8cb4bc', color: '#fff', border: 'none', borderRadius: 10, padding: '0.7rem 1.5rem', fontWeight: 700, fontSize: '1.1rem', cursor: 'pointer', marginBottom: 16 }}>Calcular</button>
        </div>
      </form>
      {total !== null && (
        <p style={{ fontSize: 22, color: '#eac862', fontWeight: 800 }}>Total: €{total.toFixed(2)}</p>
      )}
    </div>
  );
};

// Secundário (16-18 anos): Investimento Composto
const InvestimentoComposto = () => {
  const [inicial, setInicial] = useState(0);
  const [depositos, setDepositos] = useState(0);
  const [taxa, setTaxa] = useState(0);
  const [anos, setAnos] = useState(0);
  const [total, setTotal] = useState(null);
  return (
    <div style={{ textAlign: 'center', padding: '1rem 0' }}>
      <h2 style={{ color: '#8cb4bc', fontWeight: 700 }}>Investimento Composto!</h2>
      <form className="simulador-form" onSubmit={e => { e.preventDefault(); let total = inicial; for (let i = 0; i < anos; i++) { total = (total + depositos) * (1 + taxa / 100); } setTotal(total); }}>
        <label>Valor inicial (€):</label>
        <input type="number" value={inicial} onChange={e => setInicial(Number(e.target.value))} placeholder="Ex: 1000" className="simulador-input" />
        <label>Depósitos anuais (€):</label>
        <input type="number" value={depositos} onChange={e => setDepositos(Number(e.target.value))} placeholder="Ex: 500" className="simulador-input" />
        <label>Taxa anual (%):</label>
        <input type="number" value={taxa} onChange={e => setTaxa(Number(e.target.value))} placeholder="Ex: 7" className="simulador-input" />
        <label>Anos:</label>
        <input type="number" value={anos} onChange={e => setAnos(Number(e.target.value))} placeholder="Ex: 10" className="simulador-input" />
        <div style={{ gridColumn: '1 / -1', display: 'flex', justifyContent: 'center', marginTop: 10 }}>
          <button type="submit" style={{ background: '#8cb4bc', color: '#fff', border: 'none', borderRadius: 10, padding: '0.7rem 1.5rem', fontWeight: 700, fontSize: '1.1rem', cursor: 'pointer', marginBottom: 16 }}>Calcular</button>
        </div>
      </form>
      {total !== null && (
        <p style={{ fontSize: 22, color: '#eac862', fontWeight: 800 }}>Total: €{total.toFixed(2)}</p>
      )}
    </div>
  );
};

const faixasEtarias = [
  {
    nome: 'Pré-escolar (3-5 anos)',
    descricao: 'Jogos e simulações lúdicas para os mais pequenos aprenderem a contar e reconhecer valores.',
    img: 'https://cdn-icons-png.flaticon.com/512/2922/2922017.png',
    simuladores: [
      {
        nome: 'Contador de Moedas Coloridas',
        descricao: 'Conta moedas virtuais de cores diferentes para aprender valores básicos.',
        componente: <ContadorMoedasColoridas />,
      },
    ],
  },
  {
    nome: '1º Ciclo (6-9 anos)',
    descricao: 'Simulações para aprender a poupar, gastar e planear pequenas compras.',
    img: 'https://cdn-icons-png.flaticon.com/512/2922/2922022.png',
    simuladores: [
      {
        nome: 'Poupa para Comprar um Livro',
        descricao: 'Calcula quanto precisas de poupar por mês para atingir o teu objetivo.',
        componente: <PoupancaLivro />,
      },
    ],
  },
  {
    nome: '2º Ciclo (10-12 anos)',
    descricao: 'Orçamentos e decisões financeiras simples para o dia a dia.',
    img: 'https://cdn-icons-png.flaticon.com/512/2922/2922027.png',
    simuladores: [
      {
        nome: 'Orçamento para Viagem Escolar',
        descricao: 'Planeia os gastos para uma viagem escolar e vê se o dinheiro chega.',
        componente: <OrcamentoViagem />,
      },
    ],
  },
  {
    nome: '3º Ciclo (13-15 anos)',
    descricao: 'Simulações com juros, empréstimos e conceitos de investimento.',
    img: 'https://cdn-icons-png.flaticon.com/512/2922/2922030.png',
    simuladores: [
      {
        nome: 'Poupança com Juros Compostos',
        descricao: 'Descobre como o dinheiro cresce ao longo do tempo com juros compostos.',
        componente: <PoupancaJurosCompostos />,
      },
    ],
  },
  {
    nome: 'Secundário (16-18 anos)',
    descricao: 'Planeamento financeiro avançado e simulações de investimento para jovens adultos.',
    img: 'https://cdn-icons-png.flaticon.com/512/2922/2922036.png',
    simuladores: [
      {
        nome: 'Investimento Composto',
        descricao: 'Projeta o crescimento de um investimento ao longo do tempo.',
        componente: <InvestimentoComposto />,
      },
    ],
  },
];

const Simulations = () => {
  const [faixaSelecionada, setFaixaSelecionada] = useState(null); // null = mostra faixas
  const [simuladorSelecionado, setSimuladorSelecionado] = useState(null); // objeto simulador

  // Modal simples
  const Modal = ({ open, onClose, children }) => {
    if (!open) return null;
    return (
      <div className="simulation-modal">
        <div className="simulation-modal-content">
          <button className="simulation-modal-close" onClick={onClose} aria-label="Fechar modal">
            &times;
          </button>
          <div style={{ color: '#222', fontFamily: 'Inter, Arial, sans-serif', paddingTop: 8 }}>
            {children}
          </div>
        </div>
      </div>
    );
  };

  return (
    <>
      <Header />
      <PageTransition>
        <div className="simulation-bg">
          <div className="simulation-container">
            <div className="simulation-main-box">
              <h1 style={{ color: '#8cb4bc', fontWeight: 800, fontSize: '2rem', marginBottom: '1.5rem', textAlign: 'center', letterSpacing: '-1px' }}>
                Simuladores Financeiros
              </h1>
              {/* Navegação: Faixas etárias ou simuladores da faixa */}
              {faixaSelecionada === null ? (
                <div className="simulations-cards">
                  {faixasEtarias.map((faixa, idx) => (
                    <div key={faixa.nome} className="simulation-card" onClick={() => setFaixaSelecionada(idx)}>
                      <img src={faixa.img} alt={faixa.nome} />
                      <h3>{faixa.nome}</h3>
                      <p>{faixa.descricao}</p>
                    </div>
                  ))}
                </div>
              ) : (
                <>
                  <div className="simulations-cards" style={{ marginTop: '1rem' }}>
                    {faixasEtarias[faixaSelecionada].simuladores.map((sim, i) => (
                      <div key={sim.nome} className="simulation-card" style={{ position: 'relative' }}>
                        <img src={faixasEtarias[faixaSelecionada].img} alt={sim.nome} style={{ width: 70, height: 70, objectFit: 'contain', marginBottom: 12 }} />
                        <h3 style={{ color: '#7d925c', fontSize: '1.15rem', fontWeight: 800, marginBottom: '0.5rem', textAlign: 'center' }}>{sim.nome}</h3>
                        <p style={{ color: '#333', fontSize: '0.98rem', marginBottom: '1.2rem', textAlign: 'center' }}>{sim.descricao}</p>
                        <button className="simulation-btn" onClick={() => setSimuladorSelecionado(sim)}>
                          Simular
                        </button>
                      </div>
                    ))}
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'center', marginTop: 40 }}>
                    <button className="simulation-back-btn" onClick={() => setFaixaSelecionada(null)}>
                      ← Voltar às faixas etárias
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
          {/* Modal do simulador */}
          <Modal open={!!simuladorSelecionado} onClose={() => setSimuladorSelecionado(null)}>
            {simuladorSelecionado && (
              <>
                <h2 style={{ color: '#8cb4bc', fontWeight: 800, fontSize: '1.5rem', marginBottom: 12, textAlign: 'center', letterSpacing: '-1px' }}>{simuladorSelecionado.nome}</h2>
                <p style={{ color: '#444', fontSize: '1.08rem', marginBottom: 18, textAlign: 'center', fontWeight: 500 }}>{simuladorSelecionado.descricao}</p>
                {simuladorSelecionado.componente}
              </>
            )}
          </Modal>
        </div>
      </PageTransition>
      <Footer />
    </>
  );
};

export default Simulations;