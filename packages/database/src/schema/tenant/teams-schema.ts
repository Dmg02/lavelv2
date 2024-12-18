import { pgSchema, pgTable } from "drizzle-orm/pg-core";
import { uuid, timestamp, text, foreignKey, varchar } from "drizzle-orm/pg-core";
import { sql } from "drizzle-orm";
import { relations } from "drizzle-orm";
import { profiles } from "./profiles-schema";
import { authUsers } from "./auth-schema";
// import { notifications } from "./notifications-schema";
import { cases } from "./case-schema";
import { teamMembers } from "./team-members-schema";

export const tenantSchema = pgSchema("tenant");

export const teams = pgTable("teams", {
    id: uuid("id").defaultRandom().primaryKey().notNull(),
    name: varchar("name", { length: 255 }).notNull(),
    description: text("description"),
    createdAt: timestamp("created_at", { withTimezone: true, mode: 'string' })
        .default(sql`CURRENT_TIMESTAMP`)
        .notNull(),
    updatedAt: timestamp("updated_at", { withTimezone: true, mode: 'string' }),
    deletedAt: timestamp("deleted_at", { withTimezone: true, mode: 'string' }),
	createdBy: uuid("created_by"),
    updatedBy: uuid("updated_by"),
    deletedBy: uuid("deleted_by")
},
(table) => {
    return {
        teamsCreatedByFkey: foreignKey({
            columns: [table.createdBy],
            foreignColumns: [authUsers.id],
            name: "teams_created_by_users_in_auth_id"
        }),
        teamsUpdatedByFkey: foreignKey({
            columns: [table.updatedBy],
            foreignColumns: [authUsers.id],
            name: "teams_updated_by_users_in_auth_id"
        }),
    }
});

export const teamsRelations = relations(teams, ({ one, many }) => ({
    cases: many(cases),
    teamMembers: many(teamMembers),
    // notifications: many(notifications),
    createdByUser: one(authUsers, {
        fields: [teams.createdBy],
        references: [authUsers.id],
        relationName: "teams_created_by"
    }),
    updatedByUser: one(authUsers, {
        fields: [teams.updatedBy],
        references: [authUsers.id],
        relationName: "teams_updated_by"
    })
}));

export type Team = typeof teams.$inferSelect;
export type InsertTeam = typeof teams.$inferInsert;