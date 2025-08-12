import { defineField, defineType } from "sanity";

export default defineType({
	name: "drop",
	title: "Drop",
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
		defineField({ name: "releaseAt", type: "datetime" }),
		defineField({ name: "description", type: "text" }),
		defineField({
			name: "products",
			type: "array",
			of: [{ type: "reference", to: [{ type: "product" }] }],
		}),
	],
});
