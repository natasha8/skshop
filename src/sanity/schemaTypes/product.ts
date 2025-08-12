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
		defineField({ name: "description_IT", type: "text", rows: 3 }),
		defineField({ name: "description_EN", type: "text", rows: 3 }),
		defineField({ name: "images", type: "array", of: [{ type: "image" }] }),
		defineField({
			name: "sizes",
			type: "array",
			of: [{ type: "string" }],
			options: {
				list: [
					{ title: "S", value: "S" },
					{ title: "M", value: "M" },
					{ title: "L", value: "L" },
					{ title: "XL", value: "XL" },
					{ title: "XXL", value: "XXL" },
				],
			},
			validation: (r) => r.required(),
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
		defineField({ name: "price", type: "number" }),
	],
	preview: {
		select: {
			title: "title",
			subtitle: "price",
			media: "images[0]",
		},
	},
});
