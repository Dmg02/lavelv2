export const Courthouses = {
  JFCA: 'Junta Federal de Conciliación y Arbitraje',
  TFL: 'Primer Tribunal Laboral Federal',
  JPDMCM: 'Juzgado Primero de Distrito en Materia de Concursos Mercantiles',
  JLCA: 'Juntal Local de Conciliación y Arbitraje de la Ciudad de México',
} as const;

export type Courthouses = typeof Courthouses[keyof typeof Courthouses];