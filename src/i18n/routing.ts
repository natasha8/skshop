export const locales = ["en", "it"] as const;
export type AppLocale = (typeof locales)[number];

// Always prefix routes with the locale, e.g. /en, /it
export const localePrefix = "always" as const;

// Minimal pathnames map; expand as you add routes
export const pathnames = {
	"/": "/",
} as const;
