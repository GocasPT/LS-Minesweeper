import React, { useEffect, useState } from 'react';
import { Header, ControlPanel, Footer, GamePanel, GameOverModal } from './components';
import { setMines } from './helpers'
import { LEVELS } from './constants'

let timerID = undefined;

function App() {
  const [gameStarted, setGameStarted] = useState(false);
  const [level, setLevel] = useState("0");

  const [cells, setCells] = useState([[]]);
  const [stopWatch, setStopWatch] = useState(0);

  const [gameOver, setGameOver] = useState(false);
  const [minesLeft, setMinesLeft] = useState(0);

  // Start the game
  const handleGameStart = () => {
    if (gameStarted)
      setGameStarted(false);
    else
      setGameStarted(true);
  }

  // Set the game level
  const handleLevelChange = (event) => {
    const { value } = event.currentTarget;
    setLevel(value);

    let level;
    switch (value) {
      // Level: Básico
      case "1":
        level = LEVELS.BASIC;
        break;

      // Level: Intermediário
      case "2":
        level = LEVELS.INTERMEDIATE;
        break;
      
      // Level: Avançado
      case "3":
        level = LEVELS.ADVANCED;
        break;

      // Default
      default:
        level = null;
        break;
    }

    if (level === null) {
      setMinesLeft(0);
      setCells([[]]);
      return;
    }

    setMinesLeft(level.mines);
    setCells(Array.from({ length: level.rows }, () => Array.from({ length: level.cols }, () => 0)));
  }

  // Stopwatch count (trigger on gameStarted)
  useEffect(() => {
    if (gameStarted) {
      timerID = setInterval(() => { // atualiza o cronômetro
        let nexTime;
        setStopWatch((previousState) => {
          nexTime = previousState + 1; // stopWatch++
          return nexTime;
        })
      }, 1000); // a cada 1 segundo
    } else { // Reset the stopwatch
      setStopWatch(0);
    }

    return () => {
      if (timerID)
        clearInterval(timerID);
    };
  }, [gameStarted])

  return (
    <div className="App" id="container">
      <Header />
      {/*TODO: check this block*/}
      <main className='main-content'>
        <ControlPanel
          gameStarted={gameStarted}
          level={level}
          onGameStart={handleGameStart}
          onLevelChange={handleLevelChange}
          stopWatch={stopWatch}
          minesLeft={minesLeft}
        />
        <GamePanel
          gameStarted={gameStarted}
          level={level}
          cells={cells}
          setCells={setCells}
          stopWatch={stopWatch}
          onGameOver={(value) => setGameOver(value)}
        />
        <GameOverModal
          gameOver={gameOver}
          stopWatch={stopWatch}
          minesLeft={minesLeft}
        />
      </main>
      <Footer />
    </div>
  );
}

export default App;