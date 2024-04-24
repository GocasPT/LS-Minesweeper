import React, { useState, useEffect } from "react";
import { CELL_FLAG, CELL_VALUES, LEVELS } from '../../constants';
import { createGrid, putMines, reveal } from '../../helpers';
import { Cell } from "../";
import './game-panel.css'

const GamePanel = (props) => {
    const { gameStarted, level, setMines, onGameOver } = props;

    const [grid, setGrid] = useState([]);
    const [cellsRevealed, setRevealCells] = useState(0);

    useEffect(() => { // cria umma nova grid
        let levelConfig;
        switch (level) {
            case '1':
                levelConfig = LEVELS.BASIC;
                break;

            case '2':
                levelConfig = LEVELS.INTERMEDIATE;
                break;

            case '3':
                levelConfig = LEVELS.ADVANCED;
                break;

            default:
                levelConfig = null;
                break;
        }

        if (levelConfig == null) {
            setGrid([]);
            return;
        }

        let newGrid = createGrid(levelConfig.rows, levelConfig.cols);
        let newMines = putMines(newGrid, levelConfig.mines);

        setGrid(newGrid);
        //setMines(newMines);
    }, [level]) // quando o nível mudar

    // Left click to change state cell
    const revealCell = (x, y) => {
        if (gameStarted) {
            if (grid[x][y].revealed)
                return

            let newGrid = [...grid];
            /*if (newGrid[x][y].value === CELL_VALUES.MINE)
                onGameOver(false);
            else {*/
                let newCellsRevealed = cellsRevealed;
                let newRevealCells = reveal(newGrid, x, y, cellsRevealed);
                setGrid(newRevealCells);
                setRevealCells(newCellsRevealed);
                /*if () //TODO: Check if the player won the game
                    onGameOver(true);*/
            //}
        }
    }

    // Rigth click to reveal cell
    const updateFlagCell = (event, x, y) => {
        if (gameStarted) {
            event.preventDefault(); // Desativa o menu de contexto

            let newGrid = [...grid];

            if (newGrid[x][y].revealed)
                return

            switch (newGrid[x][y].flag) {
                case CELL_FLAG.NOTHING:
                    newGrid[x][y].flag = CELL_FLAG.FLAG;
                    break;

                case CELL_FLAG.FLAG:
                    newGrid[x][y].flag = CELL_FLAG.QUESTION;
                    break;

                case CELL_FLAG.QUESTION:
                    newGrid[x][y].flag = CELL_FLAG.NOTHING;
                    break;

                default:
                    break;
            }

            //TODO: update the number of mines left (up or down)

            setGrid(newGrid);
        }
            
    }

    const gameClass =
        level === '1'
        ? ''
        : level === '2'
        ? 'intermedio'
        : level === '3'
        ? 'avancado'
        : '';

    return (
        <section className="game-panel">
            <div id="game" className={gameClass}>
                {grid.map((gridRow, i) =>
                    gridRow.map((cell, k) => 
                        <Cell
                            key={`${i}-${k}`}
                            item={cell}
                            onLeftClieck={revealCell}
                            onRighClick={updateFlagCell}
                        />
                    )
                )}
            </div>
        </section>
    );
}

export default GamePanel;