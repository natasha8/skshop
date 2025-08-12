"use client";

import { useTranslations } from "next-intl";
import Link from "next/link";
import { motion } from "framer-motion";

export default function HomePage() {
	const t = useTranslations();
	return (
		<div className="min-h-[80dvh] grid place-items-center p-8">
			<motion.div
				initial={{ opacity: 0, y: 10 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.4 }}
				className="text-center"
			>
				<h1 className="text-4xl md:text-6xl font-bold tracking-tight">
					{t("brand.title")}
				</h1>
				<p className="mt-3 text-sm uppercase tracking-widest opacity-80">
					{t("brand.tagline")}
				</p>
				<div className="mt-8">
					<Link
						href="#shop"
						className="inline-block rounded-none border border-white px-6 py-2 text-sm font-semibold hover:bg-white hover:text-black focus:outline-none focus-visible:ring-4 focus-visible:ring-white/70 underline-offset-4 focus-visible:underline"
					>
						{t("home.hero_cta")}
					</Link>
				</div>
			</motion.div>
		</div>
	);
}
