export type ImagePlaceholderType = {
	red: number;
	green: number;
	blue: number;
};

export type ResponseItem = {
	id: number;
	attributes: {
		Description: string;
		row: number | null;
		column: number | null;
		createdAt: string;
		updatedAt: string;
		publishedAt: string;
		Image: any;
	};
};

export type ItemT = {
	id: number;
	description: string | null;
	imageUrl: string | null;
	blurImageUrl: string | null;
};

export interface HomePageProps {
	items: ItemT[];
}
