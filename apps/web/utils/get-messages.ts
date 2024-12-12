import type { AbstractIntlMessages } from 'next-intl';
import type { Locale, Translations } from '../i18n.config';

export async function getMessages(
  locale: Locale
): Promise<Partial<Record<keyof Translations, AbstractIntlMessages>>> {
  // Import messages directly
  const messages = {
    hero: (await import(`../i18n/${locale}/hero.json`)).default,
    features: (await import(`../i18n/${locale}/features.json`)).default,
    header: (await import(`../i18n/${locale}/header.json`)).default,
  };

  return messages as Partial<Record<keyof Translations, AbstractIntlMessages>>;
}
