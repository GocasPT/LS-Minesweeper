import React, { useState, useEffect } from "react";
import { CELL_FLAG, CELL_VALUES, LEVELS } from '../../constants';
import { createGrid, putMines, reveal } from '../../helpers';
import { Cell } from "../";
import './game-panel.css'

let levelConfig;

const GamePanel = (props) => {
    const { gameStarted, level, mines, setMines, gameOver, onGameOver } = props;

    const [grid, setGrid] = useState([]);

    useEffect(() => {
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
    
        if (levelConfig === null) {
            setGrid([]);
            return;
        }
    
        const newGrid = createGrid(levelConfig.rows, levelConfig.cols);
        setGrid(newGrid);
    }, [level]);
    
    useEffect(() => {
        if (gameStarted) {
            setMines(levelConfig.mines);
            const newGrid = [...grid];

            newGrid.forEach(row => row.forEach(cell => {
                cell.revealed = false;
                cell.flag = CELL_FLAG.NOTHING;
                cell.value = CELL_VALUES.EMPTY;
            }));

            putMines(newGrid, levelConfig.mines);
            setGrid(newGrid);
        }
    }, [gameStarted]);
    
    useEffect(() => {
        if (gameOver) {
            const newGrid = grid.map(row =>
                row.map(cell => ({
                    ...cell,
                    revealed: cell.value === CELL_VALUES.MINE ? true : cell.revealed
                }))
            );
            setGrid(newGrid);
        }
    }, [gameOver]);
    

    // Rigth click to reveal cell
    const revealCell = (x, y) => {
        if (gameStarted) {
            if (grid[x][y].revealed || grid[x][y].flag === CELL_FLAG.FLAG)
            return;
        
            let newGrid = [...grid];
            let newRevealCells = reveal(newGrid, x, y);

            if (newRevealCells[x][y].value === CELL_VALUES.MINE) {
                onGameOver(true);
                newRevealCells[x][y].value = CELL_VALUES.EXPLOSION;
            }
            
            let allNonMineRevealed = true;
            newRevealCells.forEach(row => {
                row.forEach(cell => {
                    if (cell.value !== CELL_VALUES.MINE && !cell.revealed)
                        allNonMineRevealed = false;
                });
            });

            if (allNonMineRevealed) {
                onGameOver(true);
            }

            setGrid(newRevealCells);
        }
    }

    // Left click to change state cell
    const updateFlagCell = (x, y) => {
        if (gameStarted) {
            let newGrid = [...grid];

            if (newGrid[x][y].revealed)
                return

            switch (newGrid[x][y].flag) {
                case CELL_FLAG.NOTHING:
                    newGrid[x][y].flag = CELL_FLAG.FLAG;

                    if (newGrid[x][y].value === CELL_VALUES.MINE)
                        setMines(mines - 1);

                    break;

                case CELL_FLAG.FLAG:
                    if (newGrid[x][y].value === CELL_VALUES.MINE)
                        setMines(mines + 1);

                    newGrid[x][y].flag = CELL_FLAG.QUESTION;
                    break;

                case CELL_FLAG.QUESTION:
                    newGrid[x][y].flag = CELL_FLAG.NOTHING;
                    break;

                default:
                    break;
            }

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
            <div id="game" className={`${gameClass}`}>
                {grid.map((gridRow, i) =>
                    gridRow.map((cell, k) => 
                        <Cell
                            key={`${i}-${k}`}
                            item={cell}
                            onLeftClick={revealCell}
                            onRightClick={updateFlagCell}
                        />
                    )
                )}
            </div>
        </section>
    );
};

export default GamePanel;