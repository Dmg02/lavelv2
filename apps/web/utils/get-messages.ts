import type { AbstractIntlMessages } from 'next-intl';
import type { Translations } from '@/i18n/types';

export async function getMessages(locale: string) {
  const messages = {
    hero: (await import(`../i18n/components/${locale}/hero.json`)).default,
    header: (await import(`../i18n/components/${locale}/header.json`)).default,
    organize: (await import(`../i18n/components/${locale}/organize.json`)).default,
    collaborate: (await import(`../i18n/components/${locale}/collaborate.json`)).default,
    library: (await import(`../i18n/components/${locale}/library.json`)).default,
  };

  return messages as Partial<Record<keyof Translations, AbstractIntlMessages>>;
}
