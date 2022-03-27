import { brand } from '@helpers/brand';
import { ButtonReset } from '@helpers/global';
import { scaleFadeIn } from '@helpers/variants';
import { motion, Variants } from 'framer-motion';
import styled, { css } from 'styled-components';

const Container = styled(motion.div)`
	width: 100vw;
	height: 100vh;
	overflow: hidden;
	position: relative;
`;

const Overlay = styled(motion.div).attrs({
	initial: 'hidden',
	animate: 'visible',
	exit: 'hidden',
	variants: scaleFadeIn(1.2),
})`
	position: absolute;
	inset: 0;

	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	background-color: ${brand.black}dd;
	z-index: 3;

	overflow: hidden;
`;

const instructionsVariants: Variants = {
	hidden: {
		filter: 'blur(3px)',
		transition: { duration: 0.6 },
	},
	visible: {
		filter: 'none',
		transition: { duration: 0.6 },
	},
};

const InstructionsWrapper = styled(motion.div).attrs({
	variants: instructionsVariants,
})`
	margin-bottom: 10px;
`;

const InstructionText = styled.span<{ isDimmed?: boolean }>`
	font-size: 18px;
	line-height: 24px;
	color: ${brand.white};
	text-align: center;
	margin: 0;
	display: block;

	strong {
		font-weight: 700;
	}

	${({ isDimmed }) =>
		isDimmed &&
		css`
			opacity: 0.4;
		`}
`;

const Button = styled.button.attrs({ type: 'button' })`
	${ButtonReset};
	border: 1px solid ${brand.white};
	border-radius: 8px;
	padding: 8px 24px;
	min-width: 115px;
	color: ${brand.white};
	margin-top: 16px;

	font-size: 14px;
	font-weight: 700;
	line-height: 1em;
	text-align: center;
`;

const LogoCard = styled.div`
	width: 300px;
	height: 300px;
	padding: 24px 28px;

	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
`;

const Logo = styled.div`
	color: ${brand.white};
	font-size: 42px;
	line-height: 1em;
	margin-bottom: 16px;
	text-align: center;

	strong {
		font-weight: 700;
	}
`;

const Description = styled.p`
	color: ${brand.white};
	font-size: 18px;
	line-height: 22px;
	margin: 0;
	margin-bottom: 16px;
	text-align: center;
`;

const Item = styled.div`
	width: 310px;
	height: 310px;
	padding: 10px;
	box-sizing: border-box;

	position: relative;
	z-index: 1;
`;

const ImagePlaceholder = styled.div.attrs(
	({ r, b, g }: { r: number; b: number; g: number }) => ({
		style: {
			background: `rgb(${r}, ${g}, ${b})`,
		},
	})
)<{ r: number; b: number; g: number }>`
	width: 100%;
	height: 100%;
	box-sizing: border-box;

	z-index: 1;

	display: grid;
	place-items: center;
	font-size: 48px;
	font-weight: bold;

	&::after {
		content: '';
		inset: 8px;
		background-color: ${brand.white};
		transform: scale(0.5);
		position: absolute;
		z-index: -1;
		transform-origin: center center;
	}

	&:hover {
		&::after {
			transform: scale(1);
		}
	}
`;
const GRID_COLUMNS = 11;
const GRID_ROWS = 11;
const GRID_GAP = 20;
const ITEM_WIDTH = 300;
const ITEM_HEIGHT = 300;

const gridDimensions = {
	width: GRID_COLUMNS * (ITEM_WIDTH + GRID_GAP / 2) + GRID_GAP,
	height: GRID_ROWS * (ITEM_HEIGHT + GRID_GAP / 2) + GRID_GAP,
};

const GridConstraints = styled(motion.div)`
	position: absolute;
	top: calc(50% - ${(gridDimensions.width * 2 - ITEM_WIDTH) / 2}px);
	left: calc(50% - ${(gridDimensions.height * 2 - ITEM_HEIGHT) / 2}px);

	width: ${gridDimensions.width * 2 - ITEM_WIDTH}px;
	height: ${gridDimensions.height * 2 - ITEM_HEIGHT}px;
`;

const variants: Variants = {
	idle: {
		x: -310,
		y: 310,
	},
	center: {
		x: 0,
		y: 0,
	},
};

const Grid = styled(motion.div).attrs({
	variants: variants,
	transition: {
		duration: 0.6,
	},
})`
	position: absolute;
	top: calc(50% - ${gridDimensions.height / 2}px);
	left: calc(50% - ${gridDimensions.width / 2}px);

	display: grid;
	grid-template-columns: repeat(11, ${ITEM_WIDTH + GRID_GAP / 2}px);
	grid-template-rows: repeat(11, ${ITEM_HEIGHT + GRID_GAP / 2}px);
	padding: 10px;
`;

export const HomePageStyles = {
	Container,
	Overlay,
	InstructionsWrapper,
	InstructionText,
	Button,
	LogoCard,
	Logo,
	Description,
	GridConstraints,
	Grid,
	Item,
	ImagePlaceholder,
};
