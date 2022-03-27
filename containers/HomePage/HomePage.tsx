import type { NextPage } from 'next';
import Head from 'next/head';
import { useRef, useState } from 'react';
import { HomePageStyles as S } from './HomePage.styles';
import { AnimatePresence, useMotionValue, useTransform } from 'framer-motion';

const HomePage: NextPage = () => {
	const [isInstructionsOpen, setIsInstructionsOpen] = useState(true);
	const mockImageArray = new Array(121).fill(1);
	const [isCenter, setIsCenter] = useState(false);

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
					href="https://fonts.googleapis.com/css2?family=Barlow:wght@300;400;700&display=swap"
					rel="stylesheet"
				></link>
			</Head>

			<S.Container>
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

							<S.Button onClick={() => setIsInstructionsOpen(false)}>
								ok
							</S.Button>
						</S.Overlay>
					)}
				</AnimatePresence>

				<S.GridConstraints ref={constraintsRef} />
				<S.Grid
					drag
					dragConstraints={constraintsRef}
					animate={isCenter ? 'idle' : 'center'}
					dragTransition={{
						bounceStiffness: 600,
						bounceDamping: 80,
						power: 0.5,
					}}
				>
					{mockImageArray.map((x, index) => {
						const red = Math.ceil(Math.random() * 255);
						const blue = Math.ceil(Math.random() * 255);
						const green = Math.ceil(Math.random() * 255);

						return (
							<S.Item key={`item-${index}`}>
								<S.ImagePlaceholder
									r={red}
									b={blue}
									g={green}
									draggable={false}
									onClick={() => {
										if (index === 60) {
											setIsCenter((curr) => !curr);
										}
									}}
								>
									{index}
								</S.ImagePlaceholder>
							</S.Item>
						);
					})}
				</S.Grid>

				{/* <S.LogoCard>
					<S.Logo>
						<strong>arte</strong>ficial
					</S.Logo>

					<S.Description>
						Um projeto que reúne imagens geradas através de inteligência
						artificial e atreladas a textos que resignificam as obras.
					</S.Description>

					<S.Button>saiba mais</S.Button>
				</S.LogoCard> */}
			</S.Container>
		</div>
	);
};

export default HomePage;
