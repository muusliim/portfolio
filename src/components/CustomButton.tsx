export function CustomButton({
	children,
	bgTheme = "white",
	className,
}: {
	children: React.ReactNode;
	bgTheme: "black" | "white";
	className?: string;
}) {
	return (
		<button
			className={`relative cursor-pointer py-4 px-8 text-center font-barlow inline-flex justify-center text-base uppercase  rounded-lg border-solid transition-transform duration-300 ease-in-out group outline-offset-4  overflow-hidden scale-75 ${
				bgTheme === "black" ? "bg-white text-black" : "bg-black text-white"
			} ${className}`}
		>
			<span className="relative z-20">{children}</span>

			<span
				className={`absolute left-[-75%] top-0 h-full w-[50%]  rotate-12 z-10 blur-lg group-hover:left-[125%] transition-all duration-1000 ease-in-out ${
					bgTheme === "black" ? "bg-black/20" : "bg-white/20"
				}`}
			></span>

			<span
				className={`w-1/2 drop-shadow-3xl transition-all duration-300 block  absolute h-[20%] rounded-tl-lg border-l-2 border-t-2 top-0 left-0 ${
					bgTheme === "black" ? "border-[#202122]" : "border-[#87acce]"
				}`}
			></span>
			<span
				className={`w-1/2 drop-shadow-3xl transition-all duration-300 block  absolute group-hover:h-[90%] h-[60%] rounded-tr-lg border-r-2 border-t-2 top-0 right-0 ${
					bgTheme === "black" ? "border-[#202122]" : "border-[#87acce]"
				}`}
			></span>
			<span
				className={`w-1/2 drop-shadow-3xl transition-all duration-300 block  absolute h-[60%] group-hover:h-[90%] rounded-bl-lg border-l-2 border-b-2 left-0 bottom-0 ${
					bgTheme === "black" ? "border-[#202122]" : "border-[#87acce]"
				}`}
			></span>
			<span
				className={`w-1/2 drop-shadow-3xl transition-all duration-300 block  absolute h-[20%] rounded-br-lg border-r-2 border-b-2 right-0 bottom-0 ${
					bgTheme === "black" ? "border-[#202122]" : "border-[#87acce]"
				}`}
			></span>
		</button>
	);
}
