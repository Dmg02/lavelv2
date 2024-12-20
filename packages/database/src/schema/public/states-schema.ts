import { pgTable, text, timestamp, integer, unique, pgSchema } from "drizzle-orm/pg-core";
import { sql } from "drizzle-orm";
import { courthouses } from "./courthouses-schema";
import { cities } from "./cities-schema";
import { relations } from "drizzle-orm/relations";
		
export const states = pgTable("states", {
	id: integer("id").primaryKey().generatedByDefaultAsIdentity({ name: "states_id2_seq", startWith: 1, increment: 1, minValue: 1, maxValue: 2147483647, cache: 1 }),
	name: text("name").notNull(),
	createdAt: timestamp("created_at", { withTimezone: true, mode: 'string' }).default(sql`CURRENT_TIMESTAMP`).notNull(),
	updatedAt: timestamp("updated_at", { withTimezone: true, mode: 'string' }).default(sql`CURRENT_TIMESTAMP`).notNull(),
},
(table) => {
	return {
		statesNameKey: unique("states_name_key").on(table.name),
	}
});

export const statesRelations = relations(states, ({many}) => ({
	courthouses: many(courthouses),
	cities: many(cities),
}));

export type SelectState = typeof states.$inferSelect;
export type InsertState = typeof states.$inferInsert;