"use client";

import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";
import { usePathname } from "next/navigation";
import { Languages, Contrast } from "lucide-react";
import { useEffect, useState } from "react";
import Image from "next/image";

function useHighContrast() {
	const [enabled, setEnabled] = useState(false);
	const [mounted, setMounted] = useState(false);

	useEffect(() => {
		setMounted(true);
		const stored = window.localStorage.getItem("hc");
		const shouldEnable = stored === "1";
		setEnabled(shouldEnable);
		document.documentElement.classList.toggle("hc", shouldEnable);
	}, []);

	useEffect(() => {
		if (mounted) {
			document.documentElement.classList.toggle("hc", enabled);
			window.localStorage.setItem("hc", enabled ? "1" : "0");
		}
	}, [enabled, mounted]);

	return { enabled, setEnabled, mounted } as const;
}

export function Header() {
	const t = useTranslations();
	const locale = useLocale();
	const pathname = usePathname();
	const { enabled, setEnabled } = useHighContrast();

	const otherLocale = locale === "en" ? "it" : "en";
	const switchHref = `/${otherLocale}${
		pathname?.replace(/^\/[a-z]{2}/, "") ?? ""
	}`;

	return (
		<header className="fixed top-0 inset-x-0 z-50 h-16 bg-black flex items-center justify-between px-6 border-b border-white/15">
			<Link
				href={`/${locale}`}
				className="font-semibold tracking-tight hover:underline underline-offset-4"
			>
				<Image
					src="/sklogo_trans.png"
					alt="Logo"
					width={150}
					height={100}
					className="w-auto h-16"
					priority
				/>
			</Link>

			<nav className="hidden md:flex items-center gap-6">
				<Link
					href={`/${locale}`}
					className="text-white hover:text-gray-300 transition-colors"
				>
					Home
				</Link>
				<Link
					href={`/${locale}/products`}
					className="text-white hover:text-gray-300 transition-colors"
				>
					Products
				</Link>
			</nav>

			<div className="flex items-center gap-3">
				<Link
					href={switchHref}
					className="inline-flex items-center gap-2 border border-white px-3 py-1 text-xs uppercase tracking-wider hover:bg-white hover:text-black focus:outline-none focus-visible:ring-4 focus-visible:ring-white/70"
					aria-label={t("ui.language")}
				>
					{otherLocale.toUpperCase()}
				</Link>
			</div>
		</header>
	);
}
