import Header from '../Components/Header';
import Footer from '../Components/Footer';
import PageTransition from '../Components/PageTransition';
import { useNavigate } from 'react-router-dom';
import piggyBank from '../assets/piggybank.png';
import piggyWise from '../assets/piggywise.gif';
import '../styles/MiniGames.css';

const games = [
  {
    name: 'Jogo das Moedas',
    description: 'Aprende a identificar moedas e pagar artigos!',
    img: piggyBank,
    route: '/jogos/moedas',
    available: true
  },
  {
    name: 'Porquinho Sábio',
    description: 'Vou ver a sua sabedoria sobre o dinheiro!',
    img: piggyWise,
    route: '/jogos/porquinho-sabio',
    available: true
  }
];

const MiniGamesSelection = () => {
  const navigate = useNavigate();
  return (
    <>
      <Header />
      <PageTransition>
        <div className="minigames-bg-container">
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'flex-start', minHeight: 'calc(100vh - 105px - 80px)', width: '100%' }}>
            <div style={{
              background: '#fff',
              border: '3px solid #7d925c',
              borderRadius: '18px',
              boxShadow: '0 2px 16px rgba(125,146,92,0.08)',
              padding: '2.5rem 2rem 2rem 2rem',
              maxWidth: 'min(900px, 95vw)',
              width: '100%',
              margin: '2.5rem 0',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center'
            }}>
              <h1 style={{ color: '#7d925c', fontWeight: 800, fontSize: '2rem', marginBottom: '1.5rem', textAlign: 'center', letterSpacing: '-1px' }}>
                Minijogos
              </h1>
              <div className="minigames-cards">
                {games.map((game) => (
                  <div className="minigame-card" key={game.name}>
                    <img src={game.img} alt={game.name} className="minigame-img" />
                    <h3>{game.name}</h3>
                    <p>{game.description}</p>
                    <button
                      className="minigame-play-btn"
                      onClick={() => game.available && navigate(game.route)}
                      disabled={!game.available}
                    >
                      {game.available ? 'Jogar' : 'Em breve'}
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </PageTransition>
      <Footer />
    </>
  );
};

export default MiniGamesSelection; 