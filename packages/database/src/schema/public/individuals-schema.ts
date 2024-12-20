import { pgTable, varchar, timestamp, boolean, integer } from "drizzle-orm/pg-core"
import { sql } from "drizzle-orm"
import { relations } from "drizzle-orm"
import { trialEntities } from "./trials-entities-schema"

export const individuals = pgTable("individuals", {
	id: integer("id").primaryKey().generatedByDefaultAsIdentity({ name: "individuals_id_seq", startWith: 1, increment: 1, minValue: 1, maxValue: 2147483647, cache: 1 }),
	fullName: varchar("full_name").notNull(),
	createdAt: timestamp("created_at", { withTimezone: true, mode: 'string' }).default(sql`CURRENT_TIMESTAMP`).notNull(),
	updatedAt: timestamp("updated_at", { withTimezone: true, mode: 'string' }).default(sql`CURRENT_TIMESTAMP`).notNull(),
	isActive: boolean("is_active").default(true),
});

export const individualsRelations = relations(individuals, ({many}) => ({
	trialEntities: many(trialEntities),
}));

export type Individual = typeof individuals.$inferSelect;
export type NewIndividual = typeof individuals.$inferInsert;
