"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";

import { sanityClient } from "@/lib/sanity.client";
import { PRODUCTS_QUERY } from "@/lib/sanity.queries";
import ProductCard from "./ProductCard";
import LoadingSpinner from "./LoadingSpinner";

interface Product {
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
}

export default function ProductGallery() {
	const [products, setProducts] = useState<Product[]>([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);
	const t = useTranslations();

	const fetchProducts = async () => {
		try {
			setLoading(true);
			setError(null);
			const data = await sanityClient.fetch(PRODUCTS_QUERY);
			setProducts(data);
		} catch (err) {
			console.error("Error fetching products:", err);
			setError(t("product.loadingError"));
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		fetchProducts();
	}, []);

	if (loading) {
		return (
			<div className="min-h-[400px] grid place-items-center">
				<div className="text-center">
					<LoadingSpinner size="lg" />
					<p className="text-gray-600 mt-4">
						{t("product.loadingProducts")}
					</p>
				</div>
			</div>
		);
	}

	if (error) {
		return (
			<div className="min-h-[400px] grid place-items-center">
				<div className="text-center text-red-600">
					<p>{error}</p>
					<button
						onClick={() => {
							setError(null);
							setLoading(true);
							fetchProducts();
						}}
						className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
					>
						{t("product.tryAgain")}
					</button>
				</div>
			</div>
		);
	}

	if (products.length === 0) {
		return (
			<div className="min-h-[400px] grid place-items-center">
				<div className="text-center text-gray-600">
					<p>{t("product.noProductsFound")}</p>
				</div>
			</div>
		);
	}

	return (
		<div className="w-full">
			<motion.div
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				transition={{ duration: 0.5, delay: 0.2 }}
				className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
			>
				{products.map((product, index) => (
					<motion.div
						key={product._id}
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.5, delay: index * 0.1 }}
					>
						<ProductCard product={product} />
					</motion.div>
				))}
			</motion.div>
		</div>
	);
}
