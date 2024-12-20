import { pgTable, varchar, text, integer, timestamp, unique, pgSchema } from "drizzle-orm/pg-core"
import { sql } from "drizzle-orm"
import { relations } from "drizzle-orm"
import { trialTypes } from "./trial-types-schema"

export const trialStages = pgTable("trial_stages", {
	id: integer("id").primaryKey().generatedByDefaultAsIdentity({ name: "trial_stages_id_seq", startWith: 1, increment: 1, minValue: 1, maxValue: 2147483647, cache: 1 }),
	name: varchar("name").notNull(),
	description: text("description"),
	order: integer("order"),
	createdAt: timestamp("created_at", { withTimezone: true, mode: 'string' }).default(sql`CURRENT_TIMESTAMP`).notNull(),
	updatedAt: timestamp("updated_at", { withTimezone: true, mode: 'string' }).default(sql`(now() AT TIME ZONE 'utc'::text)`),
},
(table) => {
	return {
		trialStagesNameKey: unique("trial_stages_name_key").on(table.name),
	}
});

export const trialStagesRelations = relations(trialStages, ({many}) => ({
	trialTypes: many(trialTypes),
}));

export type TrialStage = typeof trialStages.$inferSelect;
export type NewTrialStage = typeof trialStages.$inferInsert;


