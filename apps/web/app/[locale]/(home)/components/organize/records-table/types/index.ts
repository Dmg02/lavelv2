// apps/web/app/[locale]/(home)/components/organize/records-table/types/index.ts

export * from './columns';

// Mobile view section types
export type SectionKey = 
  | 'parties'
  | 'location'
  | 'caseDetails'
  | 'riskAndFinancial'
  | 'teamMembers';

export interface Section {
  key: SectionKey;
  icon: React.ReactNode;
  title: string;
}