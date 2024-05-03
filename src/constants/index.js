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

// Valores da célula
export const CELL_VALUES = {
	EMPTY: 0,
	MINE: -1,
	EXPLOSION: -2
}

// Estados da célula
export const CELL_FLAG = {
	NOTHING: 0,
	FLAG: 1,
	QUESTION: 2
}

// Emojis
export const EMOTES = {
	OPENED: "",
	FLAG: "🚩",
	QUESTION: "❓",
	MINE: "💣",
	EXPLOSION: "💥",
}