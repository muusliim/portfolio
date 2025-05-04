"use client";
import { motion, AnimatePresence } from "motion/react";
import { Dispatch, SetStateAction, useEffect, useState } from "react";

export const Preloader = ({
	setLoadingDone,
}: {
	setLoadingDone: Dispatch<SetStateAction<boolean>>;
}) => {
	const [count, setCount] = useState(0);
	const [exit, setExit] = useState(false);

	useEffect(() => {
		const interval = setInterval(() => {
			setCount((prev) => {
				if (prev < 100) return prev + 1;
				clearInterval(interval);
				setTimeout(() => {
					setExit(true);
				}, 1400);
				return 100;
			});
		}, 15);

		return () => clearInterval(interval);
	}, []);

	return (
		<AnimatePresence mode="wait">
			{!exit && count <= 100 && (
				<motion.div
					className="fixed overflow-clip inset-0 h-screen w-screen bg-white text-black flex items-center justify-center text-4xl font-bold z-50"
					initial={{ y: 0 }}
					animate={{ y: 0 }}
					exit={{
						y: "-100%",
						transition: { duration: 1, ease: [0.87, 0, 0.13, 1] },
					}}
					onAnimationComplete={() => setLoadingDone(true)}
				>
					<motion.span
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						exit={{ opacity: 0 }}
					>
						{count}%
					</motion.span>
				</motion.div>
			)}
		</AnimatePresence>
	);
};
