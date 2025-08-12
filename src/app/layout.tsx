import type { Metadata } from "next";
import { League_Spartan } from "next/font/google";
import "./globals.css";

const leagueSpartan = League_Spartan({
	variable: "--font-league-spartan",
	subsets: ["latin"],
	weight: ["400", "600", "700"],
});

export const metadata: Metadata = {
	title: "SECRET KEYWORDS",
	description: "Independent techno label",
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html>
			<body
				className={`${leagueSpartan.variable} antialiased bg-black text-white`}
			>
				{children}
			</body>
		</html>
	);
}
