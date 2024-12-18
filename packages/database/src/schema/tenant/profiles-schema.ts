import { pgTable, uuid, varchar, text, timestamp, boolean, foreignKey, unique, pgSchema, check } from "drizzle-orm/pg-core";
import { sql } from "drizzle-orm";
import { relations } from "drizzle-orm/relations";
import { authUsers } from "./auth-schema";
import { cases } from "./case-schema";
// import { attendees } from "./attendees-schema";
import { teamMembers } from "./team-members-schema";

export const tenantSchema = pgSchema("tenant");

export const profiles = tenantSchema.table("profiles", {
    // Identifiers
    id: uuid("id").defaultRandom().primaryKey().notNull(),
    userId: uuid("user_id").notNull(),
    
    // Profile information
    firstName: varchar("first_name", { length: 100 }).notNull(),
    lastName: varchar("last_name", { length: 100 }).notNull(),
    displayName: varchar("display_name", { length: 100 }).notNull(),
    email: text("email").notNull().unique(),
    phoneNumber: varchar("phone_number", { length: 50 }).unique().notNull(),

    // Profile settings
    timeZone: varchar("time_zone", { length: 50 }).notNull().default('UTC'),
    languagePreference: varchar("language_preference", { length: 50 }).notNull().default('es'),
    avatarUrl: varchar("avatar_url", { length: 500 }),
    
    // Organizational 
    legalExpertise: text('legal_expertise'), // Fixed typo in column name
    role: text("role"),
    isActive: boolean("is_active").default(true).notNull(),

    // Timestamps
    createdAt: timestamp("created_at", { withTimezone: true, mode: 'string' })
        .default(sql`CURRENT_TIMESTAMP`)
        .notNull(),
    updatedAt: timestamp("updated_at", { withTimezone: true, mode: 'string' })
        .default(sql`CURRENT_TIMESTAMP`)
        .notNull(),
    deletedAt: timestamp("deleted_at", { withTimezone: true, mode: 'string' }),
    createdBy: uuid("created_by"),
    updatedBy: uuid("updated_by"),
    deletedBy: uuid("deleted_by"),
},
(table) => {
    return {
        // Data validation checks
        emailCheck: check("email_check", 
            sql`email ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$'`),
        phoneCheck: check("phone_check", 
            sql`phone_number ~* '^[0-9]{10}$'`),
        
        // Foreign key constraints
        profilesCreatedByFkey: foreignKey({
            columns: [table.createdBy],
            foreignColumns: [authUsers.id],
            name: "profiles_created_by_users_in_auth_id"
        }),
        profilesUpdatedByFkey: foreignKey({
            columns: [table.updatedBy],
            foreignColumns: [authUsers.id],
            name: "profiles_updated_by_users_in_auth_id"
        }),
        profilesUserIdFkey: foreignKey({
            columns: [table.userId],
            foreignColumns: [authUsers.id],
            name: "profiles_user_id_users_in_auth_id"
        }),
        profilesUserIdKey: unique("profiles_user_id_key").on(table.userId),
    }
});

export const profilesRelations = relations(profiles, ({one, many}) => ({
    // User-related relations
    authUser: one(authUsers, {
        fields: [profiles.userId],
        references: [authUsers.id],
        relationName: "profiles_user_id_users_in_auth_id"
    }),
    
    // Team membership relation through junction table
    teamMembers: many(teamMembers, {
        relationName: "profile_team_memberships"
    }),
    
    // Audit trail relations
    createdByUser: one(authUsers, {
        fields: [profiles.createdBy],
        references: [authUsers.id],
        relationName: "profiles_created_by"
    }),
    updatedByUser: one(authUsers, {
        fields: [profiles.updatedBy],
        references: [authUsers.id],
        relationName: "profiles_updated_by"
    }),

    // Activity relations
    cases: many(cases, {
        relationName: "cases_updated_by_profiles_user_id"
    }),
        // attendees: many(attendees),
}));

export type Profile = typeof profiles.$inferSelect;
export type InsertProfile = typeof profiles.$inferInsert;