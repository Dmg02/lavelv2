import 'server-only';
import { env } from '@repo/env';
import { createClient } from '@supabase/supabase-js';
import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';

if (!env.DATABASE_URL) {
  throw new Error('DATABASE_URL is not defined');
}

if (!env.SUPABASE_URL || !env.SUPABASE_KEY) {
  throw new Error('Supabase credentials are not defined');
}

// Create Postgres client with prepare disabled for Supabase pooling
const client = postgres(env.DATABASE_URL);

// Create Supabase client (if needed for auth/storage)
export const supabase = createClient(env.SUPABASE_URL, env.SUPABASE_KEY);

// Initialize Drizzle with schema
export const db = drizzle({ client });

// Export all schema definitions
export * from './src/schema';
