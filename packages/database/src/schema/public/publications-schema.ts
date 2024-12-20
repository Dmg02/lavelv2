import { pgTable, text, date, timestamp, foreignKey, integer } from "drizzle-orm/pg-core";
import { sharedTrials } from "./shared-trials-schema";
import { sql } from "drizzle-orm";
import { relations } from "drizzle-orm";

export const publications = pgTable("publications", {
	id: integer("id").primaryKey().generatedByDefaultAsIdentity({ name: "publications_id_seq", startWith: 1, increment: 1, minValue: 1, maxValue: 2147483647, cache: 1 }),
	sharedTrialId: integer("shared_trial_id").notNull(),
	publicationDate: date("publication_date"),
	agreementDate: date("agreement_date"),
	summary: text("summary"),
	createdAt: timestamp("created_at", { withTimezone: true, mode: 'string' }).default(sql`CURRENT_TIMESTAMP`).notNull(),
},
(table) => {
	return {
		publicationsSharedTrialIdFkey: foreignKey({
			columns: [table.sharedTrialId],
			foreignColumns: [sharedTrials.id],
			name: "publications_shared_trial_id_fkey"
		}),
	}
});


export const publicationsRelations = relations(publications, ({one, many}) => ({
	sharedTrial: one(sharedTrials, {
		fields: [publications.sharedTrialId],
		references: [sharedTrials.id]
	}),
}));

export type Publication = typeof publications.$inferSelect;
export type NewPublication = typeof publications.$inferInsert;
