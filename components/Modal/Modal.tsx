import React from 'react';
import { ModalStyles as S } from './Modal.styles';

type Props = {
	id: string;
	imageUrl: string;
	description: string;
	onClose: () => void;
};

function Modal({ id, imageUrl, description, onClose }: Props) {
	console.log({ imageUrl }); //FIXME

	return (
		<S.Container>
			<S.Background onClick={onClose} />

			<S.Modal key={id}>
				<S.ImageWrapper></S.ImageWrapper>
				<S.Description>{description}</S.Description>
			</S.Modal>
		</S.Container>
	);
}

export default Modal;
