"use client";

import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";
import { usePathname } from "next/navigation";
import { Languages, Contrast } from "lucide-react";
import { useEffect, useState } from "react";

function useHighContrast() {
	const [enabled, setEnabled] = useState(false);

	useEffect(() => {
		const stored =
			typeof window !== "undefined"
				? window.localStorage.getItem("hc")
				: null;
		const shouldEnable = stored === "1";
		setEnabled(shouldEnable);
		document.documentElement.classList.toggle("hc", shouldEnable);
	}, []);

	useEffect(() => {
		document.documentElement.classList.toggle("hc", enabled);
		if (typeof window !== "undefined") {
			window.localStorage.setItem("hc", enabled ? "1" : "0");
		}
	}, [enabled]);

	return { enabled, setEnabled } as const;
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
		<header className="flex items-center justify-between px-6 py-4 border-b border-white/15">
			<Link
				href={`/${locale}`}
				className="font-semibold tracking-tight hover:underline underline-offset-4"
			>
				{t("brand.title")}
			</Link>
			<div className="flex items-center gap-3">
				<button
					type="button"
					onClick={() => setEnabled(!enabled)}
					className="inline-flex items-center gap-2 border border-white px-3 py-1 text-xs uppercase tracking-wider hover:bg-white hover:text-black focus:outline-none focus-visible:ring-4 focus-visible:ring-white/70"
					aria-pressed={enabled}
				>
					<Contrast size={14} />
					{enabled ? t("ui.contrast_on") : t("ui.contrast_off")}
				</button>
				<Link
					href={switchHref}
					className="inline-flex items-center gap-2 border border-white px-3 py-1 text-xs uppercase tracking-wider hover:bg-white hover:text-black focus:outline-none focus-visible:ring-4 focus-visible:ring-white/70"
					aria-label={t("ui.language")}
				>
					<Languages size={14} />
					{otherLocale.toUpperCase()}
				</Link>
			</div>
		</header>
	);
}
