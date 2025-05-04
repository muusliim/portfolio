"use client";
import { Clock } from "@/components/Clock";
import { SpinningTextBasic } from "@/components/SpinningText";
import { TextOnPlane } from "@/components/TextOnPlane";
import { useEffect, useState } from "react";
import { Preloader } from "./Preloader";
import { usePathname } from "next/navigation";
import { motion } from "motion/react";

export function Home() {
	const [showPreloader, setShowPreloader] = useState(false);
	const [loadingDone, setLoadingDone] = useState(false);
	const pathname = usePathname();

	useEffect(() => {
		const alreadyLoaded = sessionStorage.getItem("Preloader");
		if (pathname === "/" && !alreadyLoaded) {
			sessionStorage.setItem("Preloader", "true");
			setShowPreloader(true);
		}
	}, [pathname]);

	return (
		<div>
			{showPreloader && <Preloader key={1} setLoadingDone={setLoadingDone} />}{" "}
			<motion.div
				key={2}
				initial={{ opacity: 1 }}
				animate={{ opacity: loadingDone || !showPreloader ? 0 : 1 }}
				className="absolute inset-0 bg-white z-30 pointer-none pointer-events-none"
			/>
			<main className="w-dvw h-dvh overflow-clip z-99">
				<TextOnPlane />
				<Clock />
				<SpinningTextBasic />
			</main>{" "}
		</div>
	);
}
