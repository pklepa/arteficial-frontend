import { brand } from '@helpers/brand';
import { ButtonReset } from '@helpers/global';
import styled from 'styled-components';

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

	cursor: pointer;
`;

export const ButtonStyles = {
	Button,
};
