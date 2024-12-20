import { pgTable, varchar, timestamp, boolean, integer } from "drizzle-orm/pg-core"
import { sql } from "drizzle-orm"
import { relations } from "drizzle-orm/relations"
import { trialEntities } from "./trials-entities-schema"

export const companies = pgTable("companies", {
	id: integer("id").primaryKey().generatedByDefaultAsIdentity({ name: "companies_id_seq", startWith: 1, increment: 1, minValue: 1, maxValue: 2147483647, cache: 1 }),
	name: varchar("name").notNull(),
	createdAt: timestamp("created_at", { withTimezone: true, mode: 'string' }).default(sql`CURRENT_TIMESTAMP`).notNull(),
	updatedAt: timestamp("updated_at", { withTimezone: true, mode: 'string' }).default(sql`CURRENT_TIMESTAMP`).notNull(),
	isActive: boolean("is_active").default(true),
});

export const companiesRelations = relations(companies, ({many}) => ({
	trialEntities: many(trialEntities),
}));

export type Company = typeof companies.$inferSelect;
export type NewCompany = typeof companies.$inferInsert;
