import { defineField, defineType } from "sanity";

export default defineType({
	name: "promoCode",
	title: "Promo Code",
	type: "document",
	fields: [
		defineField({
			name: "code",
			type: "string",
			validation: (r) => r.required(),
		}),
		defineField({
			name: "type",
			type: "string",
			options: {
				list: [
					{ title: "Percent", value: "percent" },
					{ title: "Fixed", value: "fixed" },
				],
			},
			validation: (r) => r.required(),
		}),
		defineField({
			name: "value",
			type: "number",
			validation: (r) => r.min(0).required(),
		}),
		defineField({ name: "active", type: "boolean", initialValue: true }),
		defineField({ name: "validFrom", type: "datetime" }),
		defineField({ name: "validTo", type: "datetime" }),
		defineField({ name: "maxRedemptions", type: "number" }),
	],
});
