import { CELL_VALUES, CELL_FLAG } from '../constants';

function createGrid(rows, cols) {
    let grid = [];

    for (let i = 0; i < rows; i++) {
        grid.push([]);
        for (let j = 0; j < cols; j++) {
            grid[i].push({
                value: CELL_VALUES.EMPTY,
                revealed: false,
                flag: CELL_FLAG.NOTHING,
                x: i,
                y: j
            });
        }
    }

    return grid;
}

export default createGrid;