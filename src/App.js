import React, { useEffect, useState } from 'react';
import { Header, ControlPanel, Footer, GamePanel, GameOverModal } from './components';

let timerID = undefined;

function App() {
  const [gameStarted, setGameStarted] = useState(false);
  const [level, setLevel] = useState("0");

  const [cells, setCells] = useState([]);
  const [stopWatch, setStopWatch] = useState(0);

  const [gameOver, setGameOver] = useState(false);
  const [totalPoints, setTotalPoints] = useState(0);

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

    let numOfMines;
    switch (value) {
      // Level: Básico
      case "1":
        numOfMines = 10;
        break;

      // Level: Intermediário
      case "2":
        numOfMines = 40;
        break;
      
      // Level: Avançado
      case "3":
        numOfMines = 99;
        break;

      // Default
      default:
        numOfMines = 0;
        break;
    }
  }

  //TODO: gen tab + mines

  // Stopwatch count
  useEffect(() => {
    if (gameStarted) {
      timerID = setInterval(() => { // atualiza o cronômetro
        let nexTime;
        setStopWatch((previousState) => {
          nexTime = previousState + 1;
          return nexTime;
        })
      }, 1000); // a cada 1 segundo
    } else if (stopWatch !== 0) {
      setStopWatch(0);
      //TODO: update poitns
      setGameOver(true);
    }

    return () => {
      if (timerID)
        clearInterval(timerID);
    };
  }, [gameStarted])

  //TODO: sistema de pontuação

  return (
    <div className="App" id="container">
      <Header />
      {/*TODO: check this block*/}
      <main className='main-content'>
        <ControlPanel
          gameStarted={gameStarted}
          level={level}
          handleGameStart={handleGameStart}
          handleLevelChange={handleLevelChange}
        />
        <GamePanel
          cells={cells}
          setCells={setCells}
          stopWatch={stopWatch}
        />
        <GameOverModal
          gameOver={gameOver}
          totalPoints={totalPoints}
        />
      </main>
      <Footer />
    </div>
  );
}

export default App;
