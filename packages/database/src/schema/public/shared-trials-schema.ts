import { pgTable, varchar, timestamp, boolean, integer } from "drizzle-orm/pg-core";
import { sql } from "drizzle-orm";
import { relations } from "drizzle-orm";
import { cities } from "./cities-schema";
import { courthouses } from "./courthouses-schema";
import { trialTypes } from "./trial-types-schema";
import { trialEntities } from "./trials-entities-schema";
import { publications } from "./publications-schema";

export const sharedTrials = pgTable("shared_trials", {
  id: integer("id").primaryKey().generatedByDefaultAsIdentity({ name: "shared_trials_id_seq", startWith: 1, increment: 1, minValue: 1, maxValue: 2147483647, cache: 1 }),
  caseNumber: varchar("case_number", { length: 255 }).notNull(),
  closingDate: timestamp("closing_date", { withTimezone: true, mode: 'string' }),
  isActive: boolean("is_active").default(true).notNull(),
  createdAt: timestamp("created_at", { withTimezone: true, mode: 'string' }).default(sql`CURRENT_TIMESTAMP`).notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true, mode: 'string' }).default(sql`CURRENT_TIMESTAMP`).notNull(),
  courthouseId: integer("courthouse_id").notNull(),
  trialTypeId: integer("trial_type_id").notNull(),
  cityId: integer("city_id").notNull(),
});

export const sharedTrialsRelations = relations(sharedTrials, ({ one, many }) => ({
  city: one(cities, {
    fields: [sharedTrials.cityId],
    references: [cities.id]
  }),
  courthouse: one(courthouses, {
    fields: [sharedTrials.courthouseId],
    references: [courthouses.id]
  }),
  trialType: one(trialTypes, {
    fields: [sharedTrials.trialTypeId],
    references: [trialTypes.id]
  }),
}));

export type SelectSharedTrial = typeof sharedTrials.$inferSelect;
export type InsertSharedTrial = typeof sharedTrials.$inferInsert;