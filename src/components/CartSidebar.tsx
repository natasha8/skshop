"use client";

import { useCart } from "@/contexts/CartProvider";
import { useTranslations } from "next-intl";
import { X, Trash2, Minus, Plus, ShoppingBag } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

export default function CartSidebar() {
	const { state, removeItem, updateQuantity, closeCart, clearCart } =
		useCart();
	const t = useTranslations();

	const handleQuantityChange = (
		id: string,
		currentQuantity: number,
		change: number
	) => {
		const newQuantity = currentQuantity + change;
		if (newQuantity > 0) {
			updateQuantity(id, newQuantity);
		}
	};

	const formatPrice = (price: number) => {
		return new Intl.NumberFormat("en-US", {
			style: "currency",
			currency: "EUR",
		}).format(price);
	};

	return (
		<AnimatePresence>
			{state.isOpen && (
				<>
					{/* Backdrop */}
					<motion.div
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						exit={{ opacity: 0 }}
						className="fixed inset-0 bg-black bg-opacity-50 z-40"
						onClick={closeCart}
					/>

					{/* Cart Sidebar */}
					<motion.div
						initial={{ x: "100%" }}
						animate={{ x: 0 }}
						exit={{ x: "100%" }}
						transition={{
							type: "spring",
							damping: 25,
							stiffness: 200,
						}}
						className="fixed right-0 top-0 h-full w-full max-w-md bg-white z-50 shadow-2xl"
					>
						{/* Header */}
						<div className="flex items-center justify-between p-6 border-b border-gray-200">
							<div className="flex items-center gap-3">
								<ShoppingBag className="w-6 h-6" />
								<h2 className="text-xl font-semibold text-gray-900">
									{t("nav.cart")} ({state.totalItems})
								</h2>
							</div>
							<button
								onClick={closeCart}
								className="p-2 hover:bg-gray-100 rounded-full transition-colors"
							>
								<X className="w-5 h-5" />
							</button>
						</div>

						{/* Cart Items */}
						<div className="flex-1 overflow-y-auto p-6">
							{state.items.length === 0 ? (
								<div className="text-center py-12">
									<ShoppingBag className="w-16 h-16 text-gray-300 mx-auto mb-4" />
									<p className="text-gray-500 text-lg mb-2">
										Your cart is empty
									</p>
									<p className="text-gray-400">
										Add some products to get started
									</p>
								</div>
							) : (
								<div className="space-y-4">
									{state.items.map((item) => (
										<motion.div
											key={item.id}
											initial={{ opacity: 0, y: 20 }}
											animate={{ opacity: 1, y: 0 }}
											exit={{ opacity: 0, y: -20 }}
											className="flex gap-4 p-4 border border-gray-200 rounded-lg"
										>
											{/* Product Image */}
											<div className="w-20 h-20 relative flex-shrink-0">
												{item.image &&
												typeof item.image ===
													"string" &&
												item.image !== "" ? (
													<Image
														src={item.image}
														alt={item.title}
														fill
														className="object-cover rounded"
													/>
												) : (
													<div className="w-full h-full bg-gray-200 rounded flex items-center justify-center">
														<ShoppingBag className="w-8 h-8 text-gray-400" />
													</div>
												)}
											</div>

											{/* Product Details */}
											<div className="flex-1 min-w-0">
												<h3 className="font-medium text-black uppercase truncate">
													{item.title}
												</h3>
												{item.size && (
													<p className="text-sm text-black">
														Size: {item.size}
													</p>
												)}
												{item.color && (
													<p className="text-sm text-black">
														Color: {item.color}
													</p>
												)}
												<p className="text-sm font-medium text-black mt-1">
													{formatPrice(item.price)}
												</p>
											</div>

											{/* Quantity Controls */}
											<div className="flex flex-col items-end gap-2">
												<div className="flex items-center border border-black rounded">
													<button
														onClick={() =>
															handleQuantityChange(
																item.id,
																item.quantity,
																-1
															)
														}
														className="p-1 transition-colors text-black"
														disabled={
															item.quantity <= 1
														}
													>
														<Minus className="w-3 h-3 text-black" />
													</button>
													<span className="px-2 text-sm text-black">
														{item.quantity}
													</span>
													<button
														onClick={() =>
															handleQuantityChange(
																item.id,
																item.quantity,
																1
															)
														}
														className="p-1 transition-colors text-black"
													>
														<Plus className="w-3 h-3 text-black" />
													</button>
												</div>

												<button
													onClick={() =>
														removeItem(item.id)
													}
													className="p-1 text-red-500  rounded transition-colors"
												>
													<Trash2 className="w-4 h-4" />
												</button>
											</div>
										</motion.div>
									))}
								</div>
							)}
						</div>

						{/* Footer */}
						{state.items.length > 0 && (
							<div className="border-t border-gray-200 p-6 space-y-4">
								<div className="flex justify-between text-lg font-semibold text-black">
									<span>Total:</span>
									<span>{formatPrice(state.totalPrice)}</span>
								</div>

								<div className="space-y-3">
									<button
										onClick={clearCart}
										className="w-full py-3 px-4 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
									>
										Clear Cart
									</button>

									<Link
										href="/checkout"
										onClick={closeCart}
										className="block w-full py-3 px-4 bg-black text-white text-center rounded-lg hover:bg-gray-800 transition-colors"
									>
										Proceed to Checkout
									</Link>
								</div>
							</div>
						)}
					</motion.div>
				</>
			)}
		</AnimatePresence>
	);
}
