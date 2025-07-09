import React, { useState, useEffect } from "react";
import piggyBank from "../assets/piggybank.png"
import coin1 from "../assets/coin1.png"
import coin2 from "../assets/coin2.png"
import coin3 from "../assets/coin3.png"
import coin4 from "../assets/coin4.png"
import coin5 from "../assets/coin5.png"
import coin6 from "../assets/coin6.png"
import coin7 from "../assets/coin7.png"
import coin8 from "../assets/coin8.png"
import img1 from "../assets/img1.png"
import img2 from "../assets/img2.png"
import img3 from "../assets/img3.png"
import "../styles/MiniGames.css"
import { auth, db } from '../firebase';
import { doc, setDoc, getDoc, deleteDoc } from 'firebase/firestore';

const coins = [
    { value: 2, img: coin2 },
    { value: 1, img: coin1 },
    { value: 0.5, img: coin3 },
    { value: 0.2, img: coin4 },
    { value: 0.1, img: coin5 },
    { value: 0.05, img: coin6 },
    { value: 0.02, img: coin7 },
    { value: 0.01, img: coin8 }
];

const articles = [
    { name: "Brinquedo", img: img1, price: 1.65 },
    { name: "Livro", img: img2, price: 2.38 },
    { name: "Bola", img: img3, price: 0.87 }
]

const levels = [
    {
        type: "coin", // Nível 1: identificar moeda
        target: 1,
        description: "Arrasta a moeda de 1€ para o porquinho!"
    },
    {
        type: "article", // Nível 2: pagar artigo
        img: img1,
        targetAmount: 1.65,
        description: `Arrasta as moedas até fazer o valor do produto!`
    }
];

function shuffleArray(array) {
    return [...array].sort(() => Math.random() - 0.5);
}

export default function CoinGame() {
    const [level, setLevel] = useState(0);
    const [scoreLevel1, setScoreLevel1] = useState(0);
    const [scoreLevel2, setScoreLevel2] = useState(0);
    const [currentArticle, setCurrentArticle] = useState(0);
    const [error, setError] = useState("");
    const [selectedCoins, setSelectedCoins] = useState([]); // Para nível 2
    // Novo estado para moedas baralhadas no nível 1
    const [shuffledCoins, setShuffledCoins] = useState(() => shuffleArray(coins));
    const [user, setUser] = useState(() => auth.currentUser);
    const [gameCompleted, setGameCompleted] = useState(false);
    const [loadingProgress, setLoadingProgress] = useState(true);
    const [progressLoaded, setProgressLoaded] = useState(false);

    // Atualizar user se autenticação mudar
    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((u) => setUser(u));
        return () => unsubscribe();
    }, []);

    // Carregar progresso sempre que user muda e está autenticado
    useEffect(() => {
        const fetchProgress = async () => {
            setLoadingProgress(true);
            setProgressLoaded(false);
            if (user) {
                const docRef = doc(db, 'game_progress', user.uid);
                const docSnap = await getDoc(docRef);
                if (docSnap.exists()) {
                    const data = docSnap.data();
                    setLevel(data.level ?? 0);
                    setScoreLevel1(data.scoreLevel1 ?? 0);
                    setScoreLevel2(data.scoreLevel2 ?? 0);
                    setCurrentArticle(data.currentArticle ?? 0);
                    setGameCompleted(data.gameCompleted ?? false);
                } else {
                    setLevel(0);
                    setScoreLevel1(0);
                    setScoreLevel2(0);
                    setCurrentArticle(0);
                    setGameCompleted(false);
                }
            } else {
                setLevel(0);
                setScoreLevel1(0);
                setScoreLevel2(0);
                setCurrentArticle(0);
                setGameCompleted(false);
            }
            setLoadingProgress(false);
            setProgressLoaded(true);
        };
        fetchProgress();
    }, [user]);

    // Função para salvar progresso
    const saveProgress = async (progress) => {
        if (!user) return;
        const docRef = doc(db, 'game_progress', user.uid);
        await setDoc(docRef, progress, { merge: true });
    };

    // Salvar progresso sempre que relevante, mas só depois do load inicial
    useEffect(() => {
        if (user && progressLoaded) {
            saveProgress({ level, scoreLevel1, scoreLevel2, currentArticle, gameCompleted });
        }
    }, [level, scoreLevel1, scoreLevel2, currentArticle, user, gameCompleted, progressLoaded]);

    // Resetar progresso
    const handleResetProgress = async () => {
        if (!user) return;
        if (!window.confirm('Tem a certeza que quer resetar o progresso do jogo?')) return;
        setLevel(0);
        setScoreLevel1(0);
        setScoreLevel2(0);
        setCurrentArticle(0);
        setGameCompleted(false);
        const docRef = doc(db, 'game_progress', user.uid);
        await deleteDoc(docRef);
    };

    // Nível 1: identificar moeda
    function handleDropLevel1(e) {
        const value = Number(e.dataTransfer.getData("coinValue"));
        if (value === levels[0].target) {
            setScoreLevel1(scoreLevel1 + 1);
            setError("");
            setShuffledCoins(shuffleArray(coins)); // Baralha moedas ao acertar
        } else {
            setError("Oops! Essa não era a moeda certa. Tenta outra vez!");
        }
    }

    // Nível 2: pagar artigo
    function handleDropLevel2(e) {
        const value = Number(e.dataTransfer.getData("coinValue"));
        setSelectedCoins([...selectedCoins, value]);
        setError("");
    }

    function handleStartDrag(e, value) {
        e.dataTransfer.setData("coinValue", value);
    }

    // Soma das moedas selecionadas no nível 2
    const total = selectedCoins.reduce((acc, v) => acc + v, 0);

    // Avançar de nível automaticamente após 3 acertos no nível 1
    useEffect(() => {
        if (level === 0 && scoreLevel1 >= 3) {
            setLevel(1);
            setSelectedCoins([]);
            setError("");
        }
    }, [scoreLevel1, level]);

    // Quando muda para o nível 1, baralha as moedas
    useEffect(() => {
        if (level === 0) {
            setShuffledCoins(shuffleArray(coins));
        }
    }, [level]);

    // Verifica se acertou no nível 2
    useEffect(() => {
        if (level === 1 && total > 0 && !gameCompleted) {
            if (Math.abs(total - articles[currentArticle].price) < 0.001) {
                setError("");
                setTimeout(() => {
                    setScoreLevel2((prev) => prev + 1);
                    if (currentArticle < articles.length - 1) {
                        setCurrentArticle(currentArticle + 1);
                        setSelectedCoins([]);
                    } else {
                        setGameCompleted(true);
                        alert("Parabéns! Completaste todos os artigos!");
                    }
                }, 300);
            } else if (total > articles[currentArticle].price) {
                setError("O valor passou o necessário! Tenta de novo.");
                setTimeout(() => setSelectedCoins([]), 1000);
            }
        }
    }, [total, level, currentArticle, scoreLevel2, gameCompleted]);

    // Pontuação a mostrar
    const pontuacao = level === 0 ? scoreLevel1 : scoreLevel2;

    return (
        <div className="minigames-container">
            <div className="mini-games">
                <h2>{levels[level].description}</h2>
                {loadingProgress ? (
                    <div style={{ textAlign: 'center', margin: '2rem', fontWeight: 600 }}>A carregar progresso...</div>
                ) : (
                    <>
                        {/* Botão de reset só aparece se estiver autenticado */}
                        {user && (
                            <button onClick={handleResetProgress} style={{ marginBottom: '1rem', background: '#e57373', color: 'white', border: 'none', borderRadius: '6px', padding: '0.6rem 1.2rem', fontWeight: 600, cursor: 'pointer' }}>
                                Resetar Progresso
                            </button>
                        )}
                <div className="game-area">
                    <div className="coins-side coins-left">
                        {(level === 0 ? shuffledCoins.slice(0, 4) : coins.slice(0, 4)).map((coin) => (
                            <img
                                key={coin.value}
                                src={coin.img}
                                alt={`${coin.value} euro`}
                                draggable
                                onDragStart={(e) => handleStartDrag(e, coin.value)}
                                className="coin"
                            />
                        ))}
                    </div>
                    {level === 0 && (
                        <div
                            className="piggy-bank"
                            onDragOver={(e) => e.preventDefault()}
                            onDrop={handleDropLevel1}
                        >
                            <img src={piggyBank} alt="Porquinho" />
                        </div>
                    )}
                    {level === 1 && (
                        <div
                            className="article-dropzone"
                            onDragOver={(e) => e.preventDefault()}
                            onDrop={handleDropLevel2}
                        >
                            <img src={articles[currentArticle].img} alt={articles[currentArticle].name} />
                            <div className="article-name">{articles[currentArticle].name}</div>
                            <div className="article-target">Valor: {articles[currentArticle].price.toFixed(2)}€</div>
                            <div className="selected-coins">
                                {selectedCoins.map((v, i) => (
                                    <span key={i} className="selected-coin">{v}€ </span>
                                ))}
                            </div>
                            <div className="article-total">Total: {total.toFixed(2)}€</div>
                        </div>
                    )}
                    <div className="coins-side coins-right">
                        {(level === 0 ? shuffledCoins.slice(4) : coins.slice(4)).map((coin) => (
                            <img
                                key={coin.value}
                                src={coin.img}
                                alt={`${coin.value} euro`}
                                draggable
                                onDragStart={(e) => handleStartDrag(e, coin.value)}
                                className="coin"
                            />
                        ))}
                    </div>
                </div>
                <div className="score">Pontuação do nível {level + 1} : {pontuacao}</div>
                        {gameCompleted && <div className="success" style={{ color: '#388e3c', fontWeight: 600, marginTop: '1rem' }}>Jogo completo! Usa o botão de reset para recomeçar.</div>}
                {error && <div className="error">{error}</div>}
                        {/* Botão Voltar abaixo do jogo */}
                        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '2rem' }}>
                            <button
                                className="back-to-selection-btn"
                                onClick={() => window.location.hash = '#/jogos'}
                                style={{
                                    background: '#eee',
                                    color: '#333',
                                    border: 'none',
                                    borderRadius: '6px',
                                    padding: '0.5rem 1.2rem',
                                    fontWeight: 600,
                                    cursor: 'pointer',
                                    fontSize: '1rem',
                                    boxShadow: '0 1px 4px rgba(0,0,0,0.07)'
                                }}
                            >
                                ← Voltar à seleção de minijogos
                            </button>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}

