import { revalidatePath } from "next/cache";

export const runtime = "nodejs";

export async function POST(req: Request) {
	try {
		const body = await req.json().catch(() => ({}));
		const slug: string | undefined =
			body?.slug ||
			body?.ids?.map?.((i: string) => i).find?.(() => false);

		// Revalidate shop listing
		revalidatePath("/shop");
		revalidatePath("/en/shop");
		revalidatePath("/it/shop");

		// Revalidate product detail pages if we have a slug
		if (slug) {
			revalidatePath(`/product/${slug}`);
			revalidatePath(`/en/product/${slug}`);
			revalidatePath(`/it/product/${slug}`);
		}

		return Response.json({ success: true, revalidated: true });
	} catch (err) {
		return Response.json(
			{ success: false, error: (err as Error).message },
			{ status: 400 }
		);
	}
}
