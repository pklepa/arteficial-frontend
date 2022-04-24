import React from 'react';
import { AboutModalStyles as S } from './AboutModal.styles';
import Logo from '@img/logo.svg';
import Button from '@components/Button/Button';

type AboutModalProps = {
	id: string;
	text: string;
	buttonText: string;
	onClose: () => void;
};

function AboutModal({ id, text, buttonText, onClose }: AboutModalProps) {
	return (
		<S.Container>
			<S.Background onClick={onClose} />

			<S.Modal key={id}>
				<S.LogoWrapper>
					<Logo />
				</S.LogoWrapper>

				<S.MainText dangerouslySetInnerHTML={{ __html: text }} />

				<Button text={buttonText} onClick={onClose} />
			</S.Modal>
		</S.Container>
	);
}

export default AboutModal;
