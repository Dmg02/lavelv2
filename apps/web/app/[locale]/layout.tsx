import type { ReactNode } from 'react';
import type { Locale } from '../../i18n.config';
import { getMessages } from '../../utils/get-messages';
import { TranslationsProvider } from '../../utils/translations';
import { Footer } from '../components/footer';
import { Header } from '../components/header';

export const dynamicParams = true;

export async function generateStaticParams() {
  return [{ locale: 'en' }, { locale: 'es' }];
}

type LocaleLayoutProperties = {
  children: ReactNode;
  params: { locale: Locale };
};

export default async function LocaleLayout({
  children,
  params: { locale },
}: LocaleLayoutProperties) {
  const messages = await getMessages(locale);

  return (
    <TranslationsProvider messages={messages} locale={locale}>
      <Header />
      <main>{children}</main>
      <Footer />
    </TranslationsProvider>
  );
}
