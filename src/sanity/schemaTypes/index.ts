import { type SchemaTypeDefinition } from "sanity";
import product from "./product";
import drop from "./drop";
import shippingZone from "./shippingZone";
import taxRate from "./taxRate";
import promoCode from "./promoCode";
import giftCard from "./giftCard";
import siteSettings from "./siteSettings";

export const schema: { types: SchemaTypeDefinition[] } = {
	types: [
		product,
		drop,
		shippingZone,
		taxRate,
		promoCode,
		giftCard,
		siteSettings,
	],
};
