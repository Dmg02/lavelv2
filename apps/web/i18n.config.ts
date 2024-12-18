import type { AbstractIntlMessages } from 'next-intl';
import { createNavigation } from 'next-intl/navigation';
import { defineRouting } from 'next-intl/routing';
import { getRequestConfig } from 'next-intl/server';

// Define available locales
export const locales = ['en', 'es'] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = 'en';

// Define routing configuration
export const routing = defineRouting({
  locales,
  defaultLocale,
});

// Create navigation functions using the routing config
export const { Link, redirect, usePathname, useRouter } =
  createNavigation(routing);

// Export i18n config object
export const i18n = {
  locales,
  defaultLocale,
};

// Next-intl configuration for messages
export default getRequestConfig(async ({ locale }) => {
  const messages = {
    en: {
      hero: (await import('./i18n/components/en/hero.json')).default,
      header: (await import('./i18n/components/en/header.json')).default,
      organize: (await import('./i18n/components/en/organize.json')).default,
      collaborate: (await import('./i18n/components/en/collaborate.json')).default,
      library: (await import('./i18n/components/en/library.json')).default,
    },
    es: {
      hero: (await import('./i18n/components/es/hero.json')).default,
      header: (await import('./i18n/components/es/header.json')).default,
      organize: (await import('./i18n/components/es/organize.json')).default,
      collaborate: (await import('./i18n/components/es/collaborate.json')).default,
      library: (await import('./i18n/components/es/library.json')).default,
    },
  } as Record<string, Record<string, AbstractIntlMessages>>;

  return {
    messages: messages[locale],
    timeZone: 'UTC',
  };
});

// Import and re-export translation types
import type { Namespace, Translations } from './i18n/types';
export type { Translations, Namespace };
