"use client";
import { LinkContactsEffect } from "@/components/LinkContactsEffect";
import { motion, useAnimate } from "motion/react";
import Link from "next/link";
import { useState } from "react";

export default function Contacts() {
	const [scope, animate] = useAnimate();
	const [isHovered, setIsHovered] = useState(false);

	const setBackground = (isActive: boolean) => {
		animate(scope.current, { opacity: isActive ? 0.8 : 0 });
	};

	return (
		<main className="relative h-dvh w-dvw flex items-center justify-center overflow-clip">
			<div className="text-black text-4xl md:text-6xl lg:text-8xl font-bold">
				<div className="linkLine">
					<p>ЭТО</p>

					<p>МОИ</p>
				</div>

				<div className="linkLine">
					<p>КОНТАКТЫ</p>
					<p>:</p>
				</div>

				<Link href="https://t.me/Moosleeem" target="_blank">
					<LinkContactsEffect setBackground={setBackground}>
						<p>→TELEGRAM</p>
					</LinkContactsEffect>
				</Link>

				<Link href="https://wa.me/79315795578" target="_blank">
					<LinkContactsEffect setBackground={setBackground}>
						<p>→WHATSAPP</p>
					</LinkContactsEffect>
				</Link>

				<Link href="https://github.com/muusliim" target="_blank">
					<LinkContactsEffect setBackground={setBackground}>
						<p>→GITHUB</p>
					</LinkContactsEffect>
				</Link>

				<motion.div
					onHoverStart={() => setIsHovered(true)}
					onHoverEnd={() => setIsHovered(false)}
					onTapStart={() => setIsHovered(true)}
					onTapCancel={() => setIsHovered(false)}
					onTap={() => setIsHovered(false)}
				>
					<Link href="https://www.instagram.com/muslimon/" target="_blank">
						<LinkContactsEffect setBackground={setBackground}>
							<p>→Insta*</p>
						</LinkContactsEffect>
					</Link>
				</motion.div>
				<motion.span
					initial={{ opacity: 0 }}
					animate={isHovered ? { opacity: 1 } : { opacity: 0 }}
					className="absolute text-[8px] lg:text-white/50 text-black/30 bottom-10 right-10 px-2 "
				>
					*Инстаграм заблокирован на территории РФ из-за признания Meta
					экстремистской организацией.
				</motion.span>
				<div
					ref={scope}
					className="bg-black/40 -z-10 inset-0 absolute w-full h-full pointer-none opacity-0 hidden lg:block"
				></div>
			</div>
		</main>
	);
}
