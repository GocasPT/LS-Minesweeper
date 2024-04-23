// Configuração da interface do jogo
export const CELL_SIZE = 25;
export const CELL_MARGIN = 2;

export const LEVELS = {
	BASIC: {
		rows: 9,
		cols: 9,
		mines: 10
	},
	
	INTERMEDIATE: {
		rows: 16,
		cols: 16,
		mines: 40
	},

	ADVANCED: {
		rows: 16,
		cols: 30,
		mines: 99
	}
}

// Estados de uma célula
export const CODES = {
	OPENED: 0,
	NOTHING: -1,
	FLAG: -2,
	QUESTION: -3,
	MINE: -4,
	MINE_FLAG: -5,
	MINE_QUESTION: -6
};

// Emojis
export const EMOTES = {
	OPENED: "",
	FLAG: "🚩",
	QUESTION: "❓",
	MINE: "💣",
	EXPLOSION: "💥",
}