"use client";

import { motion } from "framer-motion";
import ProductGallery from "@/components/ProductGallery";

export default function ProductsPage() {
	return (
		<div className="min-h-[80dvh] p-8">
			<motion.div
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.5 }}
				className="max-w-7xl mx-auto"
			>
				<div className="text-center mb-12">
					<h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-4">
						All Products
					</h1>
					<p className="text-xl text-gray-600 max-w-2xl mx-auto">
						Browse our complete collection of merchandise, music,
						and exclusive items
					</p>
				</div>

				<ProductGallery />
			</motion.div>
		</div>
	);
}
