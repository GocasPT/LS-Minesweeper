import { CELL_VALUES } from '../constants';

function putMines(grid, numberOfMines) {
    let mines = [];

    while (mines.length < numberOfMines) {
        // Gera uma mina em uma posição aleatória
        const x = Math.floor(Math.random() * grid.length);
        const y = Math.floor(Math.random() * grid[0].length);

        // Se a posição não tiver uma mina, coloca uma mina
        if (grid[x][y].value !== CELL_VALUES.MINE) {
            grid[x][y].value = CELL_VALUES.MINE;
            mines.push({ x, y });

            // Incrementa o valor das células ao redor da mina
            for (let i = -1; i <= 1; i++) {
                for (let j = -1; j <= 1; j++) {
                    if (x + i >= 0 && x + i < grid.length && y + j >= 0 && y + j < grid[0].length) {
                        if (grid[x + i][y + j].value !== CELL_VALUES.MINE) {
                            grid[x + i][y + j].value++;
                        }
                    }
                }
            }
        }
    }

    return mines;
}

export default putMines;