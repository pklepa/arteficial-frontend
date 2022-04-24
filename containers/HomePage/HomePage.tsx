import type { NextPage } from 'next';
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
import mockItemsCollection from '@mock/mockItemsCollection';
import Image from 'next/image';
import AboutModal from '@components/AboutModal/AboutModal';
import mockTexts from '@mock/mockTexts';
import Button from '@components/Button/Button';

export type ImagePlaceholderType = {
	red: number;
	green: number;
	blue: number;
};

const HomePage: NextPage = () => {
	const [isInstructionsOpen, setIsInstructionsOpen] = useState(false); // FIXME: precisa comecar em true
	const [isAboutModalOpen, setIsAboutModalOpen] = useState(true); // FIXME: precisa comeecar em false
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
		console.log({ pageX: event.pageX, pageY: event.pageY, rect: rect }); // FIXME: remove this
	}

	const [currentItemIndex, setCurrentItemIndex] = useState(
		(grid.columns * grid.rows) / 2
	);

	const constraintsRef = useRef(null);

	// FIXME: remove this
	const lorem =
		'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quisquam pariatur, aperiam nam necessitatibus alias, quia ab illo nihil debitis consequuntur aliquam repellendus, perspiciatis illum maxime quo. Fuga libero alias perferendis!';

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
				{/* TODO: Readd cursor fog */}
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
								id={mockItemsCollection[currentItemIndex].id}
								imageUrl={mockItemsCollection[currentItemIndex].imageUrl}
								description={mockItemsCollection[currentItemIndex].text}
								blurImageUrl={
									mockItemsCollection[currentItemIndex].blurImageUrl
								}
								onClose={() => setIsImageModalOpen(false)}
							/>
							{/* <Modal
								id={`modal-item-${currentItemIndex}`}
								imageUrl=""
								description={lorem}
								onClose={() => setIsModalOpen(false)}
							/> */}
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
					{mockItemsCollection.map((x, index) => {
						if (index === grid.centerItem.index) {
							return (
								<S.LogoCard key={x.id} isHidden={isInstructionsOpen}>
									<S.Logo>
										<strong>arte</strong>ficial
									</S.Logo>

									<S.Description>
										Um projeto que reúne imagens geradas através de inteligência
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
								key={x.id}
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
								{/* <S.ImagePlaceholder
									r={x.red}
									b={x.blue}
									g={x.green}
									draggable={false}
									onMouseDown={() => setIsDragging(false)}
									onMouseMove={() => setIsDragging(true)}
									onMouseUp={() => {
										if (!isDragging) {
											setCurrentItemIndex(index);

											setTimeout(() => {
												setIsModalOpen(true);
											}, 500);
										}

										setIsDragging(false);
									}}
								>
									{index}
								</S.ImagePlaceholder> */}

								<Image
									src={x.imageUrl}
									width={400}
									height={400}
									draggable={false}
									quality={50}
									placeholder="blur"
									loading="eager"
									blurDataURL={x.blurImageUrl}
								/>
							</S.Item>
						);
					})}
				</S.Grid>
			</S.Container>
		</div>
	);
};

export default HomePage;
