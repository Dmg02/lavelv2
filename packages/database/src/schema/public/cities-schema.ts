import { pgTable, varchar, timestamp, integer, foreignKey, unique } from "drizzle-orm/pg-core";
import { relations, sql } from "drizzle-orm";
import { states } from "./states-schema";
import { courthouses } from "./courthouses-schema";
import { sharedTrials } from "./shared-trials-schema";
// Define the schema
// Use the schema to define the table
export const cities = pgTable("cities", {
	id: integer("id").primaryKey().generatedByDefaultAsIdentity({ name: "cities_id2_seq", startWith: 1, increment: 1, minValue: 1, maxValue: 2147483647, cache: 1 }),
	name: varchar("name").notNull(),
	createdAt: timestamp("created_at", { withTimezone: true, mode: 'string' }).default(sql`CURRENT_TIMESTAMP`).notNull(),
	updatedAt: timestamp("updated_at", { withTimezone: true, mode: 'string' }).default(sql`CURRENT_TIMESTAMP`).notNull(),
	stateId: integer("state_id"),
},
(table) => {
	return {
		citiesStateIdFkey: foreignKey({
			columns: [table.stateId],
			foreignColumns: [states.id],
			name: "cities_state_id_fkey"
		}),
		citiesNameKey: unique("cities_name_key").on(table.name),
		citiesId2Key: unique("cities_id2_key").on(table.id),
	}
});

export const citiesRelations = relations(cities, ({one, many}) => ({
	courthouses: many(courthouses),
	sharedTrials: many(sharedTrials),
	state: one(states, {
		fields: [cities.stateId],
		references: [states.id]
	}),
}));

export type City = typeof cities.$inferSelect;
export type NewCity = typeof cities.$inferInsert;
