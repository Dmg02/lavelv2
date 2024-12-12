'use client';
import { NextIntlClientProvider } from 'next-intl';
import type { AbstractIntlMessages } from 'next-intl';
import { useTranslations as useNextIntlTranslations } from 'next-intl';
import { useParams } from 'next/navigation';
import type { ReactNode } from 'react';
import type { Locale, Translations } from '../i18n.config';
import { i18n } from '../i18n.config';

type TranslationsProviderProps = {
  children: ReactNode;
  locale: Locale;
  messages: Partial<Record<keyof Translations, AbstractIntlMessages>>;
};

export function TranslationsProvider({
  children,
  locale,
  messages,
}: TranslationsProviderProps) {
  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      {children}
    </NextIntlClientProvider>
  );
}

export function useTranslations<N extends keyof Translations>(namespace: N) {
  const params = useParams();
  const rawLocale = params?.locale as string;
  const locale = i18n.locales.includes(rawLocale as Locale)
    ? rawLocale
    : i18n.defaultLocale;

  // Get translations for the specific namespace with type safety
  const t = useNextIntlTranslations(namespace);

  return {
    t,
    locale,
    locales: i18n.locales,
    defaultLocale: i18n.defaultLocale,
  };
}
