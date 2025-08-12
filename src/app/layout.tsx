import type { Metadata } from "next";
import { League_Spartan } from "next/font/google";
import "./globals.css";

const leagueSpartan = League_Spartan({
	variable: "--font-league-spartan",
	subsets: ["latin"],
});

export const metadata: Metadata = {
	title: "SECRET KEYWORDS",
	description: "SECRET KEYWORDS INDIPENDED TECHNO LABEL",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body className={`${leagueSpartan.variable} antialiased`}>
				{children}
			</body>
		</html>
	);
}
