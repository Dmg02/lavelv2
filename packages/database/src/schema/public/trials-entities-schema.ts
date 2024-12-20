import { pgTable, timestamp, boolean, integer, foreignKey } from "drizzle-orm/pg-core"
import { sql } from "drizzle-orm"
import { relations } from "drizzle-orm/relations"
import { companies } from "./companies-schema";
import { individuals } from "./individuals-schema";
import { sharedTrials } from "./shared-trials-schema";
import { trialRoles } from "./trials-roles-schema";
import { unions } from "./unions-schema";
		
export const trialEntities = pgTable("trial_entities", {
	id: integer("id").primaryKey().generatedByDefaultAsIdentity({ name: "trial_entities_id_seq", startWith: 1, increment: 1, minValue: 1, maxValue: 2147483647, cache: 1 }),
	sharedTrialId: integer("shared_trial_id").notNull(),
	individualId: integer("individual_id"),
	companyId: integer("company_id"),
	unionId: integer("union_id"),
	createdAt: timestamp("created_at", { withTimezone: true, mode: 'string' }).default(sql`CURRENT_TIMESTAMP`).notNull(),
	updatedAt: timestamp("updated_at", { withTimezone: true, mode: 'string' }),
	isReserved: boolean("is_reserved").default(false).notNull(),
	isActive: boolean("is_active").default(true).notNull(),
	trialRoleId: integer("trial_role_id"),
},
(table) => {
	return {
		trialEntitiesCompanyIdFkey: foreignKey({
			columns: [table.companyId],
			foreignColumns: [companies.id],
			name: "trial_entities_company_id_fkey"
		}),
		trialEntitiesIndividualIdFkey: foreignKey({
			columns: [table.individualId],
			foreignColumns: [individuals.id],
			name: "trial_entities_individual_id_fkey"
		}),
		trialEntitiesSharedTrialIdFkey: foreignKey({
			columns: [table.sharedTrialId],
			foreignColumns: [sharedTrials.id],
			name: "trial_entities_shared_trial_id_fkey"
		}),
		trialEntitiesTrialRoleIdFkey: foreignKey({
			columns: [table.trialRoleId],
			foreignColumns: [trialRoles.id],
			name: "trial_entities_trial_role_id_fkey"
		}),
		trialEntitiesUnionIdFkey: foreignKey({
			columns: [table.unionId],
			foreignColumns: [unions.id],
			name: "trial_entities_union_id_fkey"
		}),
	}
});

export const trialEntitiesRelations = relations(trialEntities, ({one}) => ({
	company: one(companies, {
		fields: [trialEntities.companyId],
		references: [companies.id]
	}),
	individual: one(individuals, {
		fields: [trialEntities.individualId],
		references: [individuals.id]
	}),
	sharedTrial: one(sharedTrials, {
		fields: [trialEntities.sharedTrialId],
		references: [sharedTrials.id]
	}),
	trialRole: one(trialRoles, {
		fields: [trialEntities.trialRoleId],
		references: [trialRoles.id]
	}),
	union: one(unions, {
		fields: [trialEntities.unionId],
		references: [unions.id]
	}),
}));

export type TrialEntity = typeof trialEntities.$inferSelect;
export type NewTrialEntity = typeof trialEntities.$inferInsert;
