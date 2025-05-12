import { ViewTransitions } from "next-view-transitions";
import type { Metadata } from "next";
import { M_PLUS_Rounded_1c } from "next/font/google";

import "./globals.css";
import Nav from "@/components/Nav";
import { Cursor } from "@/components/Cursor";

const mPlusRounded = M_PLUS_Rounded_1c({
	subsets: ["cyrillic"],
	weight: ["400", "700"],
	display: "swap",
});

export const metadata: Metadata = {
	title: "Muslim Dikaev | Муслим Дикаев",
	description: "Портфолио фронтенд-разработчика Дикаева Муслима",
	viewport:
		"width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<ViewTransitions>
			<html lang="ru">
				<body className={mPlusRounded.className}>
					<>
						<Cursor className="hidden md:block" />
						<Nav />
						{children}
					</>
				</body>
			</html>
		</ViewTransitions>
	);
}
