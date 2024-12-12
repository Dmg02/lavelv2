import type { FeaturesTranslations } from './features';
import type { HeaderTranslations } from './header';
import type { HeroTranslations } from './hero';

export interface Translations {
  hero: HeroTranslations;
  features: FeaturesTranslations;
  header: HeaderTranslations;
  // Add more namespaces here
}

export type Namespace = keyof Translations;
