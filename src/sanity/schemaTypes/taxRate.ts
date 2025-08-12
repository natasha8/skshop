import { defineField, defineType } from "sanity";

export default defineType({
	name: "taxRate",
	title: "Tax Rate",
	type: "document",
	fields: [
		defineField({
			name: "countryCode",
			type: "string",
			validation: (r) => r.required(),
		}),
		defineField({
			name: "label",
			type: "string",
			initialValue: "VAT 19% included",
		}),
		defineField({
			name: "rate",
			type: "number",
			description: "e.g., 0.19 for 19%",
			validation: (r) => r.min(0).max(1).required(),
		}),
	],
});
