import { Link } from 'react-router-dom';
import './Home.css';

const Home = () => {
  return (
    <div className="home-container">
      <img className="home-logo" src='/images/oto-game-logo.png' alt='Oto Games' />
      <nav>
        <Link className="game-card" to="/cite-4">
          <img src="/images/cite-4-logo.png" alt="Cite 4" />
          <p>O jogador tem que citar 4 coisas dentro da categoria da rodada. Não conseguiu, bebe! Conseguiu, escolhe alguem para beber!</p>
        </Link>
        {/* <Link className="game-card" to="/vira-copos">
          <img src="/images/vira-copos-logo.png" alt="Vira Copos" />
          <p>Um número é sorteado e cada jogador clica em um número na sua vez. Quem clicar no premiado bebe!</p>
        </Link> */}
      </nav>
    </div>
  );
};

export default Home;
