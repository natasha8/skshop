import { defineField, defineType } from "sanity";

export default defineType({
	name: "product",
	title: "Product",
	type: "document",
	fields: [
		defineField({
			name: "title",
			type: "string",
			validation: (r) => r.required(),
		}),
		defineField({
			name: "slug",
			type: "slug",
			options: { source: "title", maxLength: 96 },
			validation: (r) => r.required(),
		}),
		defineField({
			name: "type",
			title: "Type",
			type: "string",
			options: {
				list: [
					{ title: "T-Shirt", value: "tshirt" },
					{ title: "Hoodie", value: "hoodie" },
					{ title: "Vinyl", value: "vinyl" },
					{ title: "Music", value: "music" },
					{ title: "Keychain", value: "keychain" },
					{ title: "Tote Bag", value: "toteBag" },
				],
			},
			validation: (r) => r.required(),
		}),
		defineField({ name: "description", type: "text" }),
		defineField({ name: "images", type: "array", of: [{ type: "image" }] }),
		defineField({
			name: "variants",
			type: "array",
			of: [
				{
					type: "object",
					fields: [
						defineField({ name: "sku", type: "string" }),
						defineField({ name: "size", type: "string" }),
						defineField({ name: "color", type: "string" }),
						defineField({
							name: "price",
							type: "number",
							validation: (r) => r.min(0).required(),
						}),
						defineField({
							name: "stock",
							type: "number",
							validation: (r) => r.min(0),
						}),
						defineField({
							name: "limitedEdition",
							type: "boolean",
						}),
					],
					preview: {
						select: {
							title: "sku",
							subtitle: "size",
							media: "image",
						},
					},
				},
			],
		}),
		defineField({
			name: "isPreorder",
			type: "boolean",
			initialValue: false,
		}),
		defineField({ name: "preorderReleaseAt", type: "datetime" }),
		defineField({
			name: "drop",
			type: "reference",
			to: [{ type: "drop" }],
		}),
		defineField({ name: "tags", type: "array", of: [{ type: "string" }] }),
	],
});
