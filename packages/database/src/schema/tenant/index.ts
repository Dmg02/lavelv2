import { pgSchema } from 'drizzle-orm/pg-core';

// Create the schema reference
export const tenantSchema = pgSchema('tenant');
