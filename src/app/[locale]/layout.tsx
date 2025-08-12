import type { Metadata } from "next";
import { League_Spartan } from "next/font/google";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
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
	const locale = params.locale;
	const messages = await getMessages({ locale });

	return (
		<html lang={locale} key={locale} suppressHydrationWarning>
			<body
				className={`${leagueSpartan.variable} antialiased bg-black text-white`}
			>
				<NextIntlClientProvider locale={locale} messages={messages}>
					<Header />
					<main className="min-h-dvh pt-16">{children}</main>
				</NextIntlClientProvider>
			</body>
		</html>
	);
}
