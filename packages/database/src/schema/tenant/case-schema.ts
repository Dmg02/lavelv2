import { pgTable, uuid, text, timestamp, integer, numeric, pgSchema, boolean, AnyPgColumn } from "drizzle-orm/pg-core";
import { profiles } from "./profiles-schema";
import { teams } from "./teams-schema";
import { relations } from "drizzle-orm";

// Create a dedicated schema namespace for tenant-specific tables
export const tenantSchema = pgSchema("tenant");

// Define the cases table with all its fields and relationships
export const cases = tenantSchema.table("cases", {
    // Core Identification
    // These fields uniquely identify and describe each case
    id: uuid('id').defaultRandom().primaryKey(),
    title: text('title').notNull(),
    description: text('description'),
    
    // Case Type and Status
    // Using TypeScript literal types for better type safety
    type: text('type').notNull().$type<'advisory' | 'litigation'>(),
    isActive: boolean('is_active').notNull().default(true),
    status: text('status').notNull().$type<'pending' | 'active' | 'closed' | 'archived'>(),
    
    // Self-referential relationship with explicit AnyPgColumn type
    originalCaseId: uuid('original_case_id')
        .references((): AnyPgColumn => cases.id, { onDelete: 'set null', onUpdate: 'set null' }),    
    relationshipType: text('relationship_type'),

    // Important Dates
    // Critical timestamps that track the case lifecycle
    startDate: timestamp('start_date').notNull(),
    estimatedEndDate: timestamp('estimated_end_date'),
    actualEndDate: timestamp('actual_end_date'),
    transformationDate: timestamp('transformation_date'),
    
    // Team and Responsibility
    // References to profiles and teams tables for assignment tracking
    leadAttorneyId: uuid('lead_attorney_id')
        .notNull()
        .references(() => profiles.id),
    assignedTeamId: uuid('assigned_team_id')
        .notNull()
        .references(() => teams.id),
    
    // Activity Tracking
    lastActivityAt: timestamp('last_activity_at').defaultNow().notNull(),
    lastActivityById: uuid('last_activity_by_id')
        .notNull()
        .references(() => profiles.id),
    lastActivityType: text('last_activity_type').notNull(),
    
    // Document Management Counters
    documentsCount: integer('documents_count').default(0),
    privateDocumentsCount: integer('private_documents_count').default(0),
    
    // Task Management Counters
    tasksCount: integer('tasks_count').default(0),
    pendingTasksCount: integer('pending_tasks_count').default(0),
    completedTasksCount: integer('completed_tasks_count').default(0),
    
    // Event Tracking
    eventsCount: integer('events_count').default(0),
    upcomingEventsCount: integer('upcoming_events_count').default(0),
    
    // Notes and Comments
    notesCount: integer('notes_count').default(0),
    privateNotesCount: integer('private_notes_count').default(0),
    lastNoteAt: timestamp('last_note_at'),
    lastNoteById: uuid('last_note_by_id')
        .references(() => profiles.id),
    commentsCount: integer('comments_count').default(0),
    unreadCommentsCount: integer('unread_comments_count').default(0),
    
    // Time Tracking
    // All numeric fields use precision of 10 and scale of 2 for consistent decimal handling
    totalBillableHours: numeric('total_billable_hours', { precision: 10, scale: 2 }).default('0'),
    totalNonBillableHours: numeric('total_non_billable_hours', { precision: 10, scale: 2 }).default('0'),
    totalHours: numeric('total_hours', { precision: 10, scale: 2 }).default('0'),
    totalTaskHours: numeric('total_task_hours', { precision: 10, scale: 2 }).default('0'),
    totalMeetingHours: numeric('total_meeting_hours', { precision: 10, scale: 2 }).default('0'),
    totalEmailHours: numeric('total_email_hours', { precision: 10, scale: 2 }).default('0'),
    totalPhoneHours: numeric('total_phone_hours', { precision: 10, scale: 2 }).default('0'),
    totalTravelHours: numeric('total_travel_hours', { precision: 10, scale: 2 }).default('0'),
    totalOtherHours: numeric('total_other_hours', { precision: 10, scale: 2 }).default('0'),

    // Media and Storage
    totalMediaCount: integer('total_media_count').default(0),
    totalMediaSize: integer('total_media_size').default(0), // in bytes
    
    // Audit Trail
    createdAt: timestamp('created_at').defaultNow().notNull(),
    updatedAt: timestamp('updated_at').defaultNow().notNull(),
    createdBy: uuid('created_by')
        .notNull()
        .references(() => profiles.id),
    updatedBy: uuid('updated_by')
        .notNull()
        .references(() => profiles.id),
    version: integer('version').default(1),
    deletedAt: timestamp('deleted_at')
});

// Define the TypeScript types for a Case
export type Case = typeof cases.$inferSelect;
export type NewCase = typeof cases.$inferInsert;

// Define the relationships between cases and other tables
// This provides type-safe access to related records
export const casesRelations = relations(cases, ({ one, many }) => ({
    // Self-referential relationships
    parentCase: one(cases),
    childCases: many(cases),
    
    // User relationships
    leadAttorney: one(profiles, {
        fields: [cases.leadAttorneyId],
        references: [profiles.id],
    }),
    assignedTeam: one(teams, {
        fields: [cases.assignedTeamId],
        references: [teams.id],
    }),
    lastActivityBy: one(profiles, {
        fields: [cases.lastActivityById],
        references: [profiles.id],
    }),
    lastNoteBy: one(profiles, {
        fields: [cases.lastNoteById],
        references: [profiles.id],
    }),
    createdByUser: one(profiles, {
        fields: [cases.createdBy],
        references: [profiles.id],
    }),
    updatedByUser: one(profiles, {
        fields: [cases.updatedBy],
        references: [profiles.id],
    })
}));