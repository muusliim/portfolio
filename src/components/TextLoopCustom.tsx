import { TextLoop } from "./motion-primitives/text-loop";

export function TextLoopCustom() {
	return (
		<div className="grid md:grid-cols-3 grid-cols-1 whitespace-pre-wrap text-[10px] md:text-sm uppercase mt-1 lg:text-xl">
			<p className="font-bold">Стек </p>
			<TextLoop
				className="overflow-y-clip col-span-2 text-right uppercase"
				transition={{
					type: "spring",
					stiffness: 900,
					damping: 80,
					mass: 10,
				}}
				variants={{
					initial: {
						y: 20,
						rotateX: 90,
						opacity: 0,
						filter: "blur(4px)",
					},
					animate: {
						y: 0,
						rotateX: 0,
						opacity: 1,
						filter: "blur(0px)",
					},
					exit: {
						y: -20,
						rotateX: -90,
						opacity: 0,
						filter: "blur(4px)",
					},
				}}
			>
				<span>HTML</span>
				<span>CSS/SCSS/TAILWIND CSS</span>
				<span>JS/TS</span>
				<span>REACT</span>
				<span>REDUX/ZUSTAND</span>
				<span>NEXT JS</span>
				<span>FRAMER MOTION</span>
				<span>THREE JS</span>
			</TextLoop>
		</div>
	);
}
