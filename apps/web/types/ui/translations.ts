// Table translations
export interface TableTranslations {
  columns: {
    caseNumber: string;
    status: string;
    stage: string;
    lawBranch: string;
    parties: string;
    courthouse: string;
    assignedTo: string;
    lastUpdated: string;
  };
}

// Mobile view translations
export interface MobileViewTranslations {
  sections: {
    parties: string;
    location: string;
    caseDetails: string;
    teamMembers: string;
  };
  labels: {
    vs: string;
    plaintiff: string;
    defendant: string;
    courthouse: string;
    city: string;
  };
}

// Combined translations for the records feature
export interface RecordsTranslations {
  table: TableTranslations;
  mobile: MobileViewTranslations;
}