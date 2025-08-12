export default function LoadingSpinner({
	size = "md",
}: {
	size?: "sm" | "md" | "lg";
}) {
	const sizeClasses = {
		sm: "h-6 w-6",
		md: "h-12 w-12",
		lg: "h-16 w-16",
	};

	return (
		<div className="grid place-items-center">
			<div
				className={`animate-spin rounded-full border-b-2 border-blue-600 ${sizeClasses[size]}`}
			></div>
		</div>
	);
}
