import { pgSchema } from 'drizzle-orm/pg-core';

export * from './case-parties';
export * from './case-schema';
export * from './clients-schema';
export * from './corporations-schema';
export * from './court-participants';
export * from './events-schema';
export * from './litigation-details-schema';
export * from './profiles-schema';
export * from './team-members-schema';
export * from './teams-schema';

// Create the schema reference
export const tenantSchema = pgSchema('tenant');
