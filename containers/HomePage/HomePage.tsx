import type { GetStaticProps } from 'next';
import Head from 'next/head';
import { useRef, useState } from 'react';
import { HomePageStyles as S } from './HomePage.styles';
import {
	AnimatePresence,
	useMotionTemplate,
	useMotionValue,
	useTransform,
} from 'framer-motion';
import grid from '@helpers/gridConstants';
import ImageModal from '@components/ImageModal/ImageModal';
import Image from 'next/image';
import AboutModal from '@components/AboutModal/AboutModal';
import mockTexts from '@mock/mockTexts';
import Button from '@components/Button/Button';
import { HomePageProps, ItemT, ResponseItem } from './HomePage.types';
import shuffle from '@helpers/shuffle';

export default function HomePage({ items }: HomePageProps) {
	const [isInstructionsOpen, setIsInstructionsOpen] = useState(true);
	const [isAboutModalOpen, setIsAboutModalOpen] = useState(false);
	const [isImageModalOpen, setIsImageModalOpen] = useState(false);
	const [isDragging, setIsDragging] = useState(false);

	const normalizedMouseX = useMotionValue(0.5);
	const normalizedMouseY = useMotionValue(0.5);

	const spotlightX = useTransform(normalizedMouseX, [0, 1], [0, 100]);
	const spotlightY = useTransform(normalizedMouseY, [0, 1], [0, 100]);

	const background = useMotionTemplate`radial-gradient(
		circle at ${spotlightX}% ${spotlightY}%,
		rgba(0, 0, 0, 0) 0,
		rgba(0, 0, 0, 1) min(1000px, 100%)
	)`;

	function handleMouse(event: any) {
		const rect = event.currentTarget.getBoundingClientRect();

		normalizedMouseX.set(event.pageX / rect.width);
		normalizedMouseY.set(event.pageY / rect.height);
	}

	const [currentItemIndex, setCurrentItemIndex] = useState(
		(grid.columns * grid.rows) / 2
	);

	const constraintsRef = useRef(null);

	return (
		<div>
			<Head>
				<title>ARTEficial</title>
				<meta name="description" content="Homepage of ARTEficial" />
				<link rel="icon" href="/favicon.ico" />

				<link rel="preconnect" href="https://fonts.googleapis.com" />
				<link
					rel="preconnect"
					href="https://fonts.gstatic.com"
					crossOrigin=""
				/>
				<link
					href="https://fonts.googleapis.com/css2?family=Barlow:wght@300;400;500;600;700&display=swap"
					rel="stylesheet"
				></link>
			</Head>

			<S.Container onMouseMove={handleMouse}>
				<S.CursorFog style={{ background }} />

				<AnimatePresence exitBeforeEnter>
					{isInstructionsOpen && (
						<S.Overlay key="instructions-overlay">
							<S.InstructionsWrapper>
								<S.InstructionText>
									<strong>arraste</strong> para navegar
								</S.InstructionText>
								<S.InstructionText>
									<strong>clique</strong> para abrir o texto
								</S.InstructionText>
							</S.InstructionsWrapper>

							<S.InstructionsWrapper>
								<S.InstructionText isDimmed>
									<strong>swipe</strong> to navigate
								</S.InstructionText>
								<S.InstructionText isDimmed>
									<strong>click</strong> to open text
								</S.InstructionText>
							</S.InstructionsWrapper>

							<Button text="ok" onClick={() => setIsInstructionsOpen(false)} />
						</S.Overlay>
					)}

					{isAboutModalOpen && (
						<AboutModal
							id="about-modal"
							text={mockTexts.aboutModalMainText}
							buttonText={mockTexts.aboutModalButtonText}
							onClose={() => setIsAboutModalOpen(false)}
							key="about-modal"
						/>
					)}

					{isImageModalOpen && (
						<S.Overlay key="item-modal-overlay">
							<ImageModal
								id={items[currentItemIndex].id}
								imageUrl={items[currentItemIndex].imageUrl ?? ''}
								description={items[currentItemIndex].description ?? ''}
								blurImageUrl={items[currentItemIndex].blurImageUrl ?? ''}
								onClose={() => setIsImageModalOpen(false)}
							/>
						</S.Overlay>
					)}
				</AnimatePresence>

				<S.GridConstraints ref={constraintsRef} draggable={false} />
				<S.Grid
					drag
					dragConstraints={constraintsRef}
					animate={`item_${currentItemIndex}`}
					dragTransition={{
						bounceStiffness: 600,
						bounceDamping: 80,
						power: 0.5,
					}}
					// dragMomentum={false}
				>
					{items.map((x, index) => {
						if (index === grid.centerItem.index) {
							return (
								<S.LogoCard key={'logo-card'} isHidden={isInstructionsOpen}>
									<S.Logo>
										<strong>arte</strong>ficial
									</S.Logo>

									<S.Description>
										Um projeto que re??ne imagens geradas atrav??s de intelig??ncia
										artificial e atreladas a textos que resignificam as obras.
									</S.Description>

									<Button
										text="saiba mais"
										onClick={() => setIsAboutModalOpen(true)}
									/>
								</S.LogoCard>
							);
						}

						return (
							<S.Item
								key={`item-card-${x.id}`}
								draggable={false}
								onMouseDown={() => setIsDragging(false)}
								onMouseMove={() => setIsDragging(true)}
								onMouseUp={() => {
									if (!isDragging) {
										setCurrentItemIndex(index);

										setTimeout(() => {
											setIsImageModalOpen(true);
										}, 500);
									}

									setIsDragging(false);
								}}
							>
								<Image
									src={x.imageUrl ?? ''}
									width={400}
									height={400}
									draggable={false}
									quality={50}
									placeholder="blur"
									loading="eager"
									blurDataURL={x.blurImageUrl ?? ''}
								/>
							</S.Item>
						);
					})}
				</S.Grid>
			</S.Container>
		</div>
	);
}

export const getStaticProps: GetStaticProps = async () => {
	const baseUrl = 'https://arteficial-dashboard.herokuapp.com';
	const res = await fetch(`${baseUrl}/api/arteficial-items?populate=*`);
	const { data } = await res.json();

	const items: ItemT[] = data.map((x: ResponseItem) => ({
		id: x.id,
		description: x.attributes.Description ?? null,
		imageUrl: x.attributes['Image'].data.attributes.url ?? null,
		blurImageUrl: x.attributes['Image'].data.attributes.url ?? null,
	}));

	shuffle(items);

	items.splice(grid.centerItem.index, 0, {
		id: 0,
		description: '',
		imageUrl: '',
		blurImageUrl: '',
	});

	return {
		props: {
			items,
		},
	};
};
