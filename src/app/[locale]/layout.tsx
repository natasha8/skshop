import type { Metadata } from "next";
import { League_Spartan } from "next/font/google";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, getLocale } from "next-intl/server";
import { locales, type AppLocale } from "@/i18n/routing";
import { Header } from "@/components/Header";
import "@/app/globals.css";

const leagueSpartan = League_Spartan({
	variable: "--font-league-spartan",
	subsets: ["latin"],
	weight: ["400", "600", "700"],
});

export const metadata: Metadata = {
	title: "SECRET KEYWORDS",
	description: "Independent techno label",
};

export function generateStaticParams() {
	return locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
	children,
	params,
}: {
	children: React.ReactNode;
	params: { locale: AppLocale };
}) {
	const locale = (await getLocale()) as AppLocale;
	const messages = await getMessages();

	return (
		<html lang={locale}>
			<body
				className={`${leagueSpartan.variable} antialiased bg-black text-white`}
			>
				<NextIntlClientProvider locale={locale} messages={messages}>
					<Header />
					<main className="min-h-dvh">{children}</main>
				</NextIntlClientProvider>
			</body>
		</html>
	);
}
