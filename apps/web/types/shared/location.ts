export const States = {
  CDMX: 'Ciudad de México',
  MEX: 'Estado de México',
  QRO: 'Quintana Roo',
  GRO: 'Guerrero',
  PUE: 'Puebla',
  TLA: 'Tlaxcala',
  GDL: 'Guadalajara',
  MON: 'Monterrey',
  MTY: 'Monterrey',
  JAL: 'Jalisco',
  HID: 'Hidalgo',
  TOL: 'Toluca',
  ACA: 'Acapulco',
  CUN: 'Cancún',
  NL: 'Nuevo León',
} as const;

export type States = typeof States[keyof typeof States];

export const Cities = {
  CDMX: 'Ciudad de México',
  TOL: 'Toluca',
  ACA: 'Acapulco',
  CUN: 'Cancún',
  MEX: 'Estado de México',
  PUE: 'Puebla',
  TLA: 'Tlaxcala',
  GDL: 'Guadalajara',
  MON: 'Monterrey',
  MTY: 'Monterrey',
} as const;

export type Cities = typeof Cities[keyof typeof Cities];