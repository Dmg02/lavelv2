import { Lawyer, LawyerRole, LawyerAvatar } from '@/types/shared/lawyer';
import { LawBranch } from '@/types/shared/law-branch';

import { States, Cities } from '@/types/shared/location';

export const lawyers: Record<string, Lawyer> = {
  'L001': {
    id: 'L001',
    name: 'Carlos Rodríguez',
    avatar: LawyerAvatar.CARLOS,
    role: LawyerRole.PARTNER,
    specialization: LawBranch.CIVIL,
    city: Cities.CDMX,
    state: States.CDMX,
    active: true
  },
  'L002': {
    id: 'L002',
    name: 'Ana González',
    avatar: LawyerAvatar.ANA,
    role: LawyerRole.ASSOCIATE,
    specialization: LawBranch.CORPORATE,
    city: Cities.MON,
    state: States.NL,
    active: true
  },
  'L003': {
    id: 'L003',
    name: 'Miguel Ángel Torres',
    avatar: LawyerAvatar.MIGUEL,
    role: LawyerRole.PARTNER,
    specialization: LawBranch.CRIMINAL,
    city: 'Guadalajara',
    state: 'Jalisco',
    active: true
  },
  'L004': {
    id: 'L004',
    name: 'Laura Sánchez',
    avatar: LawyerAvatar.LAURA,
    role: LawyerRole.ASSOCIATE,
    specialization: LawBranch.FAMILY,
    city: Cities.CDMX,
    state: States.CDMX,
    active: true
  },
  'L005': {
    id: 'L005',
    name: 'Roberto Méndez',
    avatar: LawyerAvatar.ROBERTO,
    role: LawyerRole.PARALEGAL,
    specialization: LawBranch.ADMINISTRATIVE,
    city: Cities.PUE,
    state: States.PUE,
    active: true
  }
}; 