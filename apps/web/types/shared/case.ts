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
  SETTLEMENT: 'Acuerdo'
} as const;


export type CaseStatus = typeof CaseStatus[keyof typeof CaseStatus];
export type CaseStage = typeof CaseStage[keyof typeof CaseStage];

export interface Case {
  // Identifiers
  id: string;
  caseNumber: string;
  relatedCase: string;
  
  // Status and Classification
  status: CaseStatus;
  stage: CaseStage;
  lawBranch: LawBranch;
  typeOfTrial?: string;
  
  // Parties
  plaintiff: string;
  defendant: string;
  client: string;
  corporation: string;
  
  // Location
  courthouse: Courthouses;
  city: Cities;
  state: States;
  
  // Dates and Metrics
  dateCreated: string;
  totalHours: number;
  
  // Case Details
  summary: string;
  riskFactor?: string;
  contingencyCost?: number;
  
  // Assignments and Preferences
  favorite: boolean;
  leadLawyerId: string;
  assignedLawyerIds: string[];
}