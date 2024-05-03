import React, { useEffect, useState } from 'react';
import { Header, ControlPanel, Footer, GamePanel, GameOverModal } from './components';
import { LEVELS } from './constants'
import './assets/styles/App.css'

let timerID = undefined;

function App() {
  const [gameStarted, setGameStarted] = useState(false);
  const [level, setLevel] = useState("0");
  const [numMines, setNumMines] = useState(0);
  const [stopWatch, setStopWatch] = useState(0);
  const [gameOver, setGameOver] = useState(false);

  // Start the game
  const handleGameStart = () => {
    if (gameStarted)
      setGameStarted(false);
    else
      setGameStarted(true);
  }

  // Game Over
  const handleGameOver = () => {
    if (gameOver) {
      setGameOver(false);
      clearInterval(timerID);
      setStopWatch(0);
    }
    else {
      setGameStarted(false);
      setGameOver(true);
    }
  }

  // Set the game level
  const handleLevelChange = (event) => {
    const { value } = event.currentTarget;
    setLevel(value);
    
    switch (value) {
      case "1":
        setNumMines(LEVELS.BASIC.mines);
        break;

      case "2":
        setNumMines(LEVELS.INTERMEDIATE.mines);    
        break;

      case "3":
        setNumMines(LEVELS.ADVANCED.mines);
        break;

      default:
        setNumMines(0);
    }
  }

  // Stopwatch count (trigger on gameStarted)
  useEffect(() => {
  if (gameStarted) {
    timerID = setInterval(() => {
      setStopWatch(prev => prev + 1);
    }, 1000);
  }

  return () => {
    clearInterval(timerID);
  };
}, [gameStarted]);

  return (
    <div className="App" id="container">
      <Header />
      <main className='main-content'>
        <ControlPanel
          gameStarted={gameStarted}
          level={level}
          onGameStart={handleGameStart}
          onLevelChange={handleLevelChange}
          stopWatch={stopWatch}
        />
        <GamePanel
          gameStarted={gameStarted}
          level={level}
          mines={numMines}
          setMines={setNumMines}
          gameOver={gameOver}
          onGameOver={handleGameOver}
        />
        <GameOverModal
          isOpen={gameOver}
          stopWatch={stopWatch}
          minesLeft={numMines}
          handleClose={handleGameOver}
        />
      </main>
      <Footer />
    </div>
  );
}

export default App;