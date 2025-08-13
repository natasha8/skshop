"use client";

import { useCart } from "@/contexts/CartProvider";
import { useTranslations } from "next-intl";
import { ShoppingBag } from "lucide-react";
import { motion } from "framer-motion";

export default function CartButton() {
	const { state, openCart } = useCart();
	const t = useTranslations();

	return (
		<button
			onClick={openCart}
			className="relative p-2 hover:bg-gray-100 rounded-full transition-colors"
			aria-label={t("nav.cart")}
		>
			<ShoppingBag className="w-5 h-5" />

			{/* Cart Badge */}
			{state.totalItems > 0 && (
				<motion.div
					initial={{ scale: 0 }}
					animate={{ scale: 1 }}
					className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-medium"
				>
					{state.totalItems > 99 ? "99+" : state.totalItems}
				</motion.div>
			)}
		</button>
	);
}
