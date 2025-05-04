"use client";
import { motion, AnimatePresence } from "motion/react";
import { useEffect, useState } from "react";

export const Preloader = ({ onComplete }: { onComplete: () => void }) => {
	const [count, setCount] = useState(0);
	const [exit, setExit] = useState(false);

	useEffect(() => {
		const interval = setInterval(() => {
			setCount((prev) => {
				if (prev < 100) return prev + 1;
				clearInterval(interval);
				setTimeout(() => {
					setExit(true);
					setTimeout(onComplete, 1000); 
				}, 1400);
				return 100;
			});
		}, 15);

		return () => clearInterval(interval);
	}, [onComplete]);

	return (
		<AnimatePresence>
			{!exit && (
				<motion.div
					className="fixed inset-0 h-screen w-screen bg-white text-black flex items-center justify-center text-4xl font-bold z-50"
					initial={{ y: 0 }}
					animate={{ y: 0 }}
					exit={{
						y: "-100%",
						transition: { duration: 1, ease: [0.87, 0, 0.13, 1] },
					}}
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
