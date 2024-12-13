// apps/web/i18n/types/shared/tables.d.ts

export interface TableColumnTranslations {
  records: {
    favorite: string;
    caseNumber: string;
    status: string;
    lawBranch: string;
    leadLawyer: string;
    dateCreated: string;
    plaintiff: string;
    defendant: string;
    client: string;
    stage: string;
    riskFactor: string;
    contingencyCost: string;
  };
  team: {
    name: string;
    role: string;
    specialization: string;
    availability: string;
    location: string;
    cases: string;
    experience: string;
  };
  documents: {
    name: string;
    type: string;
    size: string;
    lastModified: string;
    createdBy: string;
    status: string;
  };
}