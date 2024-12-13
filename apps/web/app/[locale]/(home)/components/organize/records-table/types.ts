export interface ColumnVisibility {
  favorite: boolean;
  caseNumber: boolean;
  status: boolean;
  stage: boolean;
  lawBranch: boolean;
  parties: boolean;
  courthouse: boolean;
  assignedTo: boolean;
}

export const defaultColumnVisibility: ColumnVisibility = {
  favorite: true,
  caseNumber: true,
  status: true,
  stage: true,
  lawBranch: true,
  parties: true,
  courthouse: true,
  assignedTo: true,
}; 
