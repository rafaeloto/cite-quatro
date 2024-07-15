import { useState } from 'react';
import useSound from 'use-sound';
import clickSound from '/sounds/click.mp3';
import gameOverSound from '/sounds/game-over.mp3';
import './ViraCopos.css';

const ViraCopos = () => {
  const [chosen, setChosen] = useState<number | null>(null);
  const [eliminationStatus, setEliminationStatus] = useState<boolean[]>(Array(51).fill(false));
  const [gameOver, setGameOver] = useState(false);
  const [playClick] = useSound(clickSound);
  const [playGameOver] = useSound(gameOverSound);

  function toggleFullScreen() {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
    } else if (document.exitFullscreen) {
      document.exitFullscreen();
    }
  }

  const handleDrawNumber = () => {
    const randomNum = Math.floor(Math.random() * 51);
    setChosen(randomNum);
    setEliminationStatus(Array(51).fill(false));
    setGameOver(false);
  };

  const handleButtonClick = (index: number) => {
    if (chosen === null) return;

    const newEliminated = [...eliminationStatus];

    if (index === chosen) {
      for (let i = 0; i < 51; i++) {
        if (i !== chosen) {
          newEliminated[i] = true;
        }
      }
      setEliminationStatus(newEliminated);
      setGameOver(true);
      playGameOver();
    } else {
      if (index > chosen) {
        for (let i = index; i < 51; i++) {
          newEliminated[i] = true;
        }
      } else {
        for (let i = 0; i <= index; i++) {
          newEliminated[i] = true;
        }
      }
      setEliminationStatus(newEliminated);
      playClick();
    }
  };

  return (
    <div className="vira-copos-container">
      <img className={`logo ${chosen === null ? 'home' : 'game'}`} src='/images/vira-copos-logo.png' alt='Vira Copos' />
      <button className="full-screen-button" onClick={toggleFullScreen}>
        <img className="full-screen-icon" src='/icons/fullscreen.png' alt='Tela cheia' />
      </button>
      {chosen === null ? (
        <button className="draw-button" onClick={handleDrawNumber}>Sortear</button>
      ) : (
        <div className="grid">
          {Array.from({ length: 51 }).map((_, index) => (
            <button
              key={index}
              className={`grid-button ${eliminationStatus[index] ? 'eliminated' : ''} ${gameOver && index === chosen ? 'winner' : ''}`}
              onClick={() => !eliminationStatus[index] && handleButtonClick(index)}
              disabled={eliminationStatus[index] || gameOver}
            >
              {index}
            </button>
          ))}
          <button
            className="grid-button reset-button"
            onClick={handleDrawNumber}
            disabled={!gameOver}
          >
            Sortear
          </button>
        </div>
      )}
    </div>
  );
};

export default ViraCopos;
