import { CELL_FLAG, CELL_VALUES } from '../constants';

function reveal(newGrid, x, y, numOfRevealedCells) {
    let grid = [...newGrid];

    if (grid[x][y].revealed || grid[x][y].flag !== CELL_FLAG.NOTHING)
        return grid

    grid[x][y].revealed = true;
    if (grid[x][y].value === CELL_VALUES.EMPTY) {
        numOfRevealedCells++;
        for (let i = -1; i <= 1; i++) {
            for (let j = -1; j <= 1; j++) {
                if (x + i >= 0 && x + i < grid.length && y + j >= 0 && y + j < grid[0].length) {
                    grid = reveal(grid, x + i, y + j, numOfRevealedCells);
                }
            }
        }
    }

    return grid;
}

export default reveal;