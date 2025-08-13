"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import { motion } from "framer-motion";
import { useLocale, useTranslations } from "next-intl";
import { sanityClient } from "@/lib/sanity.client";
import { PRODUCT_BY_SLUG_QUERY } from "@/lib/sanity.queries";
import { urlFor } from "@/sanity/lib/image";
import LoadingSpinner from "@/components/LoadingSpinner";
import AddToCartButton from "@/components/AddToCartButton";

interface ProductVariant {
	sku: string;
	size: string;
	color: string;
	price: number;
	stock: number;
	limitedEdition: boolean;
}

interface Product {
	_id: string;
	title: string;
	description_IT?: string;
	description_EN?: string;
	slug: string;
	type: string;
	price?: number;
	sizes?: string[];
	isPreorder: boolean;
	preorderReleaseAt: string;
	images: any[];
	variants: ProductVariant[];
	drop?: {
		_id: string;
		title: string;
		slug: string;
	};
}

export default function ProductPage() {
	const params = useParams();
	const slug = params.slug as string;
	const locale = useLocale();
	const t = useTranslations();

	const [product, setProduct] = useState<Product | null>(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);
	const [selectedImage, setSelectedImage] = useState(0);
	const [selectedSize, setSelectedSize] = useState<string | null>(null);
	const [quantity, setQuantity] = useState<number>(1);

	useEffect(() => {
		const fetchProduct = async () => {
			try {
				setLoading(true);
				const data = await sanityClient.fetch(PRODUCT_BY_SLUG_QUERY, {
					slug,
				});
				setProduct(data);
			} catch (err) {
				console.error("Error fetching product:", err);
				setError(t("product.loadingError"));
			} finally {
				setLoading(false);
			}
		};

		if (slug) {
			fetchProduct();
		}
	}, [slug]);

	// Reset quantity when changing size
	useEffect(() => {
		setQuantity(1);
	}, [selectedSize]);

	if (loading) {
		return (
			<div className="min-h-[80dvh] grid place-items-center">
				<div className="text-center">
					<LoadingSpinner size="lg" />
					<p className="text-gray-600 mt-4">{t("product.loading")}</p>
				</div>
			</div>
		);
	}

	if (error || !product) {
		return (
			<div className="min-h-[80dvh] grid place-items-center">
				<div className="text-center text-red-600">
					<p>{error || t("product.notFound")}</p>
				</div>
			</div>
		);
	}

	// Get the correct description based on current locale
	const getDescription = () => {
		if (locale === "it" && product.description_IT) {
			return product.description_IT;
		}
		if (locale === "en" && product.description_EN) {
			return product.description_EN;
		}
		// Fallback to the other language if current language is not available
		return product.description_IT || product.description_EN;
	};

	const lowestPrice = product.variants?.reduce(
		(min, variant) => (variant.price < min ? variant.price : min),
		product.variants[0]?.price || 0
	);

	const sizeOptions = Array.from(
		new Set(
			(product.variants?.map((v) => v.size) || []).concat(
				product.sizes || []
			)
		)
	);

	const selectedVariant = selectedSize
		? product.variants?.find((v) => v.size === selectedSize)
		: undefined;

	const displayPrice = (selectedVariant?.price ??
		product.price ??
		lowestPrice ??
		0) as number;

	// Quantity is intentionally unlimited (no upper bound)

	return (
		<div className="max-h-[80dvh] p-8">
			<div className="mx-auto">
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.5 }}
					className="grid grid-cols-1 lg:grid-cols-2 gap-12"
				>
					{/* Product Images */}
					<div className="flex gap-4">
						{product.images.length > 1 && (
							<div className="flex flex-col gap-2 w-20 sm:w-24">
								{product.images.map((image, index) => (
									<button
										key={index}
										onClick={() => setSelectedImage(index)}
										className={`relative aspect-square overflow-hidden rounded-lg border-2 ${
											selectedImage === index
												? "border-black"
												: "border-gray-200"
										}`}
									>
										<Image
											src={urlFor(image).url()}
											alt={`${product.title} ${
												index + 1
											}`}
											fill
											className="object-cover"
											sizes="80px"
										/>
									</button>
								))}
							</div>
						)}

						<div className="flex-1">
							<div className="aspect-square relative overflow-hidden rounded-lg">
								{product.images[selectedImage] && (
									<Image
										src={urlFor(
											product.images[selectedImage]
										).url()}
										alt={product.title}
										fill
										className="object-cover"
										sizes="(max-width: 768px) 100vw, 50vw"
									/>
								)}
							</div>
						</div>
					</div>

					{/* Product Info */}
					<div className="space-y-6">
						<div>
							<h1 className="text-4xl font-bold text-white mb-2 uppercase">
								{product.title}
							</h1>
							<p className="text-lg text-gray-600 capitalize">
								{product.type}
							</p>
							{product.isPreorder && (
								<div className="inline-block bg-black text-white  border px-3 py-1 rounded-full text-sm font-medium mt-2">
									{t("product.preorder")}
								</div>
							)}
						</div>

						{(product.description_IT || product.description_EN) && (
							<div>
								<h3 className="text-lg font-semibold text-white mb-2">
									{t("product.description")}
								</h3>
								<p className="text-gray-400">
									{getDescription()}
								</p>
							</div>
						)}

						{displayPrice > 0 && (
							<div>
								<h3 className="text-lg font-semibold text-white mb-2">
									{t("product.price")}
								</h3>
								<p className="text-3xl font-bold text-white">
									€{displayPrice.toFixed(2)}
								</p>
								{selectedVariant && (
									<p className="text-sm mt-1 text-gray-400">
										{selectedVariant.stock > 0
											? t("product.inStock", {
													count: selectedVariant.stock,
											  })
											: t("product.outOfStock")}
									</p>
								)}
							</div>
						)}

						{/* Size and Quantity Section */}
						{sizeOptions.length > 0 && (
							<div>
								<h3 className="text-lg font-semibold text-white mb-2">
									{t("product.sizeAndQuantity")}
								</h3>
								<div className="flex justify-between items-center">
									{/* Size Selection - Left Side */}
									<div className="flex-1">
										<div className="flex flex-wrap gap-1 pt-6">
											{sizeOptions.map((size) => {
												const variantForSize =
													product.variants?.find(
														(v) => v.size === size
													);
												const isOut =
													(variantForSize?.stock ||
														10) <= 0;
												const isSelected =
													selectedSize === size;
												return (
													<button
														key={size}
														onClick={() =>
															!isOut &&
															setSelectedSize(
																size
															)
														}
														disabled={isOut}
														className={
															`px-3 py-2 rounded-lg border text-sm font-medium transition-colors w-12 ` +
															(isSelected
																? "bg-black text-white border-white"
																: "bg-white text-black border-gray-300 hover:border-black") +
															(isOut
																? " opacity-50 cursor-not-allowed"
																: "")
														}
													>
														{size}
													</button>
												);
											})}
										</div>
									</div>

									{/* Quantity Selector - Right Side */}
									<div className="flex-shrink-0 pt-6">
										<div className="flex items-center bg-white rounded-lg border-2 border-gray-300 overflow-hidden">
											<button
												type="button"
												aria-label={t(
													"product.decreaseQuantity"
												)}
												onClick={() =>
													setQuantity((q) =>
														Math.max(1, q - 1)
													)
												}
												disabled={
													quantity <= 1 ||
													(selectedVariant &&
														typeof selectedVariant.stock ===
															"number" &&
														selectedVariant.stock <=
															0)
												}
												className={`w-10 h-10 grid place-items-center text-black font-bold text-lg transition-colors ${
													quantity <= 1 ||
													(selectedVariant &&
														typeof selectedVariant.stock ===
															"number" &&
														selectedVariant.stock <=
															0)
														? "opacity-50 cursor-not-allowed bg-gray-100"
														: "hover:bg-gray-100 active:bg-gray-200"
												}`}
											>
												−
											</button>
											<div className="w-16 h-10 flex items-center justify-center border-l border-r border-gray-300 bg-white">
												<span className="text-black font-semibold text-lg">
													{quantity}
												</span>
											</div>
											<button
												type="button"
												aria-label={t(
													"product.increaseQuantity"
												)}
												onClick={() =>
													setQuantity((q) => q + 1)
												}
												disabled={
													selectedVariant &&
													typeof selectedVariant.stock ===
														"number" &&
													selectedVariant.stock <= 0
												}
												className={`w-10 h-10 grid place-items-center text-black font-bold text-lg transition-colors ${
													selectedVariant &&
													typeof selectedVariant.stock ===
														"number" &&
													selectedVariant.stock <= 0
														? "opacity-50 cursor-not-allowed bg-gray-100"
														: "hover:bg-gray-100 active:bg-gray-200"
												}`}
											>
												+
											</button>
										</div>
									</div>
								</div>
							</div>
						)}

						{product.drop && (
							<div>
								<h3 className="text-lg font-semibold text-gray-900 mb-2">
									{t("product.partOfDrop")}
								</h3>
								<p className="text-blue-600 hover:text-blue-800 cursor-pointer">
									{product.drop.title}
								</p>
							</div>
						)}
						<div className="pt-8">
							<AddToCartButton
								product={product}
								selectedSize={selectedSize}
								quantity={quantity}
								selectedVariant={selectedVariant}
								disabled={
									(selectedVariant &&
										selectedVariant.stock <= 0) ||
									quantity < 1
								}
							/>
						</div>
					</div>
				</motion.div>
			</div>
		</div>
	);
}
