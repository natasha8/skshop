"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { urlFor } from "@/sanity/lib/image";
import { useState } from "react";

interface ProductCardProps {
	product: {
		_id: string;
		title: string;
		slug: string;
		type: string;
		image: any;
		hoverImage?: any;
		price: number;
		isPreorder: boolean;
		variants?: Array<{
			price: number;
			size: string;
			color: string;
			stock: number;
		}>;
	};
}

export default function ProductCard({ product }: ProductCardProps) {
	const [showAlt, setShowAlt] = useState(false);
	const t = useTranslations();

	const lowestPrice = product.variants?.reduce(
		(min, variant) => (variant.price < min ? variant.price : min),
		product.variants[0]?.price || 0
	);

	const href = `/products/${product.slug}`;

	return (
		<motion.div
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.5 }}
			className="relative bg-white rounded overflow-hidden hover:shadow-xl transition-all duration-300"
		>
			<div className="aspect-9/14 relative overflow-hidden">
				<Link href={href} className="block w-full h-full">
					<>
						{product.image && (
							<Image
								src={urlFor(product.image).url()}
								alt={product.title}
								fill
								className={`object-contain transition-opacity duration-300 px-2 ${
									showAlt ? "opacity-0" : "opacity-100"
								}`}
								sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
								priority={false}
							/>
						)}
						{product.hoverImage && (
							<Image
								src={urlFor(product.hoverImage).url()}
								alt={`${product.title} alternate`}
								fill
								className={`object-contain transition-opacity duration-300 px-2 ${
									showAlt ? "opacity-100" : "opacity-0"
								}`}
								sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
								priority={false}
							/>
						)}
					</>
				</Link>

				{product.hoverImage && (
					<button
						type="button"
						aria-label={t("product.changeImage")}
						onClick={(e) => {
							e.preventDefault();
							setShowAlt((v) => !v);
						}}
						className="absolute top-2 right-2 z-10 rounded bg-white/80 border border-black px-2 py-1 text-xs font-medium shadow text-black"
					>
						{showAlt ? t("product.front") : t("product.back")}
					</button>
				)}

				{product.isPreorder && (
					<div className="absolute top-2 left-2 bg-orange-500 text-white px-2 py-1 rounded-full text-xs font-medium">
						{t("product.preorder")}
					</div>
				)}
			</div>

			<div className="p-4">
				<Link href={href}>
					<h3 className="font-semibold text-gray-900 transition-colors text-lg uppercase">
						{product.title}
					</h3>
				</Link>
				<div className="flex items-center justify-between">
					<p className="text-sm text-gray-500 capitalize ">
						{product.type}
					</p>
					<p className="text-sm text-black capitalize">
						€{product.price}
					</p>
				</div>
				{lowestPrice && (
					<p className="text-lg font-bold text-gray-900 mt-2">
						<span className="text-sm text-gray-500 capitalize">
							{" "}
							/ {lowestPrice.toFixed(2)}
						</span>
					</p>
				)}
			</div>
		</motion.div>
	);
}
