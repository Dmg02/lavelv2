// apps/web/i18n/types/shared/team-member.d.ts

// Define possible values as union types
export type LawyerRole = 'partner' | 'associate' | 'paralegal';
export type LawyerSpecialization = 'corporateLaw' | 'criminalLaw' | 'familyLaw' | 'intellectualProperty' | 'realEstate' | 'taxLaw';
export type LawyerAvailability = 'available' | 'inCourt' | 'onLeave';
export type CityLocation = 'mexicoCity' | 'monterrey' | 'cancun';

export interface TeamMemberTranslations {
  labels: {
    role: {
      partner: string;
      associate: string;
      paralegal: string;
    };
    availability: {
      available: string;
      inCourt: string;
      onLeave: string;
    };
    specialization: {
      corporateLaw: string;
      criminalLaw: string;
      familyLaw: string;
      intellectualProperty: string;
      realEstate: string;
      taxLaw: string;
    };
    location: {
      mexicoCity: string;
      monterrey: string;
      cancun: string;
    };
    sectionTitle: string;
    contactButton: string;
    viewProfile: string;
  }
}

export interface LawyerTeamMember {
  id: string;
  name: string;
  role: LawyerRole;
  avatar: string;
  email: string;
  phoneNumber: string;
  specialization: LawyerSpecialization;
  officeLocation: CityLocation;
  availability: LawyerAvailability;
}