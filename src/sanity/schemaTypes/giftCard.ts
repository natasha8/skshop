import { defineField, defineType } from "sanity";

export default defineType({
	name: "giftCard",
	title: "Gift Card",
	type: "document",
	fields: [
		defineField({
			name: "code",
			type: "string",
			validation: (r) => r.required(),
		}),
		defineField({
			name: "balance",
			type: "number",
			validation: (r) => r.min(0).required(),
		}),
		defineField({ name: "active", type: "boolean", initialValue: true }),
		defineField({ name: "expiresAt", type: "datetime" }),
	],
});
