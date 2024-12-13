const LAWYER_AVATARS = {
  'Jorge Garcia': "https://images.unsplash.com/photo-1556157382-97eda2d62296?q=80&w=150&h=150&fit=crop",
  'Maria Rodriguez': "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=150&h=150&fit=crop",
  'Ana Martinez': "https://images.unsplash.com/photo-1614283233556-f35b0c801ef1?q=80&w=150&h=150&fit=crop",
  'Luis Sanchez': "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=150&h=150&fit=crop"
} as const;

export const recordsTableEs = {
  search: {
    placeholder: "Buscar casos...",
    filters: {
      title: "Filtros",
      clear: "Limpiar filtros",
      apply: "Aplicar filtros"
    },
  },
  groups: {
    coreInfo: "Información del Caso",
    parties: "Partes",
    legalTeam: "Equipo Legal",
    location: "Ubicación",
    riskFinancial: "Riesgo y Finanzas",
    related: "Info. Relacionada"
  },
  headers: {
    caseNumber: "Expediente",
    plaintiff: "Demandante",
    defendant: "Demandado",
    client: "Cliente",
    corporation: "Sociedad",
    lawBranch: "Rama Legal",
    relatedCase: "Asuntos Relacionados",
    status: "Status",
    totalHours: "Horas Totales",
    summary: "Resumen",
    leadLawyer: "Abogado Principal",
    dateCreated: "Fecha de Alta",
    courthouse: "Juzgado/Tribunal",
    state: "Estado",
    city: "Ciudad",
    riskFactor: "Factor de Riesgo",
    contingencyCost: "Contingencia",
    stage: "Etapa",
    typeOfTrial: "Tipo de Juicio",
    favorite: "Favorito"
  },
  riskFactors: {
    high: 'Alto',
    medium: 'Medio',
    low: 'Bajo',
  },
  mobile: {
    parties: "Partes",
    caseNumber: "Expediente",
    caseInfo: "Información del Caso",
    teamMembers: "Miembros del Equipo",
    plaintiff: "Demandante",
    defendant: "Demandado",
    client: "Cliente",
    corporation: "Sociedad",
    courthouse: "Juzgado/Tribunal",
    state: "Estado",
    city: "Ciudad",
    riskFactor: "Factor de Riesgo",
    contingencyCost: "Contingencia",
    stage: "Etapa",
    typeOfTrial: "Tipo de Juicio",
    relatedCase: "Asuntos Relacionados",
    summary: "Resumen",
    additionalInfo: "Información Adicional",
    location: "Ubicación",
    caseDetails: "Detalles del Caso",
    riskAndFinancial: "Riesgo y Finanzas"
  },
  types: {
    labor: "Laboral",
    civil: "Civil",
    commercial: "Mercantil",
    criminal: "Penal",
    corporate: "Corporativo",
    family: "Familiar"
  },
  status: {
    active: "Activo",
    inactive: "Inactivo"
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
      summary: "Caso de despido injustificado y discriminación relacionado con derechos de maternidad",
      courthouse: "Junta Federal de Conciliación y Arbitraje No. 2",
      leadLawyer: {
        id: "1",
        name: "Jorge Garcia",
        avatar: LAWYER_AVATARS['Jorge Garcia']
      },
      dateCreated: "2024-01-15",
      state: "Nuevo León",
      city: "Monterrey",
      riskFactor: "medium",
      contingencyCost: 180000,
      stage: "Desahogo de Pruebas",
      typeOfTrial: "Juicio Laboral Ordinario",
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
      status: "active",
      totalHours: 128,
      summary: "Disputa sobre permiso de uso de suelo para proyecto residencial",
      courthouse: "Tribunal Federal de Justicia Administrativa",
      leadLawyer: {
        id: "2",
        name: "Maria Rodriguez",
        avatar: LAWYER_AVATARS['Maria Rodriguez']
      },
      dateCreated: "2024-01-20",
      state: "Querétaro",
      city: "Querétaro",
      riskFactor: "high",
      contingencyCost: 4500000,
      stage: "Audiencia Inicial",
      typeOfTrial: "Procedimiento Administrativo",
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
      summary: "Incumplimiento de crédito comercial y recuperación de activos",
      courthouse: "Juzgado Primero de Distrito en Materia Civil",
      leadLawyer: {
        id: "3",
        name: "Ana Martinez",
        avatar: LAWYER_AVATARS['Ana Martinez']
      },
      dateCreated: "2024-02-01",
      state: "Ciudad de México",
      city: "Ciudad de México",
      riskFactor: "high",
      contingencyCost: 12000000,
      stage: "Presentación de Pruebas",
      typeOfTrial: "Juicio Ejecutivo Mercantil",
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
      summary: "Investigación de evasión fiscal y lavado de dinero involucrando empresa de transporte",
      courthouse: "Juzgado Tercero de Distrito en Materia Penal",
      leadLawyer: {
        id: "4",
        name: "Luis Sanchez",
        avatar: LAWYER_AVATARS['Luis Sanchez']
      },
      dateCreated: "2024-02-05",
      state: "Guanajuato",
      city: "León",
      riskFactor: "low",
      contingencyCost: 0,
      stage: "Juicio Oral",
      typeOfTrial: "Procedimiento Penal",
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
      summary: "Demanda por enfermedad laboral relacionada con operaciones mineras",
      courthouse: "Junta Especial de Conciliación y Arbitraje No. 3",
      leadLawyer: {
        id: "2",
        name: "Maria Rodriguez",
        avatar: LAWYER_AVATARS['Maria Rodriguez']
      },
      dateCreated: "2024-02-10",
      state: "Coahuila",
      city: "Torreón",
      riskFactor: "high",
      contingencyCost: 850000,
      stage: "Peritaje",
      typeOfTrial: "Procedimiento Laboral Especial",
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
      summary: "Rescisión de contrato de tiempo compartido y alegaciones de fraude",
      courthouse: "Juzgado Segundo Civil de Primera Instancia",
      leadLawyer: {
        id: "1",
        name: "Jorge Garcia",
        avatar: LAWYER_AVATARS['Jorge Garcia']
      },
      dateCreated: "2024-02-15",
      state: "Jalisco",
      city: "Puerto Vallarta",
      riskFactor: "medium",
      contingencyCost: 650000,
      stage: "Negociación de Acuerdo",
      typeOfTrial: "Juicio Civil Ordinario",
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