import React from 'react';
import { ButtonStyles as S } from './Button.styles';

type ButtonProps = {
	text: string;
	onClick: () => void;
};

function Button({ text, onClick }: ButtonProps) {
	return <S.Button onClick={onClick}>{text}</S.Button>;
}

export default Button;
