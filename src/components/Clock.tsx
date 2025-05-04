"use client";
import { useEffect, useState } from "react";
import { SlidingNumber } from "./motion-primitives/sliding-number";
import { FaLocationDot } from "react-icons/fa6";

export function Clock() {
	const [hours, setHours] = useState(new Date().getHours());
	const [minutes, setMinutes] = useState(new Date().getMinutes());
	const [seconds, setSeconds] = useState(new Date().getSeconds());

	useEffect(() => {
		const interval = setInterval(() => {
			setHours(new Date().getHours());
			setMinutes(new Date().getMinutes());
			setSeconds(new Date().getSeconds());
		}, 1000);
		return () => clearInterval(interval);
	}, []);

	return (
		<div className="absolute bottom-10 right-10 flex items-center flex-col ">
			<div className="flex flex-row gap-4">
				<FaLocationDot className="text-zinc-700" size={20} />
				<p className="text-zinc-700">Санкт-Петербург</p>
			</div>
			<div className="flex items-center gap-0.5 font-mono">
				<SlidingNumber value={hours} padStart={true} />
				<span className="text-zinc-500">:</span>
				<SlidingNumber value={minutes} padStart={true} />
				<span className="text-zinc-500">:</span>
				<SlidingNumber value={seconds} padStart={true} />
			</div>
		</div>
	);
}
