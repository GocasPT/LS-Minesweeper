import React, { useEffect } from "react";
import { Cell } from "../";
import './game-panel.css'

const GamePanel = (props) => {
    const { level, gameStarted, cells, setCells, stopWatch, onGameOver } = props;

    const [findMines, setFindMines] = React.useState(0);

    // Rigth click to reveal cell
    const handleClickToRevealCell = (cell) => {
        if (gameStarted)
            //TODO: reveal cell
            console.log(cell);
    }

    // Left click to change state cell
    const handleClickToStatecell = (cell) => {
        if (gameStarted)
            //TODO: change state cell
            console.log(cell);
    }

    const checkCell = () => {
        // TODO: Logic
        //maybe recursive function
        // if cell is empty/null → reveal all adjacent cells until have number (wall of number)
        // if cell is number → reveal cell
        // if cell is mine → end game and reveal all mines
    }

    // Start game (trigger on gameStarted)
    /*useEffect(() => {
        if (!gameStarted) {
            setRevealCells([]);
            setFindMines([]);
        }
    }, [gameStarted])*/

    // Check if the player won the game (tigger on findMines)
    /*useEffect(() => {
        //TODO: Check if the player won the game
        if (gameStarted && findMines === level)
            onGameOver(true);

        onGameOver(true);
    }, [findMines])*/ //TODO: PLACEHOLDER

    const gameClass =
    level === "1"
      ? ""
      : level === "2"
      ? "intermedio"
      : "avancado";

    return (
        <section className="game-panel">
            <div id="game" className={gameClass}>
                {cells.map((cellRow, index) =>
                    cellRow.map((cell, index) => 
                        <Cell
                            key={index}
                            value={cell.value}
                            isRevealed={cell.isRevealed}
                            onLeftClieck={() => handleClickToRevealCell()}
                            onRighClick={() => handleClickToStatecell()}
                        />
                        )
                )}
            </div>
        </section>
    );
}

export default GamePanel;