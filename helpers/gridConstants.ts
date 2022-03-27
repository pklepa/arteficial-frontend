const GRID_COLUMNS = 17;
const GRID_ROWS = 17;
const GRID_GAP = 20;

const ITEM_WIDTH = 300;
const ITEM_HEIGHT = 300;

const grid = {
	columns: GRID_COLUMNS,
	rows: GRID_ROWS,
	gap: GRID_GAP,
	width: GRID_COLUMNS * (ITEM_WIDTH + GRID_GAP / 2) + GRID_GAP,
	height: GRID_ROWS * (ITEM_HEIGHT + GRID_GAP / 2) + GRID_GAP,
	item: {
		width: ITEM_WIDTH,
		height: ITEM_HEIGHT,
	},
};

export default grid;
