import Header from "../Components/Header";
import Footer from "../Components/Footer";
import PageTransition from "../Components/PageTransition";
import { useState } from "react";
import '../styles/Simulations.css';
import ColoredCoinCounter from "../Components/Simuladores/ColoredCoinCounter";
import BookSaving from "../Components/Simuladores/BookSaving";
import TripBudget from "../Components/Simuladores/TripBudget";
import CompoundInterestSaving from "../Components/Simuladores/CompoundInterestSaving";
import CompoundInvestment from "../Components/Simuladores/CompoundInvestment";
import MarketFruitCounter from "../Components/Simuladores/MarketFruitCounter";
import SupermarketPurchase from "../Components/Simuladores/SupermarketPurchase";
import SimpleInterestSaving from "../Components/Simuladores/SimpleInterestSaving";
import FamilyMonthlyBudget from "../Components/Simuladores/FamilyMonthlyBudget";
import StudyLoan from "../Components/Simuladores/StudyLoan";

const faixasEtarias = [
  {
    nome: 'Pré-escolar (3-5 anos)',
    descricao: 'Jogos e simulações lúdicas para os mais pequenos aprenderem a contar e reconhecer valores.',
    img: 'https://cdn-icons-png.flaticon.com/512/2922/2922017.png',
    simuladores: [
      {
        nome: 'Contador de Moedas Coloridas',
        descricao: 'Conta moedas virtuais de cores diferentes para aprender valores básicos.',
        componente: <ColoredCoinCounter />,
      },
      {
        nome: 'Conta Frutas no Mercado',
        descricao: 'Conta frutas como moedas para comprar, associando números a valores.',
        componente: <MarketFruitCounter />,
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
        componente: <BookSaving />,
      },
      {
        nome: 'Compra no Supermercado',
        descricao: 'Adiciona itens e calcula o total gasto.',
        componente: <SupermarketPurchase />,
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
        componente: <TripBudget />,
      },
      {
        nome: 'Poupança com Juros Simples',
        descricao: 'Introduz juros básicos em poupança.',
        componente: <SimpleInterestSaving />,
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
        componente: <CompoundInterestSaving />,
      },
      {
        nome: 'Orçamento Mensal Familiar',
        descricao: 'Gerencia receitas e despesas mensais.',
        componente: <FamilyMonthlyBudget />,
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
        componente: <CompoundInvestment />,
      },
      {
        nome: 'Empréstimo para Estudos',
        descricao: 'Calcula custos de empréstimo para educação.',
        componente: <StudyLoan />,
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