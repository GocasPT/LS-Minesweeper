import { MINE } from '../constants';

function generateMines(tab, numberOfMines) {
    let mines = 0;
    while (mines < numberOfMines) {
        // Gera uma mina em uma posição aleatória
        const x = Math.floor(Math.random() * tab.length);
        const y = Math.floor(Math.random() * tab[0].length);

        // Se a posição não tiver uma mina, coloca uma mina
        if (tab[x][y] !== -1) {
            tab[x][y] = MINE;
            mines++;

            // Incrementa o número de minas ao redor
            if (x > 0 && y > 0 && tab[x - 1][y - 1] !== MINE) tab[x - 1][y - 1]++;
            if (x > 0 && tab[x - 1][y] !== MINE) tab[x - 1][y]++;
            if (x > 0 && y < tab[0].length - 1 && tab[x - 1][y + 1] !== MINE) tab[x - 1][y + 1]++;
            if (y > 0 && tab[x][y - 1] !== MINE) tab[x][y - 1]++;
            if (y < tab[0].length - 1 && tab[x][y + 1] !== MINE) tab[x][y + 1]++;
            if (x < tab.length - 1 && y > 0 && tab[x + 1][y - 1] !== MINE) tab[x + 1][y - 1]++;	
            if (x < tab.length - 1 && tab[x + 1][y] !== MINE) tab[x + 1][y]++;
            if (x < tab.length - 1 && y < tab[0].length - 1 && tab[x + 1][y + 1] !== MINE) tab[x + 1][y + 1]++;
        }
    }
}

export default generateMines;