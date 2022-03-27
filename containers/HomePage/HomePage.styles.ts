import { brand } from '@helpers/brand';
import { ButtonReset } from '@helpers/global';
import grid, { gridVariants } from '@helpers/gridConstants';
import { from, Device, until } from '@helpers/media';
import { scaleFadeIn } from '@helpers/variants';
import { motion, Variants } from 'framer-motion';
import styled, { css } from 'styled-components';

const Container = styled(motion.div)`
	width: 100vw;
	height: 100vh;
	overflow: hidden;
	position: relative;

	@media ${until(Device.Tablet)} {
		&::after {
			content: '';
			position: fixed;
			z-index: 2;
			width: 100%;
			height: 100%;
			top: 0;
			left: 0;
			background: radial-gradient(
				circle,
				rgba(0, 0, 0, 0) 0%,
				rgba(0, 0, 0, 1) 100%
			);
			pointer-events: none;
		}
	}
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
		filter: 'blur(0px)',
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
	width: ${grid.item.mobile.width + grid.gap / 2}px;
	height: ${grid.item.mobile.height + grid.gap / 2}px;
	padding: 24px 28px;
	box-sizing: border-box;

	position: relative;
	z-index: 1;

	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;

	@media ${from(Device.Tablet)} {
		width: ${grid.item.width + grid.gap / 2}px;
		height: ${grid.item.height + grid.gap / 2}px;
	}
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
	width: ${grid.item.mobile.width + grid.gap / 2}px;
	height: ${grid.item.mobile.height + grid.gap / 2}px;
	padding: 10px;
	box-sizing: border-box;

	position: relative;
	z-index: 1;

	@media ${from(Device.Tablet)} {
		width: ${grid.item.width + grid.gap / 2}px;
		height: ${grid.item.height + grid.gap / 2}px;
	}
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

const GridConstraints = styled(motion.div)`
	position: absolute;
	top: calc(50% - ${(grid.mobile.width * 2 - grid.item.mobile.width) / 2}px);
	left: calc(50% - ${(grid.mobile.height * 2 - grid.item.mobile.height) / 2}px);

	width: ${grid.mobile.width * 2 - grid.item.mobile.width}px;
	height: ${grid.mobile.height * 2 - grid.item.mobile.height}px;

	@media ${from(Device.Tablet)} {
		top: calc(50% - ${(grid.width * 2 - grid.item.width) / 2}px);
		left: calc(50% - ${(grid.height * 2 - grid.item.height) / 2}px);

		width: ${grid.width * 2 - grid.item.width}px;
		height: ${grid.height * 2 - grid.item.height}px;
	}
`;

const Grid = styled(motion.div).attrs({
	variants: gridVariants,
	transition: {
		duration: 0.6,
	},
})`
	position: absolute;
	top: calc(50% - ${grid.mobile.height / 2}px);
	left: calc(50% - ${grid.mobile.width / 2}px);

	display: grid;
	grid-template-columns: repeat(
		${grid.columns},
		${grid.item.mobile.width + grid.gap / 2}px
	);
	grid-template-rows: repeat(
		${grid.rows},
		${grid.item.mobile.height + grid.gap / 2}px
	);
	padding: ${grid.gap / 2}px;

	@media ${from(Device.Tablet)} {
		top: calc(50% - ${grid.height / 2}px);
		left: calc(50% - ${grid.width / 2}px);

		grid-template-columns: repeat(
			${grid.columns},
			${grid.item.width + grid.gap / 2}px
		);
		grid-template-rows: repeat(
			${grid.rows},
			${grid.item.height + grid.gap / 2}px
		);
	}
`;

const CursorFog = styled(motion.div)`
	position: fixed;
	z-index: 2;
	width: 100%;
	height: 100%;
	top: 0;
	left: 0;
	pointer-events: none;

	@media ${until(Device.Tablet)} {
		display: none;
	}
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
	CursorFog,
};
