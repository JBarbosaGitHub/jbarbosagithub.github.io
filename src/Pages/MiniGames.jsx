import Header from '../Components/Header';
import Footer from '../Components/Footer';
import PageTransition from '../Components/PageTransition';
import MiniGames from '../Components/MiniGames';

const CoinGamePage = () => {
  return (
    <>
      <Header />
      <PageTransition>
          <MiniGames />
      </PageTransition>
      <Footer />
    </>
  );
};

export default CoinGamePage; 