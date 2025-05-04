"use client";
import { Clock } from "@/components/Clock";
import { SpinningTextBasic } from "@/components/SpinningText";
import { TextOnPlane } from "@/components/TextOnPlane";
import { useEffect, useState } from "react";
import { Preloader } from "./Preloader";
import { usePathname } from "next/navigation";

export function Home() {
	const [showPreloader, setShowPreloader] = useState(false);
	const [loadingDone, setLoadingDone] = useState(false);
	const pathname = usePathname();

	useEffect(() => {
		const alreadyLoaded = sessionStorage.getItem("Preloader");

		if (pathname === "/" && !alreadyLoaded) {
			sessionStorage.setItem("Preloader", "true");
			setShowPreloader(true);
		} else {
			setLoadingDone(true);
		}
	}, [pathname]);

	const handlePreloaderFinish = () => {
		setShowPreloader(false);
		setLoadingDone(true);
	};
	return (
		<div className="relative">
			{showPreloader && <Preloader onComplete={handlePreloaderFinish} />}
			<main
				className={`w-screen h-screen overflow-clip transition-opacity duration-1000 ${
					loadingDone ? "opacity-100" : "opacity-0 pointer-events-none"
				}`}
			>
				<TextOnPlane />
				<Clock />
				<SpinningTextBasic />
			</main>
		</div>
	);
}
