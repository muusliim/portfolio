import { navLinkVariants } from "@/data/navVariants/navVariants";
import { motion } from "motion/react";
import { useTransitionRouter } from "next-view-transitions";
import Link from "next/link";
import { usePathname } from "next/navigation";

export const NavLink = ({
	text,
	href,
	slideInOut,
}: {
	text: string;
	href: string;
	slideInOut: () => void;
}) => {
	const router = useTransitionRouter();
	const pathname = usePathname();

	const handleClick = async (e: React.MouseEvent) => {
		e.preventDefault();

		if (pathname === href) {
			return;
		}

		document.body.classList.add("disable-scroll");

		await new Promise((resolve) => setTimeout(resolve, 500));

		router.push(href, {
			onTransitionReady: slideInOut,
		});
	};

	return (
		<motion.div
			className="inline-block z-10 text-slate-800 w-fit font-black text-[3.5rem] md:text-7xl hover:text-zinc-400 transition-colors"
			variants={navLinkVariants}
			transition={{
				type: "spring",
				damping: 3,
			}}
			whileHover={{
				y: -15,
				rotate: "-7.5deg",
			}}
		>
			<Link href={href} onClick={handleClick}>
				{text}
			</Link>
		</motion.div>
	);
};
