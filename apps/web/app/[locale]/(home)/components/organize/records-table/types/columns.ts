import type { ReactNode } from 'react';
import type { Case } from '@/types/shared/case';

export type ColumnKey = 
  | 'favorite'
  | 'caseNumber'
  | 'status'
  | 'stage'
  | 'lawBranch'
  | 'client'
  | 'leadLawyer'
  | 'dateCreated'
  | 'corporation'
  | 'riskFactor'
  | 'contingencyCost'
  | 'typeOfTrial'
  | 'totalHours'
  | 'assignedLawyers'
  | 'courthouse'
  | 'plaintiff'
  | 'defendant';

export interface ColumnDef {
  key: ColumnKey;
  title: string;
  render: (item: Case) => ReactNode;
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
  dateCreated: true,
  corporation: true,
  riskFactor: true,
  contingencyCost: true,
  typeOfTrial: true,
  totalHours: true,
  assignedLawyers: true,
  courthouse: true,
  plaintiff: true,
  defendant: true,
};
