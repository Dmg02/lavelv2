export const LawBranch = {
  CIVIL: 'Civil',
  CRIMINAL: 'Penal',
  FAMILY: 'Familiar',
  CORPORATE: 'Corporativo',
  ADMINISTRATIVE: 'Administrativo',
  LABOR: 'Laboral',
  INTELLECTUAL_PROPERTY: 'Propiedad Intelectual',
  TAX: 'Tributario',
  INTERNATIONAL: 'Internacional',
  ENVIRONMENTAL: 'Ambiental',
  CONSUMER: 'Consumidor',
  INTERNATIONAL_TRADE: 'Comercio Internacional'
} as const;

export type LawBranch = typeof LawBranch[keyof typeof LawBranch];
