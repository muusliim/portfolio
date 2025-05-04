import Image from "next/image";
import { SpinningText } from "./motion-primitives/spinning-text";

export function SpinningTextBasic() {
	return (
		<div className="absolute top-1/6 left-1/8 scale-[60%] md:scale-100 md:top-1/8 lg:scale-125">
			<div className="grid">
				<Image
					src="/images/main-photo.png"
					width={100}
					height={100}
					className="rounded-full col-start-1 row-start-1"
					alt="main-photo"
					priority
				/>
				<SpinningText
					radius={5}
					fontSize={1.2}
					className="font-medium leading-none col-start-1 row-start-1"
				>
					{`frontend • frontend • frontend • `}
				</SpinningText>
			</div>
		</div>
	);
}
