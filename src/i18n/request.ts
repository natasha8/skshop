import { getRequestConfig } from "next-intl/server";
import { AppLocale, locales } from "./routing";

export default getRequestConfig(async ({ requestLocale }) => {
	let locale = (await requestLocale) as AppLocale | undefined;
	if (!locale || !locales.includes(locale)) {
		locale = "en";
	}

	const messages = (await import(`../messages/${locale}.json`)).default;

	return {
		locale,
		messages,
		timeZone: "Europe/Berlin",
	};
});
