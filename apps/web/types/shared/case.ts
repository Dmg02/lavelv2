import type { LawBranch } from './law-branch';
import type { Courthouses } from './courthouses';
import { Cities, States } from './location';

export const CaseStatus = {
  ACTIVE: 'Activo',
  INACTIVE: 'Inactivo',
} as const;

export const CaseStage = {
  INITIAL: 'Conciliación',
  DISCOVERY: 'Demanda',
  TRIAL: 'Juicio',
  APPEAL: 'Amparo',
  SETTLEMENT: 'Convenio'
} as const;

export const RiskFactor = {
  LOW: 'Bajo',
  MEDIUM: 'Medio',
  HIGH: 'Alto',
} as const;

export type CaseStatus = typeof CaseStatus[keyof typeof CaseStatus];
export type CaseStage = typeof CaseStage[keyof typeof CaseStage];
export type RiskFactor = typeof RiskFactor[keyof typeof RiskFactor];

export interface CaseDocument {
  id: string;
  title: string;
  type: string;
  size: string;
  status: string;
  filingDate?: string;
  dueDate?: string;
  lastModified: string;
  version: string;
  authorId: string;
  tags?: string[];
  preview?: {
    text?: string;
    imageUrl?: string;
    videoUrl?: string;
    audioUrl?: string;
  };
}

export interface Case {
  id: string;
  caseNumber: string;
  documents: CaseDocument[];
  assignedLawyerIds: string[];
}