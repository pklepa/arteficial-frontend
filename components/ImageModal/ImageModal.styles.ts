import { brand } from '@helpers/brand';
import { from, Device } from '@helpers/media';
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
	display: flex;
	flex-direction: column;
	gap: 40px;
	max-height: 90vh;
	max-width: 1000px;
	padding: 24px;
	width: calc(100% - 48px);

	@media ${from(Device.Tablet)} {
		display: grid;
		grid-template-columns: 3fr 1fr;
		align-items: center;

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

const ImageWrapper = styled.div`
	width: 100%;
	max-height: 600px;
	display: flex;
	align-items: center;
	justify-content: center;
`;

const Description = styled.div`
	margin: 0;
	font-size: 18px;
	font-weight: 500;
	line-height: 24px;
	color: ${brand.black};
	max-height: calc(90vh - 80px);
	overflow: auto;
`;

export const ImageModalStyles = {
	Container,
	Modal,
	Background,
	ImageWrapper,
	Description,
};
