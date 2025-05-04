"use client";
import { useState } from "react";
import { FiMenu, FiX } from "react-icons/fi";
import { motion } from "motion/react";

import { links } from "@/data/navLinks/links";
import {
	linkWrapperVariants,
	navVariants,
} from "@/data/navVariants/navVariants";
import { NavLink } from "./NavLink";

const LiquidSideNav = () => {
	const [isOpen, setIsOpen] = useState(false);

	return (
		<div className="w-full fixed z-20">
			<div className="flex items-center justify-end text-white m-6">
				<motion.button
					whileHover={{ rotate: "180deg", transition: { duration: 0.4 } }}
					onClick={() => setIsOpen(true)}
					className="text-3xl bg-white text-black hover:text-zinc-400 transition-colors p-4 rounded-full"
				>
					<FiMenu />
				</motion.button>
			</div>
			<Nav isOpen={isOpen} setIsOpen={setIsOpen} />
		</div>
	);
};

const Nav = ({
	isOpen,
	setIsOpen,
}: {
	isOpen: boolean;
	setIsOpen: (isOpen: boolean) => void;
}) => {
	function slideInOut() {
		document.documentElement.animate(
			[
				{
					opacity: 1,
					transform: "translateX(0)",
				},
				{
					opacity: 0.2,
					transform: "translateX(100%)",
				},
			],
			{
				duration: 1500,
				easing: "cubic-bezier(0.87, 0, 0.13, 1)",
				fill: "forwards",
				pseudoElement: "::view-transition-old(root)",
			}
		);

		document.documentElement.animate(
			[
				{
					clipPath: "polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)",
				},
				{
					clipPath: "polygon(0% 100%, 100% 100%, 100% 0%, 0% 0%)",
				},
			],
			{
				duration: 1500,
				easing: "cubic-bezier(0.87, 0, 0.13, 1)",
				fill: "forwards",
				pseudoElement: "::view-transition-new(root)",
			}
		);
	}
	return (
		<motion.nav
			className="fixed top-0 bottom-0 w-screen bg-white"
			animate={isOpen ? "open" : "closed"}
			variants={navVariants}
			initial="closed"
		>
			<motion.button
				className="text-3xl bg-white text-black hover:text-zinc-400  border-[1px] border-transparent hover:border-zinc-400 transition-colors p-4 rounded-full absolute top-6 right-5"
				whileHover={{ rotate: "180deg", transition: { duration: 0.2 } }}
				onClick={() => setIsOpen(false)}
			>
				<FiX />
			</motion.button>
			<motion.div
				variants={linkWrapperVariants}
				className="flex flex-col gap-4 absolute bottom-8 left-8"
			>
				{links.map((link) => (
					<div key={link.name} onClick={() => setIsOpen(false)}>
						<NavLink
							slideInOut={slideInOut}
							text={link.name}
							href={link.href}
						/>
					</div>
				))}
			</motion.div>
		</motion.nav>
	);
};

export default LiquidSideNav;
