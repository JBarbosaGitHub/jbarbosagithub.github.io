import React, { useState } from 'react';
import piggyBank from '../assets/piggybank.png';
import piggyGif from '../assets/piggywise.gif';
import '../styles/PiggyWise.css';
import { useNavigate } from 'react-router-dom';
import { auth, db } from '../firebase';
import { doc, setDoc, getDoc } from 'firebase/firestore';

const questions = [
  {
    question: 'O que é dinheiro?',
    options: [
      { text: 'Meio para comprar coisas.', points: 3 },
      { text: 'Forma de obter coisas.', points: 1 },
      { text: 'Objeto para brincar.', points: 0 },
    ],
  },
  {
    question: 'Para que serve o dinheiro?',
    options: [
      { text: 'Comprar comida e brinquedos.', points: 3 },
      { text: 'Comprar coisas divertidas.', points: 1 },
      { text: 'Fazer desenhos coloridos.', points: 0 },
    ],
  },
  {
    question: 'Como ganhar dinheiro?',
    options: [
      { text: 'Fazendo tarefas ou trabalhando.', points: 3 },
      { text: 'Recebendo por ajudar.', points: 1 },
      { text: 'Achando moedas no chão.', points: 0 },
    ],
  },
  {
    question: 'Se tens 5 moedas e ganhas 3, quantas tens?',
    options: [
      { text: '8 moedas no total.', points: 3 },
      { text: 'Mais do que 5 moedas.', points: 1 },
      { text: '3 moedas no total.', points: 0 },
    ],
  },
  {
    question: 'O que é uma necessidade?',
    options: [
      { text: 'Comida para viver.', points: 3 },
      { text: 'Sapatos para usar.', points: 1 },
      { text: 'Bola para jogar.', points: 0 },
    ],
  },
  {
    question: 'O que é um desejo?',
    options: [
      { text: 'Bicicleta para passear.', points: 3 },
      { text: 'Livro para ler.', points: 1 },
      { text: 'Água para beber.', points: 0 },
    ],
  },
  {
    question: 'Se tens 12 moedas e gastas 5, quanto sobra?',
    options: [
      { text: '7 moedas sobrantes.', points: 3 },
      { text: 'Algumas moedas sobrantes.', points: 1 },
      { text: '5 moedas sobrantes.', points: 0 },
    ],
  },
  {
    question: 'Por que gastar com cuidado?',
    options: [
      { text: 'Garantir dinheiro para comida.', points: 3 },
      { text: 'Evitar gastar tudo.', points: 1 },
      { text: 'Comprar tudo rápido.', points: 0 },
    ],
  },
  {
    question: 'O que é poupar?',
    options: [
      { text: 'Guardar para o futuro.', points: 3 },
      { text: 'Não gastar agora.', points: 1 },
      { text: 'Gastar tudo agora.', points: 0 },
    ],
  },
  {
    question: 'Se queres um brinquedo de 15 moedas, o que fazer?',
    options: [
      { text: 'Poupar até ter 15 moedas.', points: 3 },
      { text: 'Guardar algum dinheiro.', points: 1 },
      { text: 'Pedir sem pagar.', points: 0 },
    ],
  },
  {
    question: 'Se poupas 5 moedas por semana, quanto tens em 2 semanas?',
    options: [
      { text: '10 moedas no total.', points: 3 },
      { text: 'Mais de 5 moedas.', points: 1 },
      { text: '2 moedas no total.', points: 0 },
    ],
  },
  {
    question: 'O que faz um banco?',
    options: [
      { text: 'Guarda dinheiro com segurança.', points: 3 },
      { text: 'Cuida das nossas moedas.', points: 1 },
      { text: 'Vende brinquedos.', points: 0 },
    ],
  },
  {
    question: 'O que ganhas com juros?',
    options: [
      { text: 'Mais dinheiro no banco.', points: 3 },
      { text: 'Algo do banco.', points: 1 },
      { text: 'Um prémio de jogos.', points: 0 },
    ],
  },
  {
    question: 'Se guardas 20 moedas com 10% de juros, quanto tens?',
    options: [
      { text: '22 moedas no total.', points: 3 },
      { text: 'Mais de 20 moedas.', points: 1 },
      { text: '18 moedas no total.', points: 0 },
    ],
  },
  {
    question: 'Por que doar dinheiro é bom?',
    options: [
      { text: 'Ajuda a comunidade.', points: 3 },
      { text: 'Faz bem aos outros.', points: 1 },
      { text: 'Faz perder dinheiro.', points: 0 },
    ],
  },
  {
    question: 'Se doas 5 moedas para um parque, o que acontece?',
    options: [
      { text: 'Parque fica mais bonito.', points: 3 },
      { text: 'Parque ganha algo.', points: 1 },
      { text: 'Parque fecha.', points: 0 },
    ],
  },
  {
    question: 'O que é um orçamento?',
    options: [
      { text: 'Plano para usar dinheiro.', points: 3 },
      { text: 'Ideia para gastar.', points: 1 },
      { text: 'Brinquedo caro.', points: 0 },
    ],
  },
  {
    question: 'Se tens 20 moedas, gastas 10 em comida e 5 em brinquedos, quanto sobra?',
    options: [
      { text: '5 moedas sobrantes.', points: 3 },
      { text: 'Algumas moedas sobrantes.', points: 1 },
      { text: '10 moedas sobrantes.', points: 0 },
    ],
  },
  {
    question: 'Como organizar um piquenique com 25 moedas?',
    options: [
      { text: 'Planear gastos com comida.', points: 3 },
      { text: 'Escolher comida para comprar.', points: 1 },
      { text: 'Gastar tudo sem plano.', points: 0 },
    ],
  },
  {
    question: 'Se queres uma mochila cara, o que fazer?',
    options: [
      { text: 'Poupar e planear gastos.', points: 3 },
      { text: 'Juntar dinheiro depois.', points: 1 },
      { text: 'Comprar sem poupar.', points: 0 },
    ],
  },
];

const PiggyWise = () => {
  const [current, setCurrent] = useState(0);
  const [score, setScore] = useState(0);
  const [feedback, setFeedback] = useState(null);
  const [showNext, setShowNext] = useState(false);
  const [shuffledOptions, setShuffledOptions] = useState([]);
  const [shuffledQuestions, setShuffledQuestions] = useState([]);
  const [user, setUser] = useState(() => auth.currentUser);
  const [saving, setSaving] = useState(false);
  const [saveError, setSaveError] = useState(null);
  const [saveSuccess, setSaveSuccess] = useState(false);
  // Contadores de respostas
  const [correct, setCorrect] = useState(0);
  const [almost, setAlmost] = useState(0);
  const [wrong, setWrong] = useState(0);
  const navigate = useNavigate();
  // Novo estado para mostrar acumulado
  const [accumulated, setAccumulated] = useState(null);

  // Função para embaralhar arrays
  function shuffle(array) {
    const arr = [...array];
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  }

  // Embaralhar perguntas só uma vez ao montar o componente
  React.useEffect(() => {
    setShuffledQuestions(shuffle(questions));
  }, []);

  // Embaralhar opções sempre que a pergunta mudar
  React.useEffect(() => {
    if (shuffledQuestions.length && current < shuffledQuestions.length) {
      setShuffledOptions(shuffle(shuffledQuestions[current].options));
    }
  }, [current, shuffledQuestions]);

  // Atualizar user se autenticação mudar
  React.useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((u) => setUser(u));
    return () => unsubscribe();
  }, []);

  // Buscar acumulado do Firestore ao terminar quiz
  React.useEffect(() => {
    if (user && current >= shuffledQuestions.length) {
      const fetchAccumulated = async () => {
        const docRef = doc(db, 'piggywise_progress', user.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setAccumulated(docSnap.data());
        }
      };
      fetchAccumulated();
    }
  }, [user, current, shuffledQuestions.length]);

  // Salvar progresso ao terminar quiz (hook sempre no topo!)
  React.useEffect(() => {
    if (
      shuffledQuestions.length &&
      current >= shuffledQuestions.length &&
      user &&
      !saveSuccess &&
      !saving
    ) {
      savePiggywiseProgress();
    }
    // eslint-disable-next-line
  }, [user, saveSuccess, saving, current, shuffledQuestions.length]);

  const handleOption = (points) => {
    setScore(score + points);
    if (points === 3) setCorrect((c) => c + 1);
    else if (points === 1) setAlmost((a) => a + 1);
    else setWrong((w) => w + 1);
    setFeedback(points === 3 ? 'Certa! 🎉' : points === 1 ? 'Quase! 👍' : 'Errada! 😅');
    setShowNext(true);
    setTimeout(() => {
      setCurrent((prev) => prev + 1);
      setFeedback(null);
      setShowNext(false);
    }, 900);
  };

  const handleNext = () => {
    setCurrent(current + 1);
    setFeedback(null);
    setShowNext(false);
  };

  const handleBackToGames = () => {
    navigate('/jogos');
  };

  // Função para resetar quiz localmente (perguntas, score, contadores)
  const handleRestartQuiz = () => {
    setShuffledQuestions(shuffle(questions));
    setCurrent(0);
    setScore(0);
    setCorrect(0);
    setAlmost(0);
    setWrong(0);
    setFeedback(null);
    setShowNext(false);
    setSaveSuccess(false);
    setSaveError(null);
    setAccumulated(null);
  };

  // Função para salvar progresso no Firestore
  const savePiggywiseProgress = async () => {
    if (!user) return;
    setSaving(true);
    setSaveError(null);
    setSaveSuccess(false);
    try {
      const docRef = doc(db, 'piggywise_progress', user.uid);
      const docSnap = await getDoc(docRef);
      const prev = docSnap.exists() ? docSnap.data() : {};
      await setDoc(docRef, {
        piggywise_coins: (prev.piggywise_coins || 0) + score,
        piggywise_correct: (prev.piggywise_correct || 0) + correct,
        piggywise_almost: (prev.piggywise_almost || 0) + almost,
        piggywise_wrong: (prev.piggywise_wrong || 0) + wrong,
      }, { merge: true });
      setSaveSuccess(true);
    } catch (err) {
      setSaveError('Erro ao salvar progresso!');
    } finally {
      setSaving(false);
    }
  };

  if (shuffledQuestions.length && current >= shuffledQuestions.length) {
    return (
      <div className="piggywise-main-bg">
        <div className="piggywise-quiz-box">
          <img src={piggyGif} alt="Porquinho Sábio" className="piggywise-gif" />
          <h2 style={{color: 'black'}}>Parabéns! Terminaste o quiz!</h2>
          <p style={{color: 'black'}}>Pontuação final: <b>{score}</b> moedas mágicas</p>
          <p style={{color: 'black'}}>Certas: <b>{correct}</b> | Quase: <b>{almost}</b> | Erradas: <b>{wrong}</b></p>
          {user && (
            <div style={{marginTop:8}}>
              {saving && <span style={{color:'#888'}}>A guardar progresso...</span>}
              {saveSuccess && <span style={{color:'#388e3c'}}>Progresso guardado!</span>}
              {saveError && <span style={{color:'#c62828'}}>{saveError}</span>}
              {accumulated && (
                <div style={{marginTop:12, color:'#333', fontSize:'1rem'}}>
                  <b>Total acumulado:</b><br/>
                  Moedas: <b>{accumulated.piggywise_coins || 0}</b> | Certas: <b>{accumulated.piggywise_correct || 0}</b> | Quase: <b>{accumulated.piggywise_almost || 0}</b> | Erradas: <b>{accumulated.piggywise_wrong || 0}</b>
                </div>
              )}
            </div>
          )}
          {!user && <p style={{color:'#c62828',marginTop:8}}>Inicie sessão para guardar o seu progresso!</p>}
          <button className="piggywise-back-btn" onClick={handleBackToGames}>
            Voltar aos jogos
          </button>
          <button className="piggywise-back-btn" style={{marginTop:12, background:'#f7e36a', color:'#333'}} onClick={handleRestartQuiz}>
            Jogar novamente
          </button>
        </div>
      </div>
    );
  }

  if (!shuffledQuestions.length) return null;

  return (
    <div className="piggywise-main-bg">
      <div className="piggywise-quiz-box">
        <img src={piggyGif} alt="Porquinho Sábio" className="piggywise-gif" />
        <h2 style={{ marginBottom: 16, color: 'black'}}>Pergunta {current + 1} de {shuffledQuestions.length}</h2>
        <div className="piggywise-question-card">
          <h3>{shuffledQuestions[current].question}</h3>
          <div className="piggywise-options">
            {shuffledOptions.map((opt, idx) => (
              <button
                key={idx}
                className={`piggywise-option-btn piggywise-color-${idx}`}
                onClick={() => !showNext && handleOption(opt.points)}
                disabled={showNext}
              >
                {opt.text}
              </button>
            ))}
          </div>
        </div>
        {feedback && <div className="piggywise-feedback">{feedback}</div>}
        <div className="piggywise-score">Moedas mágicas: <b>{score}</b></div>
        <button className="piggywise-back-btn" onClick={handleBackToGames}>
          Voltar aos jogos
        </button>
      </div>
    </div>
  );
};

export default PiggyWise; 