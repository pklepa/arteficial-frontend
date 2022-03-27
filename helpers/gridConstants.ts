import { Variants } from 'framer-motion';

const GRID_COLUMNS = 17;
const GRID_ROWS = 17;
const GRID_GAP = 20;

const CENTER_ITEM_ROW = 8;
const CENTER_ITEM_COLUMN = 8;

const ITEM_WIDTH = 350;
const ITEM_HEIGHT = 350;
const ITEM_MOBILE_WIDTH = 300;
const ITEM_MOBILE_HEIGHT = 300;

const grid = {
	columns: GRID_COLUMNS,
	rows: GRID_ROWS,
	gap: GRID_GAP,
	width: GRID_COLUMNS * (ITEM_WIDTH + GRID_GAP / 2) + GRID_GAP,
	height: GRID_ROWS * (ITEM_HEIGHT + GRID_GAP / 2) + GRID_GAP,
	mobile: {
		width: GRID_COLUMNS * (ITEM_MOBILE_WIDTH + GRID_GAP / 2) + GRID_GAP,
		height: GRID_ROWS * (ITEM_MOBILE_HEIGHT + GRID_GAP / 2) + GRID_GAP,
	},

	centerItem: {
		row: CENTER_ITEM_ROW,
		column: CENTER_ITEM_COLUMN,
		index: CENTER_ITEM_ROW * GRID_COLUMNS + CENTER_ITEM_COLUMN,
	},

	item: {
		width: ITEM_WIDTH,
		height: ITEM_HEIGHT,
		mobile: {
			width: ITEM_MOBILE_WIDTH,
			height: ITEM_MOBILE_HEIGHT,
		},
	},
};

export const gridVariants: Variants = {
	center: {
		x: 0,
		y: 0,
	},
};

for (let index = 0; index < grid.columns * grid.rows; index++) {
	const column = index % grid.columns;
	const row = Math.floor(index / grid.columns);

	gridVariants[`item_${index}`] = {
		x: `${(CENTER_ITEM_ROW - column) * (100 / grid.columns)}%`,
		y: `${(CENTER_ITEM_COLUMN - row) * (100 / grid.rows)}%`,
	};
}

export default grid;
