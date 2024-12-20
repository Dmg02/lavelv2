import { pgTable, varchar, timestamp, integer, unique } from "drizzle-orm/pg-core";
import { sql } from "drizzle-orm";
import { relations } from "drizzle-orm/relations";
import { trialEntities } from "./trials-entities-schema";

export const trialRoles = pgTable("trial_roles", {
	id: integer("id").primaryKey().generatedByDefaultAsIdentity({ name: "trial_roles_id_seq", startWith: 1, increment: 1, minValue: 1, maxValue: 2147483647, cache: 1 }),
	name: varchar("name", { length: 100 }).notNull(),
	description: varchar("description", { length: 255 }),
	createdAt: timestamp("created_at", { withTimezone: true, mode: 'string' }).default(sql`CURRENT_TIMESTAMP`).notNull(),
	updatedAt: timestamp("updated_at", { withTimezone: true, mode: 'string' }).default(sql`CURRENT_TIMESTAMP`).notNull(),
},
(table) => {
	return {
		trialRolesNameKey: unique("trial_roles_name_key").on(table.name),
	}
});

export const trialRolesRelations = relations(trialRoles, ({many}) => ({
	trialEntities: many(trialEntities),
}));

export type TrialRole = typeof trialRoles.$inferSelect;
export type NewTrialRole = typeof trialRoles.$inferInsert;
