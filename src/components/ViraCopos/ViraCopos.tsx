import { useEffect, useRef, useState } from 'react';
import { isFullScreenEnabled } from '../../utils/fullscreen';
import { stopAllSounds } from '../../utils/soundUtils';
import BackButton from '../buttons/BackButton/BackButton';
import FullScreenButton from '../buttons/FullScreenButton/FullScreenButton';
import useSound from 'use-sound';
import clickSound from '/sounds/click.mp3';
import gameOverSound from '/sounds/game-over.mp3';
import firstClickHitSound from '/sounds/first-click-hit.mp3';
import firstClickHitGIF from '/gifs/first-click-hit.gif';
import './ViraCopos.css';

const ViraCopos = () => {
  const [chosen, setChosen] = useState<number | null>(null);
  const [eliminationStatus, setEliminationStatus] = useState<boolean[]>(Array(51).fill(false));
  const [gameOver, setGameOver] = useState(false);
  const [isResetModalVisible, setIsResetModalVisible] = useState(false);
  const [isPickNumber, setIsPickNumber] = useState(false);
  const [pickedNumber, setPickedNumber] = useState<number | null>(null);
  const [firstClickHit, setFirstClickHit] = useState(false);

  const [playClick, { stop: stopClick }] = useSound(clickSound);
  const [playGameOver, { stop: stopGameOver }] = useSound(gameOverSound);
  const [playFirstClickHit, { stop: stopFirstClickHit }] = useSound(firstClickHitSound);

  const canOpenFullScreen = isFullScreenEnabled();

  const soundsRef = useRef<{ [key: string]: () => void }>({});
  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    soundsRef.current['clickSound'] = stopClick;
    soundsRef.current['gameOverSound'] = stopGameOver;
    soundsRef.current['firstClickHitSound'] = stopFirstClickHit;
  }, [stopClick, stopGameOver, stopFirstClickHit]);

  const handleOpenResetModal = () => {
    stopAllSounds(soundsRef);
    setFirstClickHit(false);
    setIsResetModalVisible(true);
  };

  const restartGame = () => {
    setEliminationStatus(Array(51).fill(false));
    setGameOver(false);
    setFirstClickHit(false);
    setIsResetModalVisible(false);
    setIsPickNumber(false);
    setPickedNumber(null);
  }

  const handleDrawNumber = () => {
    const randomNum = Math.floor(Math.random() * 51);
    setChosen(randomNum);
    restartGame();
  };

  const handlePickNumber = () => {
    if (pickedNumber !== null && pickedNumber >= 0 && pickedNumber < 51) {
      setChosen(pickedNumber)
      restartGame();
    }
  }

  const handleButtonClick = (index: number) => {
    if (chosen === null) return;

    stopAllSounds(soundsRef);
    const newEliminated = [...eliminationStatus];

    if (index === chosen) {
      if (newEliminated.every((status) => status === false)) {
        setFirstClickHit(true);
        playFirstClickHit();
      } else {
        playGameOver();
      }

      for (let i = 0; i < 51; i++) {
        if (i !== chosen) {
          newEliminated[i] = true;
        }
      }
      setEliminationStatus(newEliminated);
      setGameOver(true);
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

  useEffect(() => {
    if (isPickNumber && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isPickNumber]);

  useEffect(() => {
    return () => {
      stopAllSounds(soundsRef);
    };
  }, []);

  return (
    <div className="vira-copos-container">
      <BackButton />
      <img className={`logo ${chosen === null ? 'home' : 'game'}`} src='/images/vira-copos-logo.png' alt='Vira Copos' />
      {canOpenFullScreen && <FullScreenButton />}
      {chosen === null ? (
        <button className="draw-button" onClick={handleOpenResetModal}>Começar</button>
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
            onClick={handleOpenResetModal}
            disabled={!gameOver}
          >
            Começar
          </button>
        </div>
      )}
      {isResetModalVisible && (
        <div className='reset-modal'>
          {!isPickNumber ? (
            <>
              <button onClick={handleDrawNumber}>Sortear</button>
              <button onClick={() => setIsPickNumber(true)}>Escolher</button>
            </>
          ) : (
            <>
              <label htmlFor="pick-number-input">Escolha um número:</label>
              <input
                ref={inputRef}
                id='pick-number-input'
                type='number'
                value={pickedNumber ?? ''}
                onChange={(e) => setPickedNumber(parseInt(e.target.value))}
                min="0"
                max="50"
              />
              <button onClick={handlePickNumber}>Escolher</button>
            </>
          )}
        </div>
      )}
      {firstClickHit && (
        <div className="animation-container">
          <img src={firstClickHitGIF} alt='De primeira!' className="first-click-hit-gif" />
          <p>De primeira!</p>
          <p>VIRA O COPO!</p>
        </div>
      )}
    </div>
  );
};

export default ViraCopos;
