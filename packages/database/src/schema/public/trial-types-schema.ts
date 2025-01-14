import { pgTable, varchar, text, timestamp, integer, foreignKey, pgSchema } from "drizzle-orm/pg-core";
import { sql } from "drizzle-orm";
import { relations } from "drizzle-orm/relations";
import { lawBranches } from "./law-branches-schema";
import { sharedTrials } from "./shared-trials-schema";
import { trialStages } from "./trial-stages-schema";

export const trialTypes = pgTable("trial_types", {
	id: integer("id").primaryKey().generatedByDefaultAsIdentity({ name: "trial_types_id_seq", startWith: 1, increment: 1, minValue: 1, maxValue: 2147483647, cache: 1 }),
	name: varchar("name").notNull(),
	description: text("description"),
	createdAt: timestamp("created_at", { withTimezone: true, mode: 'string' }).default(sql`CURRENT_TIMESTAMP`).notNull(),
	updatedAt: timestamp("updated_at", { withTimezone: true, mode: 'string' }).default(sql`(now() AT TIME ZONE 'utc'::text)`),
	lawBranchId: integer("law_branch_id"),
},
(table) => {
	return {
		trialTypesLawBranchIdFkey: foreignKey({
			columns: [table.lawBranchId],
			foreignColumns: [lawBranches.id],
			name: "trial_types_law_branch_id_fkey"
		}),
	}
});

export const trialTypesRelations = relations(trialTypes, ({one, many}) => ({
	trialStages: many(trialStages),
	sharedTrials: many(sharedTrials),
	lawBranch: one(lawBranches, {
		fields: [trialTypes.lawBranchId],
		references: [lawBranches.id]
	}),
}));

export type TrialType = typeof trialTypes.$inferSelect;
export type NewTrialType = typeof trialTypes.$inferInsert;
