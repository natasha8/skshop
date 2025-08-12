import createMiddleware from "next-intl/middleware";
import { locales, localePrefix } from "./i18n/routing";

export default createMiddleware({
	locales,
	defaultLocale: "en",
	localePrefix,
});

export const config = {
	// Match all request paths except for static files and API routes
	matcher: ["/((?!api|_next|_vercel|.*\\..*).*)"],
};
