import { defineField, defineType } from "sanity";

export default defineType({
	name: "shippingZone",
	title: "Shipping Zone",
	type: "document",
	fields: [
		defineField({
			name: "title",
			type: "string",
			validation: (r) => r.required(),
		}),
		defineField({
			name: "countryCode",
			type: "string",
			description: "ISO 3166-1 alpha-2 (e.g., DE, IT, US)",
			validation: (r) => r.required(),
		}),
		defineField({
			name: "flatRate",
			type: "number",
			description: "Flat shipping rate for this country",
			validation: (r) => r.min(0).required(),
		}),
		defineField({
			name: "pickupAvailable",
			type: "boolean",
			initialValue: false,
		}),
	],
});
