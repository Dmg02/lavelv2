import { Cities, States } from './location';
import { LawBranch } from './law-branch';

export const LawyerRole = {
  PARTNER: 'Socio',
  ASSOCIATE: 'Asociado',
  PARALEGAL: 'Pasante'
} as const;

export const LawyerAvatar = {
  JORGE: 'https://i.pravatar.cc/150?u=a2',
  ANA: 'https://i.pravatar.cc/150?u=a3',
  CARLOS: 'https://i.pravatar.cc/150?u=a4',
  MIGUEL: 'https://i.pravatar.cc/150?u=a5',
  LAURA: 'https://i.pravatar.cc/150?u=a6',
  ROBERTO: 'https://i.pravatar.cc/150?u=a7'
} as const;

export type LawyerRole = typeof LawyerRole[keyof typeof LawyerRole];
export type LawyerAvatar = typeof LawyerAvatar[keyof typeof LawyerAvatar];

export interface Lawyer {
  id: string;
  name: string;
  avatar?: LawyerAvatar;
  role: LawyerRole;
  specialization: LawBranch;
  city: Cities;
  state: States;
  active: boolean;
} 