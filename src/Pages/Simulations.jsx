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
import ChooseToy from "../Components/Simuladores/ChooseToy";
import WeeklyAllowance from "../Components/Simuladores/WeeklyAllowance";
import WeeklySavingGoal from "../Components/Simuladores/WeeklySavingGoal";
import InvestmentReturn from "../Components/Simuladores/InvestmentReturn";
import RetirementPlanning from "../Components/Simuladores/RetirementPlanning";
import EuriborSimulator from "../Components/Simuladores/EuriborSimulator";
import MaxHouseValue from "../Components/Simuladores/MaxHouseValue";
import HousingLoan from "../Components/Simuladores/HousingLoan";
import { motion, AnimatePresence } from "framer-motion";

// Simuladores para estudantes (até 18 anos)
const simuladoresEstudantes = [
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
      {
        nome: 'Escolhe um brinquedo',
        descricao: 'Escolhe um brinquedo e aprende a poupar para o comprar.',
        componente: <ChooseToy />,
      }
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
      {
        nome: 'Mesada Semanal',
        descricao: 'Calcula a mesada semanal e aprende a poupar para o gastar.',
        componente: <WeeklyAllowance />,
      }
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
      {
        nome: 'Meta de Poupança Semanal',
        descricao: 'Calcula quanto precisas de poupar por semana para atingir o teu objetivo.',
        componente: <WeeklySavingGoal />,
      }
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
      {
        nome: 'Retorno de Ações',
        descricao: 'Avalia o retorno de um investimento em ações e o risco associado.',
        componente: <InvestmentReturn />,
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
      {
        nome: 'Planejamento de Reforma',
        descricao: 'Estima o montante necessário para a reforma básica.',
        componente: <RetirementPlanning />,
      },
    ],
  },
];

// Simuladores para adultos
const simuladoresAdultos = [
  {
    nome: 'Simulador Euribor 2025',
    descricao: 'Simula o impacto da Taxa Euribor na prestação de crédito habitação.',
    img: 'https://cdn-icons-png.flaticon.com/512/2922/2922017.png',
    componente: <EuriborSimulator />,
  },
  {
    nome: 'Valor máximo da casa',
    descricao: 'Calcula o preço máximo de casa que podes comprar com base na tua situação financeira.',
    img: 'https://cdn-icons-png.flaticon.com/512/2922/2922022.png',
    componente: <MaxHouseValue />,
  },
  {
    nome: 'Crédito à habitação',
    descricao: 'Simula o teu empréstimo para habitação com diferentes tipos de taxa de juro.',
    img: 'https://cdn-icons-png.flaticon.com/512/2922/2922027.png',
    componente: <HousingLoan />,
  },
  // Aqui serão adicionados mais simuladores para adultos
];

const Simulations = () => {
  const [categoriaSelecionada, setCategoriaSelecionada] = useState(null); // null = mostra categorias, 'estudantes' ou 'adultos'
  const [faixaSelecionada, setFaixaSelecionada] = useState(null); // null = mostra faixas
  const [simuladorSelecionado, setSimuladorSelecionado] = useState(null); // objeto simulador

  // Modal simples
  const Modal = ({ open, onClose, children }) => {
    return (
      <AnimatePresence>
        {open && (
          <motion.div
            className="simulation-modal"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            style={{ zIndex: 1000 }}
          >
            <motion.div
              className="simulation-modal-content"
              initial={{ y: 60, scale: 0.98, opacity: 0 }}
              animate={{ y: 0, scale: 1, opacity: 1 }}
              exit={{ y: 60, scale: 0.98, opacity: 0 }}
              transition={{ type: "spring", stiffness: 260, damping: 22, duration: 0.32 }}
            >
              <button className="simulation-modal-close" onClick={onClose} aria-label="Fechar modal">
                &times;
              </button>
              <div style={{ color: '#222', fontFamily: 'Inter, Arial, sans-serif', paddingTop: 8 }}>
                {children}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    );
  };

  // Variantes para animação dos cards
  const cardContainerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.13 }
    }
  };
  const cardItemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1, y: 0,
      transition: { type: "spring", stiffness: 260, damping: 20 }
    }
  };

  // Função para obter os simuladores da categoria selecionada
  const getSimuladoresAtuais = () => {
    if (categoriaSelecionada === 'estudantes') {
      return simuladoresEstudantes;
    } else if (categoriaSelecionada === 'adultos') {
      return simuladoresAdultos;
    }
    return [];
  };

  // Função para verificar se é categoria de adultos (não tem subcategorias)
  const isAdultosCategory = () => {
    return categoriaSelecionada === 'adultos';
  };

  return (
    <>
      <Header />
      <PageTransition>
        <div className="simulation-bg">
          <div className="simulation-container">
            <div className="simulations-main-container">
              <h1 style={{ color: '#8cb4bc', fontWeight: 800, fontSize: '2rem', marginBottom: '1.5rem', textAlign: 'center', letterSpacing: '-1px' }}>
                Simuladores Financeiros
              </h1>
              
              {/* Navegação: Categorias principais */}
              {categoriaSelecionada === null ? (
                <motion.div
                  className="simulations-cards"
                  variants={cardContainerVariants}
                  initial="hidden"
                  animate="visible"
                >
                  <motion.div
                    className="simulation-card"
                    variants={cardItemVariants}
                    whileHover={{ scale: 1.05, boxShadow: '0 8px 32px #8cb4bc33' }}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => setCategoriaSelecionada('estudantes')}
                  >
                    <img src="https://cdn-icons-png.flaticon.com/512/2922/2922017.png" alt="Estudantes" />
                    <h3>Estudantes (até 18 anos)</h3>
                    <p>Simuladores educativos adaptados por faixa etária para crianças e jovens em idade escolar.</p>
                  </motion.div>
                  
                  <motion.div
                    className="simulation-card"
                    variants={cardItemVariants}
                    whileHover={{ scale: 1.05, boxShadow: '0 8px 32px #8cb4bc33' }}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => setCategoriaSelecionada('adultos')}
                  >
                    <img src="https://cdn-icons-png.flaticon.com/512/2922/2922036.png" alt="Adultos" />
                    <h3>Adultos</h3>
                    <p>Simuladores avançados para planeamento financeiro pessoal e familiar.</p>
                  </motion.div>
                </motion.div>
              ) : isAdultosCategory() ? (
                // Mostrar diretamente os simuladores de adultos
                <>
                  <motion.div
                    className="simulations-cards"
                    variants={cardContainerVariants}
                    initial="hidden"
                    animate="visible"
                    style={{ marginTop: '1rem' }}
                  >
                    {simuladoresAdultos.map((sim, i) => (
                      <motion.div
                        key={sim.nome}
                        className="simulation-card"
                        style={{ position: 'relative' }}
                        variants={cardItemVariants}
                        whileHover={{ scale: 1.05, boxShadow: '0 8px 32px #8cb4bc33' }}
                        whileTap={{ scale: 0.97 }}
                      >
                        <img src={sim.img} alt={sim.nome} style={{ width: 70, height: 70, objectFit: 'contain', marginBottom: 12 }} />
                        <h3 style={{ color: '#7d925c', fontSize: '1.15rem', fontWeight: 800, marginBottom: '0.5rem', textAlign: 'center' }}>{sim.nome}</h3>
                        <p style={{ color: '#333', fontSize: '0.98rem', marginBottom: '1.2rem', textAlign: 'center', fontWeight: 500 }}>{sim.descricao}</p>
                        <button className="simulation-btn" onClick={() => setSimuladorSelecionado(sim)}>
                          Simular
                        </button>
                      </motion.div>
                    ))}
                  </motion.div>
                  <div style={{ display: 'flex', justifyContent: 'center', marginTop: 40 }}>
                    <button className="simulation-back-btn" onClick={() => setCategoriaSelecionada(null)}>
                      ← Voltar às categorias
                    </button>
                  </div>
                </>
              ) : faixaSelecionada === null ? (
                // Mostrar faixas etárias para estudantes
                <>
                  <motion.div
                    className="simulations-cards"
                    variants={cardContainerVariants}
                    initial="hidden"
                    animate="visible"
                    style={{ marginTop: '1rem' }}
                  >
                    {simuladoresEstudantes.map((faixa, idx) => (
                      <motion.div
                        key={faixa.nome}
                        className="simulation-card"
                        variants={cardItemVariants}
                        whileHover={{ scale: 1.05, boxShadow: '0 8px 32px #8cb4bc33' }}
                        whileTap={{ scale: 0.97 }}
                        onClick={() => setFaixaSelecionada(idx)}
                      >
                        <img src={faixa.img} alt={faixa.nome} />
                        <h3>{faixa.nome}</h3>
                        <p>{faixa.descricao}</p>
                      </motion.div>
                    ))}
                  </motion.div>
                  <div style={{ display: 'flex', justifyContent: 'center', marginTop: 40 }}>
                    <button className="simulation-back-btn" onClick={() => setCategoriaSelecionada(null)}>
                      ← Voltar às categorias
                    </button>
                  </div>
                </>
              ) : (
                // Mostrar simuladores da faixa selecionada (estudantes)
                <>
                  <motion.div
                    className="simulations-cards"
                    variants={cardContainerVariants}
                    initial="hidden"
                    animate="visible"
                    style={{ marginTop: '1rem' }}
                  >
                    {simuladoresEstudantes[faixaSelecionada].simuladores.map((sim, i) => (
                      <motion.div
                        key={sim.nome}
                        className="simulation-card"
                        style={{ position: 'relative' }}
                        variants={cardItemVariants}
                        whileHover={{ scale: 1.05, boxShadow: '0 8px 32px #8cb4bc33' }}
                        whileTap={{ scale: 0.97 }}
                      >
                        <img src={simuladoresEstudantes[faixaSelecionada].img} alt={sim.nome} style={{ width: 70, height: 70, objectFit: 'contain', marginBottom: 12 }} />
                        <h3 style={{ color: '#7d925c', fontSize: '1.15rem', fontWeight: 800, marginBottom: '0.5rem', textAlign: 'center' }}>{sim.nome}</h3>
                        <p style={{ color: '#333', fontSize: '0.98rem', marginBottom: '1.2rem', textAlign: 'center', fontWeight: 500 }}>{sim.descricao}</p>
                        <button className="simulation-btn" onClick={() => setSimuladorSelecionado(sim)}>
                          Simular
                        </button>
                      </motion.div>
                    ))}
                  </motion.div>
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