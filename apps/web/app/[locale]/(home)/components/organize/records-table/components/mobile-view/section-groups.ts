export const sections = [
  {
    title: 'Case Information',
    fields: [
      { key: 'caseNumber', label: 'Case Number' },
      { key: 'status', label: 'Status' },
      { key: 'stage', label: 'Stage' },
      { key: 'lawBranch', label: 'Law Branch' },
      { key: 'typeOfTrial', label: 'Type of Trial' },
      { key: 'totalHours', label: 'Total Hours' }
    ]
  },
  {
    title: 'Parties',
    fields: [
      { key: 'plaintiff', label: 'Plaintiff' },
      { key: 'defendant', label: 'Defendant' },
      { key: 'client', label: 'Client' },
      { key: 'corporation', label: 'Corporation' }
    ]
  },
  {
    title: 'Risk Assessment',
    fields: [
      { key: 'riskFactor', label: 'Risk Factor' },
      { key: 'contingencyCost', label: 'Contingency Cost' }
    ]
  },
  {
    title: 'Location',
    fields: [
      { key: 'courthouse', label: 'Courthouse' },
      { key: 'city', label: 'City' },
      { key: 'state', label: 'State' }
    ]
  }
] as const; 