import { lawyers } from '@/data/lawyers';
import { cases } from '@/data/cases';
import type { Case } from '@/types/shared/case';
import type { Lawyer } from '@/types/shared/lawyer';

export function getCasesData() {
  return {
    cases,
    lawyers
  };
}

export function getAssignedLawyers(caseData: Case): Lawyer[] {
  return caseData.assignedLawyerIds
    .map(id => lawyers[id])
    .filter((lawyer): lawyer is Lawyer => lawyer !== undefined);
}

export function getLeadLawyer(caseData: Case): Lawyer | undefined {
  return lawyers[caseData.leadLawyerId];
}

export function filterCasesByLawyer(lawyerId: string): Case[] {
  return cases.filter(caseData => 
    caseData.leadLawyerId === lawyerId || 
    caseData.assignedLawyerIds.includes(lawyerId)
  );
}

export function filterCasesByStatus(status: Case['status']): Case[] {
  return cases.filter(caseData => caseData.status === status);
}

export function filterCasesByStage(stage: Case['stage']): Case[] {
  return cases.filter(caseData => caseData.stage === stage);
}

export function filterCasesByLawBranch(lawBranch: Case['lawBranch']): Case[] {
  return cases.filter(caseData => caseData.lawBranch === lawBranch);
}

