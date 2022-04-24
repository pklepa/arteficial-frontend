import grid from '@helpers/gridConstants';

interface Item {
	id: string;
	imageUrl: string;
	blurImageUrl: string;
	text: string;
	red: number;
	green: number;
	blue: number;
}

const mockItemsCollection: Item[] = new Array(grid.columns * grid.rows)
	.fill({
		red: 0,
		green: 0,
		blue: 0,
	})
	.map((x, index) => {
		const red = Math.ceil(Math.random() * 255);
		const blue = Math.ceil(Math.random() * 255);
		const green = Math.ceil(Math.random() * 255);

		return {
			red,
			blue,
			green,
			imageUrl: `https://picsum.photos/seed/arteficial${index}/400`,
			blurImageUrl: `https://picsum.photos/seed/arteficial${index}/40`,
			id: `item-${index}`,
			text: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quisquam pariatur, aperiam nam necessitatibus alias, quia ab illo nihil debitis consequuntur aliquam repellendus, perspiciatis illum maxime quo. Fuga libero alias perferendis',
		};
	});

export default mockItemsCollection;
