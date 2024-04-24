import React, { useEffect, useState } from 'react';
import { Header, ControlPanel, Footer, GamePanel, GameOverModal } from './components';

let timerID = undefined;

function App() {
  const [gameStarted, setGameStarted] = useState(false);
  const [level, setLevel] = useState("0");
  const [mines, setMines] = useState(0);
  const [stopWatch, setStopWatch] = useState(0);
  const [gameOver, setGameOver] = useState(false);

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
          minesLeft={mines}
        />
        <GamePanel
          gameStarted={gameStarted}
          level={level}
          setMines={(value) => setMines(value)}
          onGameOver={(value) => setGameOver(value)}
        />
        <GameOverModal
          gameOver={gameOver}
          stopWatch={stopWatch}
          minesLeft={mines}
        />
      </main>
      <Footer />
    </div>
  );
}

export default App;