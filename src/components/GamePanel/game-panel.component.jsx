import React, { useEffect } from "react";

const GamePanel = (props) => {
    const { level, gameStarted, onGameStart } = props;

    const [revealCells, setRevealCells] = React.useState([]);
    const [findMines, setFindMines] = React.useState(0);

    const handleClickCell = (cell) => {
        if (gameStarted)
            setRevealCells(previous => [...previous, cell]);
    }

    const checkCell = () => {
        // TODO: Logic
    }

    // Start game (trigger on gameStarted)
    useEffect(() => {
        if (!gameStarted) {
            setRevealCells([]);
            setFindMines([]);
        }
    }, [gameStarted])

    // Check if the player won the game (tigger on findMines)
    useEffect(() => {
        //TODO: Check if the player won the game
        if (gameStarted && findMines === level)
            onGameStart(false);
    }, [findMines]) //TODO: PLACEHOLDER

    //TODO: check cell

    const gameLevel =
        level === "1"
            ? "Básico"
            : level === "2"
            ? "Intermédio"
            : "Avançado";

    return (
        <section className="game-panel">
            <h3 className="sr-only">PEças do Jogo</h3>
            <div id="game" className={gameLevel}>
                {/*TODO: show tab*/}
            </div>
        </section>
    );
}

export default GamePanel;