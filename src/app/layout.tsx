// Redirect to default locale. Layout is handled in `app/[locale]/layout.tsx`.
export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return children;
}
