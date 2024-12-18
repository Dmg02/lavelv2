// src/db/schema/auth-users.ts

import { pgSchema, uuid, varchar, timestamp } from 'drizzle-orm/pg-core';

// Define the 'auth' schema
const authSchema = pgSchema('auth');

// Define the 'users' table within the 'auth' schema
export const authUsers = authSchema.table(
  'users',
  {
    id: uuid('id').primaryKey(),
    email: varchar('email', { length: 255 }).notNull(),
    created_at: timestamp('created_at').defaultNow(),
    // Add other columns as needed
  },

);