"use client";

import { useLayoutEffect, useRef, useState } from "react";
import { motion, MotionValue, useScroll, useTransform } from "motion/react";
import Link from "next/link";
import { FiArrowDown, FiArrowUp } from "react-icons/fi";
import { CustomButton } from "./CustomButton";
import { items } from "@/data/projects/items";

type Content = {
	id: number;
	title: string;
	description: string;
	img: string;
	mobileImg: string;
	link: string;
};

const Scroll = () => {
	const targetRef = useRef(null);
	const { scrollYProgress } = useScroll({
		target: targetRef,
	});
	const [isMobile, setIsMobile] = useState(false);
	const [hasMounted, setHasMounted] = useState(false);

	useLayoutEffect(() => {
		const handleResize = () => {
			setIsMobile(window.innerWidth <= 768);
		};
		handleResize();
		setHasMounted(true);

		window.addEventListener("resize", handleResize);

		return () => window.removeEventListener("resize", handleResize);
	}, []);

	return (
		<main>
			<div className="bg-black text-white p-4 grid place-items-center">
				<FiArrowDown className="text-xl animate-bounce" />
			</div>
			<section ref={targetRef} className="grid grid-cols-2 bg-black text-white">
				<Content content={items} />
				<Images
					content={items}
					isMobile={isMobile}
					scrollYProgress={scrollYProgress}
					hasMounted={hasMounted}
				/>
			</section>
			<div className="bg-white text-black p-4 grid place-items-center">
				<FiArrowUp className="text-xl animate-bounce" />
			</div>
		</main>
	);
};

const Content = ({ content }: { content: Content[] }) => {
	return (
		<div className="w-full h-full">
			{content.map(({ id, title, description, link }, idx) => (
				<div
					key={id}
					className={`h-screen py-10 px-2 flex flex-col items-center justify-evenly ${
						idx % 2 ? "bg-black text-white" : "bg-white text-black"
					}`}
				>
					<h3 className="text-xl md:text-3xl lg:text-5xl text-center px-2 font-semibold">
						{title}
					</h3>
					<p className="font-light text-center text-sm lg:text-2xl w-full max-w-md text-balance">
						{description}
					</p>
					<Link target="_blank" href={link} className="w-full text-center">
						<CustomButton
							className="w-2/3 font-black"
							bgTheme={idx % 2 ? "black" : "white"}
						>
							Перейти
						</CustomButton>
					</Link>
				</div>
			))}
		</div>
	);
};

const Images = ({
	content,
	scrollYProgress,
	isMobile,
	hasMounted,
}: {
	content: Content[];
	scrollYProgress: MotionValue<number>;
	isMobile: boolean;
	hasMounted: boolean;
}) => {
	const top = useTransform(
		scrollYProgress,
		[0, 1],
		[`-${(content.length - 1) * 100}vh`, "0vh"]
	);

	return (
		<div className="h-screen overflow-hidden sticky top-0 w-full md:w-full">
			{hasMounted && (
				<motion.div
					style={{ top }}
					animate={{ opacity: 1, transition: { duration: 0.5 } }}
					initial={{ opacity: 0 }}
					className="absolute left-0 right-0"
				>
					{[...content].reverse().map(({ img, id, title, mobileImg }) => (
						// eslint-disable-next-line @next/next/no-img-element
						<img
							src={isMobile === true ? mobileImg : img}
							className="w-full h-screen object-contain"
							key={id}
							alt={title}
						/>
					))}
				</motion.div>
			)}
		</div>
	);
};

export default Scroll;
