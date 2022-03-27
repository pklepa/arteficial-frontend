import { Variants } from 'framer-motion';

export function scaleFadeIn(amount?: number, duration?: number): Variants {
	return {
		hidden: {
			scale: amount ?? 2,
			opacity: 0,
			transition: { duration: duration ?? 0.4 },
		},
		visible: {
			scale: 1,
			opacity: 1,
			transition: { duration: duration ?? 0.6, staggerChildren: 0.15 },
		},
	};
}
