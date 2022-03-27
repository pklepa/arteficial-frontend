import { brand } from '@helpers/brand';
import styled from 'styled-components';

const Container = styled.div`
	position: absolute;
	width: 100%;
	height: 100%;
	top: 0;
	left: 0;

	display: grid;
	place-items: center;
	z-index: 5;
`;

const Modal = styled.div`
	background-color: ${brand.white};
	border-radius: 0 30px 30px 30px;
	display: grid;
	align-items: center;
	gap: 40px;
	grid-template-columns: 3fr 1fr;
	max-height: 90vh;
	max-width: 1000px;
	padding: 40px;
	width: calc(100% - 48px);
`;

const Background = styled.div`
	position: absolute;
	left: 0;
	top: 0;
	width: 100%;
	height: 100%;
	z-index: -1;
`;

const ImageWrapper = styled.div`
	width: 100%;
	/* height: 100%; */
	height: 600px;
	background-color: indigo;
`;

const Description = styled.p`
	margin: 0;
	font-size: 18px;
	font-weight: 500;
	line-height: 24px;
	color: ${brand.black};
`;

export const ModalStyles = {
	Container,
	Modal,
	Background,
	ImageWrapper,
	Description,
};
