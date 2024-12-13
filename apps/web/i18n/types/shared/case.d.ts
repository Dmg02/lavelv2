// apps/web/i18n/types/shared/case.d.ts

import type { 
  LawyerRole, 
  LawyerSpecialization,
  LawyerTeamMember,
  CityLocation 
} from './team-member';

export type CaseStatusKey = 'active' | 'inactive' | 'pending' | 'closed';
export type CaseStageKey = 'initial' | 'discovery' | 'trial' | 'appeal' | 'closed';
export type RiskFactorKey = 'high' | 'medium' | 'low';

export interface Case {
  id: string;
  caseNumber: string;
  status: CaseStatusKey;
  lawBranch: LawyerSpecialization;
  stage: CaseStageKey;
  riskFactor: RiskFactorKey;
  plaintiff: string;
  defendant: string;
  client: string;
  corporation: string;
  summary: string;
  totalHours: number;
  leadLawyerId: string;
  assignedLawyerIds: string[];
  courthouse: string;
  state: string;
  city: CityLocation;
  contingencyCost: number;
  dateCreated: string;
  favorite: boolean;
}

// For the enriched case data after combining with lawyer info
export interface EnrichedCase extends Omit<Case, 'leadLawyerId' | 'assignedLawyerIds'> {
  leadLawyer: LawyerTeamMember;
  assignedTo: LawyerTeamMember[];
}