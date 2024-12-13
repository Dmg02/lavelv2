import type { HeaderTranslations } from './components/header';
import type { HeroTranslations } from './components/hero';
import type { OrganizeTranslations } from './components/organize';
import type { TeamMemberTranslations } from './shared/team-member';
import type { RecordTranslations } from './shared/records';
import type { CommonTranslations } from './shared/common';
import type { UITranslations } from './shared/ui';
import type { TableColumnTranslations } from './shared/tables';

export interface Translations {
  hero: HeroTranslations;
  header: HeaderTranslations;
  organize: OrganizeTranslations;
  teamMember: TeamMemberTranslations;
  records: RecordTranslations;
  common: CommonTranslations;
  ui: UITranslations;
  tables: TableColumnTranslations;
  // Add more namespaces here
}

export type Namespace = keyof Translations;
