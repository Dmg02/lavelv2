import { pgTable, varchar, timestamp, boolean, integer } from "drizzle-orm/pg-core"
import { sql } from "drizzle-orm"
import { relations } from "drizzle-orm"
import { trialEntities } from "./trials-entities-schema"

export const unions = pgTable("unions", {
	id: integer("id").primaryKey().generatedByDefaultAsIdentity({ name: "unions_id_seq", startWith: 1, increment: 1, minValue: 1, maxValue: 2147483647, cache: 1 }),
	name: varchar("name").notNull(),
	createdAt: timestamp("created_at", { withTimezone: true, mode: 'string' }).default(sql`CURRENT_TIMESTAMP`).notNull(),
	updatedAt: timestamp("updated_at", { withTimezone: true, mode: 'string' }).default(sql`CURRENT_TIMESTAMP`).notNull(),
	isActive: boolean("is_active").default(true),
});

export const unionsRelations = relations(unions, ({many}) => ({
	trialEntities: many(trialEntities),
}));

export type Union = typeof unions.$inferSelect;
export type NewUnion = typeof unions.$inferInsert;
