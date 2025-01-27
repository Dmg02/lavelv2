const LAWYER_AVATARS = {
  'Jorge Garcia': "https://images.unsplash.com/photo-1556157382-97eda2d62296?q=80&w=150&h=150&fit=crop",
  'Maria Rodriguez': "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=150&h=150&fit=crop",
  'Ana Martinez': "https://images.unsplash.com/photo-1614283233556-f35b0c801ef1?q=80&w=150&h=150&fit=crop",
  'Luis Sanchez': "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=150&h=150&fit=crop"
} as const;

export const recordsTableEn = {
  search: {
    placeholder: "Search cases...",
    filters: {
      title: "Filters",
      clear: "Clear filters",
      apply: "Apply filters"
    },
  },
  groups: {
    coreInfo: "Case Information",
    parties: "Parties",
    legalTeam: "Legal Team",
    location: "Location",
    riskFinancial: "Risk & Financial",
    related: "Related Info"
  },
  headers: {
    caseNumber: "Case Number",
    plaintiff: "Plaintiff",
    defendant: "Defendant",
    client: "Client",
    corporation: "Corporation",
    lawBranch: "Law Branch",
    relatedCase: "Related Case",
    status: "Status",
    totalHours: "Total Hours",
    summary: "Summary",
    leadLawyer: "Lead Lawyer",
    dateCreated: "Date Created",
    courthouse: "Courthouse",
    state: "State",
    city: "City",
    riskFactor: "Risk Factor",
    contingencyCost: "Contingency Cost",
    stage: "Stage",
    typeOfTrial: "Type of Trial",
    favorite: "Favorite"
  },
  riskFactors: {
    high: 'High',
    medium: 'Medium',
    low: 'Low',
  },
  mobile: {
    parties: "Parties",
    caseNumber: "Case Number",
    caseInfo: "Case Information",
    teamMembers: "Team Members",
    plaintiff: "Plaintiff",
    defendant: "Defendant",
    client: "Client",
    corporation: "Corporation",
    courthouse: "Courthouse",
    state: "State",
    city: "City",
    riskFactor: "Risk Factor",
    contingencyCost: "Contingency Cost",
    stage: "Stage",
    typeOfTrial: "Type of Trial",
    relatedCase: "Related Case",
    summary: "Summary",
    additionalInfo: "Additional Information",
    location: "Location",
    caseDetails: "Case Details",
    riskAndFinancial: "Risk & Financial"
  },
  types: {
    labor: "Labor",
    civil: "Civil",
    commercial: "Commercial",
    criminal: "Criminal",
    corporate: "Corporate",
    family: "Family"
  },
  status: {
    active: "Active",
    inactive: "Inactive"
  },
  demoData: [
    {
      id: "1",
      caseNumber: "2024-001",
      plaintiff: "Claudia Perdomo Tovar",
      defendant: "Grupo Industrial Maseca S.A.B.",
      client: "Claudia Perdomo Tovar",
      corporation: "GRUMA",
      lawBranch: "labor",
      relatedCase: "2023-045",
      status: "active",
      totalHours: 45,
      summary: "Wrongful termination and discrimination case involving maternity leave rights",
      courthouse: "Junta Federal de Conciliación y Arbitraje No. 2",
      leadLawyer: {
        id: "1",
        name: "Jorge Garcia",
        avatar: LAWYER_AVATARS['Jorge Garcia']
      },
      dateCreated: "2024-01-15",
      state: "Nuevo León",
      city: "Monterrey",
      riskFactor: "Medium",
      contingencyCost: 180000,
      stage: "Discovery",
      typeOfTrial: "Ordinary Labor Trial",
      favorite: true,
      assignedTo: [
        {
          id: "1",
          name: "Jorge Garcia",
          avatar: LAWYER_AVATARS['Jorge Garcia']
        },
        {
          id: "2",
          name: "Maria Rodriguez",
          avatar: LAWYER_AVATARS['Maria Rodriguez']
        }
      ]
    },
    {
      id: "2",
      caseNumber: "2024-002",
      plaintiff: "Desarrolladora Homex S.A.B.",
      defendant: "Municipio de Querétaro",
      client: "Desarrolladora Homex",
      corporation: "Homex",
      lawBranch: "administrative",
      relatedCase: "2023-098",
      status: "inactive",
      totalHours: 128,
      summary: "Land use permit dispute for residential development project",
      courthouse: "Tribunal Federal de Justicia Administrativa",
      leadLawyer: {
        id: "2",
        name: "Maria Rodriguez",
        avatar: LAWYER_AVATARS['Maria Rodriguez']
      },
      dateCreated: "2024-01-20",
      state: "Querétaro",
      city: "Querétaro",
      riskFactor: "High",
      contingencyCost: 4500000,
      stage: "Initial Hearing",
      typeOfTrial: "Administrative Proceeding",
      favorite: false,
      assignedTo: [
        {
          id: "2",
          name: "Maria Rodriguez",
          avatar: LAWYER_AVATARS['Maria Rodriguez']
        }
      ]
    },
    {
      id: "3",
      caseNumber: "2024-003",
      plaintiff: "Banco Santander México",
      defendant: "Grupo Comercial La Comer S.A.B.",
      client: "Banco Santander México",
      corporation: "Santander",
      lawBranch: "commercial",
      relatedCase: "2023-156",
      status: "active",
      totalHours: 165,
      summary: "Commercial loan default and asset recovery case",
      courthouse: "Juzgado Primero de Distrito en Materia Civil",
      leadLawyer: {
        id: "3",
        name: "Ana Martinez",
        avatar: LAWYER_AVATARS['Ana Martinez']
      },
      dateCreated: "2024-02-01",
      state: "Ciudad de México",
      city: "Ciudad de México",
      riskFactor: "Critical",
      contingencyCost: 12000000,
      stage: "Evidence Presentation",
      typeOfTrial: "Commercial Executive Trial",
      favorite: true,
      assignedTo: [
        {
          id: "3",
          name: "Ana Martinez",
          avatar: LAWYER_AVATARS['Ana Martinez']
        },
        {
          id: "1",
          name: "Jorge Garcia",
          avatar: LAWYER_AVATARS['Jorge Garcia']
        }
      ]
    },
    {
      id: "4",
      caseNumber: "2024-004",
      plaintiff: "Fiscalía General de la República",
      defendant: "Roberto Alcántara Rojas",
      client: "Estado Mexicano",
      corporation: "Grupo IAMSA",
      lawBranch: "criminal",
      relatedCase: "2023-089",
      status: "active",
      totalHours: 320,
      summary: "Tax evasion and money laundering investigation involving transportation company",
      courthouse: "Juzgado Tercero de Distrito en Materia Penal",
      leadLawyer: {
        id: "4",
        name: "Luis Sanchez",
        avatar: LAWYER_AVATARS['Luis Sanchez']
      },
      dateCreated: "2024-02-05",
      state: "Guanajuato",
      city: "León",
      riskFactor: "High",
      contingencyCost: 0,
      stage: "Trial",
      typeOfTrial: "Criminal Procedure",
      favorite: false,
      assignedTo: [
        {
          id: "4",
          name: "Luis Sanchez",
          avatar: LAWYER_AVATARS['Luis Sanchez']
        }
      ]
    },
    {
      id: "5",
      caseNumber: "2024-005",
      plaintiff: "María González Ortiz",
      defendant: "Industrias Peñoles S.A.B.",
      client: "María González Ortiz",
      corporation: "Peñoles",
      lawBranch: "labor",
      relatedCase: "2023-201",
      status: "inactive",
      totalHours: 95,
      summary: "Occupational illness claim related to mining operations",
      courthouse: "Junta Especial de Conciliación y Arbitraje No. 3",
      leadLawyer: {
        id: "2",
        name: "Maria Rodriguez",
        avatar: LAWYER_AVATARS['Maria Rodriguez']
      },
      dateCreated: "2024-02-10",
      state: "Coahuila",
      city: "Torreón",
      riskFactor: "High",
      contingencyCost: 850000,
      stage: "Expert Testimony",
      typeOfTrial: "Special Labor Proceeding",
      favorite: true,
      assignedTo: [
        {
          id: "2",
          name: "Maria Rodriguez",
          avatar: LAWYER_AVATARS['Maria Rodriguez']
        },
        {
          id: "3",
          name: "Ana Martinez",
          avatar: LAWYER_AVATARS['Ana Martinez']
        }
      ]
    },
    {
      id: "6",
      caseNumber: "2024-006",
      plaintiff: "Francisco Torres Medina",
      defendant: "Grupo Vidanta",
      client: "Francisco Torres Medina",
      corporation: "Vidanta",
      lawBranch: "civil",
      relatedCase: "2023-178",
      status: "inactive",
      totalHours: 142,
      summary: "Timeshare contract rescission and fraud allegations",
      courthouse: "Juzgado Segundo Civil de Primera Instancia",
      leadLawyer: {
        id: "1",
        name: "Jorge Garcia",
        avatar: LAWYER_AVATARS['Jorge Garcia']
      },
      dateCreated: "2024-02-15",
      state: "Jalisco",
      city: "Puerto Vallarta",
      riskFactor: "Medium",
      contingencyCost: 650000,
      stage: "Settlement Negotiations",
      typeOfTrial: "Ordinary Civil Trial",
      favorite: false,
      assignedTo: [
        {
          id: "1",
          name: "Jorge Garcia",
          avatar: LAWYER_AVATARS['Jorge Garcia']
        }
      ]
    }
  ]
} as const;