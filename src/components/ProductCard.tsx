"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { urlFor } from "@/sanity/lib/image";

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
	const lowestPrice = product.variants?.reduce(
		(min, variant) => (variant.price < min ? variant.price : min),
		product.variants[0]?.price || 0
	);

	return (
		<motion.div
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.5 }}
			className="group relative bg-white rounded overflow-hidden hover:shadow-xl transition-all duration-300"
		>
			<Link href={`/products/${product.slug}`}>
				<div className="aspect-9/14 relative overflow-hidden">
					{product.image && (
						<>
							<Image
								src={urlFor(product.image).url()}
								alt={product.title}
								fill
								className="object-contain transition-transform duration-300 group-hover:opacity-0 px-2"
								sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
								priority={false}
							/>
							{product.hoverImage && (
								<Image
									src={urlFor(product.hoverImage).url()}
									alt={`${product.title} hover`}
									fill
									className="object-contain opacity-0 transition-opacity duration-300 group-hover:opacity-100 px-2"
									sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
									priority={false}
								/>
							)}
						</>
					)}
					{product.isPreorder && (
						<div className="absolute top-2 left-2 bg-orange-500 text-white px-2 py-1 rounded-full text-xs font-medium">
							Pre-order
						</div>
					)}
				</div>

				<div className="p-4">
					<h3 className="font-semibold text-gray-900 group-hover:text-black transition-colors text-lg uppercase">
						{product.title}
					</h3>
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
			</Link>
		</motion.div>
	);
}
