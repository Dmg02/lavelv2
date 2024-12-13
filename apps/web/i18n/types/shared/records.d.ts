// apps/web/i18n/types/shared/records.d.ts

// Core record-related types
export type CaseStatusKey = 'active' | 'inactive' | 'pending' | 'closed';
export type LawBranchKey = 'labor' | 'civil' | 'commercial' | 'criminal' | 'corporate' | 'family';
export type RiskFactorKey = 'high' | 'medium' | 'low';
export type CaseStageKey = 'initial' | 'discovery' | 'trial' | 'appeal' | 'closed';

// Core record translations
export interface RecordTranslations {
  status: Record<CaseStatusKey, string>;
  lawBranch: Record<LawBranchKey, string>;
  riskFactor: Record<RiskFactorKey, string>;
  stage: Record<CaseStageKey, string>;
  
  labels: {
    // Case identification
    caseNumber: string;
    fileNumber: string;
    reference: string;
    
    // Parties
    plaintiff: string;
    defendant: string;
    client: string;
    corporation: string;
    
    // Case details
    typeOfTrial: string;
    relatedCase: string;
    summary: string;
    description: string;
    notes: string;
    
    // Financial
    contingencyCost: string;
    expenses: string;
    fees: string;
    budget: string;
  };
}