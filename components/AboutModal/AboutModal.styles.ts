import { brand } from '@helpers/brand';
import { from, Device } from '@helpers/media';
import { scaleFadeIn } from '@helpers/variants';
import { motion } from 'framer-motion';
import styled from 'styled-components';

const Container = styled(motion.div).attrs({
	initial: 'hidden',
	animate: 'visible',
	exit: 'hidden',
	variants: scaleFadeIn(1.2),
})`
	position: absolute;
	width: 100%;
	min-height: 100%;
	top: 0;
	left: 0;
	background-color: ${brand.black};

	z-index: 5;
	overflow: auto;
	display: flex;
	align-items: center;
`;

const Modal = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	max-width: 1000px;
	padding: 24px;
	width: 100%;
	height: 100%;
	margin: 0 auto;
	overflow: auto;
	max-height: 100vh;

	@media ${from(Device.Tablet)} {
		padding: 40px;
	}
`;

const Background = styled.div`
	position: absolute;
	left: 0;
	top: 0;
	width: 100%;
	height: 100%;
	z-index: -1;
`;

const LogoWrapper = styled.div`
	width: 250px;

	@media ${from(Device.Tablet)} {
		width: 310px;
	}
`;

const MainText = styled.div`
	font-size: 18px;
	font-weight: 400;
	line-height: 24px;
	color: ${brand.white};
	text-align: center;
	margin: 32px;
`;

export const AboutModalStyles = {
	Container,
	Modal,
	Background,
	LogoWrapper,
	MainText,
};
