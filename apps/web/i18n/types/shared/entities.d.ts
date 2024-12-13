export type AvatarKey = 'https://i.pravatar.cc/150?u=a1' | 'https://i.pravatar.cc/150?u=a2' | 'https://i.pravatar.cc/150?u=a3' | 'https://i.pravatar.cc/150?u=a4' | 'https://i.pravatar.cc/150?u=a5' | 'https://i.pravatar.cc/150?u=a6' | 'https://i.pravatar.cc/150?u=a7' | 'https://i.pravatar.cc/150?u=a8' | 'https://i.pravatar.cc/150?u=a9' | 'https://i.pravatar.cc/150?u=a10'

// Base person type used across the app
export interface LawyerBase {
  id: string;
  name: string;
  email: string;
  phone?: string;
  avatar?: AvatarKey;
  role: ProfessionalRoleKey;
  specialization: SpecializationKey;
}

// Base organization type
export interface OrganizationBase {
  id: string;
  name: string;
  type: 'client' | 'courthouse' | 'lawFirm';
  location?: {
    city: CityKey;
    state: StateKey;
  };
}

// Shared professional types
export type ProfessionalRoleKey = 'partner' | 'associate' | 'paralegal' | 'admin';
export type SpecializationKey = 'corporateLaw' | 'criminalLaw' | 'familyLaw' | 'taxLaw';


export interface EntityTranslations {
  roles: Record<ProfessionalRoleKey, string>;
  specializations: Record<SpecializationKey, string>;
  organizations: {
    types: {
      client: string;
      courthouse: string;
      lawFirm: string;
    };
  };
}