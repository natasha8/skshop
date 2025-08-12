import { defineField, defineType } from "sanity";

export default defineType({
	name: "siteSettings",
	title: "Site Settings",
	type: "document",
	fields: [
		defineField({
			name: "brandName",
			type: "string",
			initialValue: "SECRET KEYWORDS",
		}),
		defineField({
			name: "vatIncludedLabel",
			type: "string",
			initialValue: "VAT 19% included",
		}),
		defineField({
			name: "defaultCountry",
			type: "string",
			initialValue: "DE",
		}),
		defineField({
			name: "supportedLocales",
			type: "array",
			of: [{ type: "string" }],
			initialValue: ["en", "it"],
		}),
	],
});
