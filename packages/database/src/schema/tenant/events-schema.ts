import { pgSchema, pgTable, timestamp, uuid, foreignKey, index, jsonb, varchar, text, boolean, pgEnum } from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";
import { sql } from "drizzle-orm";
import { attendees } from "./attendees-schema";
import { cases } from "./case-schema";
import { profiles } from "./profiles-schema";
import { authUsers } from "./auth-schema";

export const tenantSchema = pgSchema("tenant");

export const eventStatus = tenantSchema.enum("event_status", ['confirmed', 'tentative', 'cancelled']);
export const eventType = tenantSchema.enum("event_type", ['hearing', 'appointment', 'call', 'meeting', 'other']);

export const events = tenantSchema.table("events", {
  id: uuid("id").defaultRandom().primaryKey().notNull(),
  title: varchar("title", { length: 255 }).notNull(),
  description: text("description"),
  startTime: timestamp("start_time", { withTimezone: true }).notNull(),
  endTime: timestamp("end_time", { withTimezone: true }).notNull(),
  isAllDay: boolean("is_all_day").default(false).notNull(),
  location: varchar("location", { length: 255 }),
  createdAt: timestamp("created_at", { withTimezone: true }).default(sql`CURRENT_TIMESTAMP`).notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true }),
  status: eventStatus("status").default('confirmed').notNull(),
  recurrenceRule: text("recurrence_rule"),
  organizerId: uuid("organizer_id").notNull(),
  timezone: varchar("timezone", { length: 50 }).default('UTC').notNull(),
  color: varchar("color", { length: 7 }),
  metadata: jsonb("metadata"),
  caseId: uuid("case_id"),
  eventType: eventType("event_type").default('appointment').notNull(),
  createdBy: uuid("created_by").notNull(),
  updatedBy: uuid("updated_by").notNull(),
},
(table) => {
  return {
    idxEventsEndTime: index("idx_events_end_time").using("btree", table.endTime.asc().nullsLast()),
    idxEventsOrganizerId: index("idx_events_organizer_id").using("btree", table.organizerId.asc().nullsLast()),
    idxEventsStartTime: index("idx_events_start_time").using("btree", table.startTime.asc().nullsLast()),
    fkEventsCase: foreignKey({
      columns: [table.caseId],
      foreignColumns: [cases.id],
      name: "fk_events_case"
    }).onDelete("set null"),
    fkEventsCreatedBy: foreignKey({
      columns: [table.createdBy],
      foreignColumns: [authUsers.id],
      name: "fk_events_created_by"
    }).onDelete("cascade"),
    fkEventsUpdatedBy: foreignKey({
      columns: [table.updatedBy],
      foreignColumns: [authUsers.id],
      name: "fk_events_updated_by"
    })
  };
});

export const eventsRelations = relations(events, ({ one, many }) => ({
  attendees: many(attendees),
  createdBy: one(profiles, {
    fields: [events.createdBy],
    references: [profiles.id]
  }),
  updatedBy: one(profiles, {
    fields: [events.updatedBy],
    references: [profiles.id]
  }),
}));

export type SelectEvent = typeof events.$inferSelect;
export type InsertEvent = typeof events.$inferInsert;
