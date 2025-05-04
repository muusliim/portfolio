"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { TextLoopCustom } from "@/components/TextLoopCustom";
import Link from "next/link";
import { PiHandTapLight } from "react-icons/pi";

const text = [
	{ key: "Имя", value: "Муслим Дикаев" },
	{ key: "Специальность", value: "Фронтенд-разработчик" },
	{ key: "Опыт", value: "３+ года" },
	{
		key: "Био",
		value: `СТРАСТЬ К ТВОРЧЕСТВУ В ЦИФРОВОМ ПРОСТРАНСТВЕ. УВЛЕКАЮСЬ УЛИЧНОЙ ФОТОГРАФИЕЙ И ИССЛЕДОВАНИЕМ НЕОБЫЧНЫХ ГОРОДСКИХ МЕСТ. Постоянно ищу новые вызовы, возможности для роста и воплощаю в жизнь креативные идеи. Осваиваю технологии, создаю визуально выразительные и удобные веб-сайты.`,
	},
];

export default function About() {
	const [flipped, setFlipped] = useState(true);
	const [isHovered, setIsHovered] = useState(false);

	return (
		<main className="container-page flex justify-center items-center h-dvh overflow-clip">
			<div
				className="relative w-full md:w-2/3 max-h-2/3 h-dvh perspective-[1500px]"
				onClick={() => setFlipped(!flipped)}
			>
				<motion.div
					animate={{ rotateY: flipped ? 180 : 0 }}
					initial={{ rotateY: 0 }}
					className="relative w-full h-full duration-700 transform-style-preserve-3d"
				>
					<motion.div
						initial={{ opacity: 0 }}
						animate={{
							opacity: 1,
							transition: {
								duration: 0.3,
								repeat: 3,
								repeatType: "reverse",
								delay: 2,
								repeatDelay: 0.2,
							},
						}}
						className="fixed rounded-full rotate-y-180 z-20 top-1/2 select-none rotate-z-20"
					>
						<PiHandTapLight size={50} className="-rotate-10" />
					</motion.div>
					<AnimatePresence>
						{flipped && isHovered && (
							<motion.img
								initial={{ opacity: 0, scale: 0.7 }}
								exit={{ opacity: 0, scale: 0 }}
								animate={{
									opacity: isHovered ? 1 : 0,
									scale: isHovered ? 1 : 0.7,
									transition: { duration: 1.5 },
								}}
								className="absolute w-[12%] bottom-17 left-1/2 -translate-x-1/2 z-20 h-[18%] rotate-y-180 hidden md:block"
								src="/images/patrick_bateman.gif"
								alt="gif"
								width={120}
								height={120}
							/>
						)}
					</AnimatePresence>
					{/* Front side */}
					<div className="absolute w-full h-full backface-hidden rotate-y-180 bg-[url('/paper.avif')] bg-cover bg-center bg-no-repeat p-10 flex flex-col shadow-2xl shadow-zinc-700/80 items-center justify-center select-none font-[SilianRail]">
						<div className=" h-full flex flex-col justify-between items-center">
							<div className="flex flex-row gap-2 max-w-md text-center text-zinc-700">
								<span>creative</span>
								<span className="text-sm">●</span>
								<span>curious </span>
								<span className="text-sm">●</span>
								<span>meticulous </span>
							</div>
							<div className="flex flex-col items-center gap-2">
								<h2 className="text-2xl md:text-3xl lg:text-4xl font-bold">
									Muslim DIKAEV
								</h2>
								<h3 className="text-xl md:text-2xl font-bold">
									Frontend Developer
								</h3>
							</div>
							<motion.span
								onHoverStart={() => setIsHovered(true)}
								onHoverEnd={() => setIsHovered(false)}
							>
								<Link
									href="https://t.me/Moosleeem"
									className="text-sm font-bold hover:underline duration-300 transition-all"
									target="_blank"
								>
									t.me/Moosleeem{" "}
								</Link>
							</motion.span>
						</div>
					</div>

					{/* Back side */}
					<div className="absolute w-full h-full backface-hidden bg-[url('/paper.avif')] bg-cover bg-center bg-no-repeat shadow-2xl shadow-zinc-700/80 overflow-auto select-none p-5 md:p-10">
						{text.map((item) => (
							<div
								key={`${item.key}-${item.value}`}
								className="grid md:grid-cols-3 grid-cols-1"
							>
								<p className="text-sm lg:text-xl mt-4 font-bold uppercase">
									{item.key}
								</p>
								<p className="text-sm lg:text-xl mt-4 uppercase text-right col-span-2">
									{item.value}
								</p>
							</div>
						))}
						<TextLoopCustom />
					</div>
				</motion.div>
			</div>
		</main>
	);
}
