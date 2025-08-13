"use client";

import { useCart } from "@/contexts/CartProvider";
import { useState } from "react";
import { motion } from "framer-motion";
import { Check, ShoppingCart } from "lucide-react";

interface AddToCartButtonProps {
	product: {
		_id: string;
		title: string;
		slug: string;
		price?: number; // Make price optional
		type: string;
		isPreorder: boolean;
		images: any[];
	};
	selectedSize?: string;
	quantity: number;
	selectedVariant?: {
		size: string;
		color?: string;
		price: number;
		stock: number;
		_id?: string;
	};
	disabled?: boolean;
}

export default function AddToCartButton({
	product,
	selectedSize,
	quantity,
	selectedVariant,
	disabled = false,
}: AddToCartButtonProps) {
	const { addItem, isInCart } = useCart();
	const [isAdding, setIsAdding] = useState(false);
	const [isAdded, setIsAdded] = useState(false);

	const isProductInCart = isInCart(product._id, selectedSize);

	const handleAddToCart = async () => {
		if (disabled || isProductInCart) return;

		setIsAdding(true);

		// Simulate API call delay
		await new Promise((resolve) => setTimeout(resolve, 500));

		const cartItem = {
			productId: product._id,
			title: product.title,
			slug: product.slug,
			price: selectedVariant?.price || product.price || 0, // Provide fallback
			quantity,
			size: selectedSize,
			color: selectedVariant?.color,
			image: product.images?.[0]?.asset?.url || product.images?.[0] || "",
			type: product.type,
			isPreorder: product.isPreorder,
			variantId: selectedVariant?._id,
			stock: selectedVariant?.stock,
		};

		addItem(cartItem);

		setIsAdding(false);
		setIsAdded(true);

		// Reset added state after 2 seconds
		setTimeout(() => setIsAdded(false), 2000);
	};

	if (isProductInCart) {
		return (
			<button
				disabled
				className="w-full bg-green-600 text-white border py-3 px-6 rounded-lg font-semibold opacity-75 cursor-not-allowed"
			>
				<Check className="w-5 h-5 inline mr-2" />
				Already in Cart
			</button>
		);
	}

	return (
		<motion.button
			whileHover={!disabled ? { scale: 1.02 } : {}}
			whileTap={!disabled ? { scale: 0.98 } : {}}
			onClick={handleAddToCart}
			disabled={disabled || isAdding}
			className={`w-full border py-3 px-6 rounded-lg font-semibold transition-all duration-200 ${
				isAdded
					? "bg-green-600 text-white"
					: disabled
					? "bg-gray-300 text-gray-500 cursor-not-allowed"
					: "bg-black text-white hover:bg-gray-800"
			}`}
		>
			{isAdding ? (
				<div className="flex items-center justify-center">
					<div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
					Adding...
				</div>
			) : isAdded ? (
				<div className="flex items-center justify-center">
					<Check className="w-5 h-5 mr-2" />
					Added to Cart!
				</div>
			) : (
				<div className="flex items-center justify-center">
					<ShoppingCart className="w-5 h-5 mr-2" />
					Add to Cart
				</div>
			)}
		</motion.button>
	);
}
