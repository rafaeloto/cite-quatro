import { useState, useEffect } from 'react';
import useSound from 'use-sound';
import beepSound from '/sounds/beep.mp3';
import buzzerSound from '/sounds/buzzer.mp3';
import './Game.css';

const Game = () => {
  const [isActive, setIsActive] = useState(false);
  const [timeLeft, setTimeLeft] = useState(15);
  const [category, setCategory] = useState('');
  const [categories, setCategories] = useState<string[]>([]);
  const [playBeep, { stop: stopBeep }] = useSound(beepSound);
  const [playAlarm, { stop: stopAlarm }] = useSound(buzzerSound);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch('/categories.json');
        const data = await response.json();
        setCategories(data);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };
    fetchCategories();
  }, []);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isActive && timeLeft > 0) {
      timer = setTimeout(() => {
        setTimeLeft(timeLeft - 1);
        if (timeLeft === 9) {
          playBeep();
        }
      }, 1000);
    } else if (timeLeft === 0) {
      stopBeep();
      playAlarm();
      setIsActive(false);
    }
    return () => clearTimeout(timer);
  }, [isActive, timeLeft, playBeep, playAlarm, stopBeep]);

  const getRandomCategory = () => {
    const randomIndex = Math.floor(Math.random() * categories.length);
    return categories[randomIndex];
  };

  const startGame = () => {
    stopAlarm();
    setCategory(getRandomCategory());
    setTimeLeft(15);
    setIsActive(true);
  };

  const stopGame = () => {
    stopBeep();
    setIsActive(false);
    setTimeLeft(-1);
  };

  return (
    <>
      <div className="background-blur"></div>
      <div className="container">
        <img className='logo' src='/images/cite-4-logo.png' alt='Cite 4' />
        {isActive ? (
          <div className='content'>
            <div className="timer-circle">
              <svg className="timer-svg">
                <circle
                  className="timer-path"
                  cx="50%"
                  cy="50%"
                  r="70"
                  style={{
                    strokeDashoffset: timeLeft === 15 ? 0 : (440 / 15) * (16 - timeLeft),
                  }}
                />
              </svg>
              <div className="timer-text">{timeLeft}</div>
            </div>
            <p className='category'>{category}</p>
            <button onClick={stopGame}>{'Parar'}</button>
          </div>
        ) : (
          <div className='content'>
            {timeLeft <= 0 && <p className='category'>{category}</p>}
            <button onClick={startGame}>{`Começar${timeLeft <= 0 ? ' de novo' : ''}`}</button>
          </div>
        )}
      </div>
    </>
  );
};

export default Game;
