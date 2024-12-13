import type { EnrichedCase } from '@/i18n/types/shared/case';

export type ColumnKey = 
  | 'favorite'
  | 'caseNumber'
  | 'status'
  | 'stage'
  | 'lawBranch'
  | 'client'
  | 'leadLawyer'
  | 'dateCreated';

export interface ColumnDef {
  key: ColumnKey;
  title: string;
  render: (item: EnrichedCase) => React.ReactNode;
  width?: string;
  align?: 'left' | 'center' | 'right';
}

export type ColumnVisibility = Record<ColumnKey, boolean>;

export const defaultColumnVisibility: ColumnVisibility = {
  favorite: true,
  caseNumber: true,
  status: true,
  stage: true,
  lawBranch: true,
  client: true,
  leadLawyer: true,
  dateCreated: true
};