"use client";

import { disperse } from "@/data/contacts/animations";
import { motion } from "motion/react";
import { useState, ReactElement } from "react";

type LinkContactsEffectProps = {
	children: ReactElement<{ children: string }>;
	setBackground: (isActive: boolean) => void;
};

export function LinkContactsEffect({
	children,
	setBackground,
}: LinkContactsEffectProps) {
	const [isAnimated, setIsAnimated] = useState(false);

	const getChars = (element: ReactElement<{ children: string }>) => {
		const chars: ReactElement[] = [];
		const word = element.props.children;

		word.split("").forEach((char, i) => {
			chars.push(
				<motion.span
					custom={i}
					variants={disperse}
					animate={isAnimated ? "open" : "closed"}
					key={char + i}
				>
					{char}
				</motion.span>
			);
		});

		return chars;
	};

	const manageMouseEnter = () => {
		setBackground(true);
		setIsAnimated(true);
	};

	const manageMouseLeave = () => {
		setBackground(false);
		setIsAnimated(false);
	};

	return (
		<div
			onMouseEnter={() => {
				manageMouseEnter();
			}}
			onMouseLeave={() => {
				manageMouseLeave();
			}}
			className="linkLine"
		>
			{getChars(children)}
		</div>
	);
}
