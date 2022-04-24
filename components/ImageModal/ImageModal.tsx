import Image from 'next/image';
import React from 'react';
import { ImageModalStyles as S } from './ImageModal.styles';

type ImageModalProps = {
	id: string;
	imageUrl: string;
	description: string;
	blurImageUrl: string;
	onClose: () => void;
};

function ImageModal({
	id,
	imageUrl,
	blurImageUrl,
	description,
	onClose,
}: ImageModalProps) {
	return (
		<S.Container>
			<S.Background onClick={onClose} />

			<S.Modal key={id}>
				<S.ImageWrapper>
					<Image
						src={imageUrl}
						width={600}
						height={600}
						quality={75}
						placeholder="blur"
						loading="lazy"
						blurDataURL={blurImageUrl}
					/>
				</S.ImageWrapper>

				<S.Description>{description}</S.Description>
			</S.Modal>
		</S.Container>
	);
}

export default ImageModal;
