import { pgTable, uuid, text, timestamp, date, numeric, boolean, pgSchema, AnyPgColumn } from 'drizzle-orm/pg-core';
import { cases } from './case-schema';
import { profiles } from './profiles-schema';
import { relations } from 'drizzle-orm';

export const tenantSchema = pgSchema("tenant");

export const litigationDetails = tenantSchema.table("litigation_details", {
    // Core identification
    id: uuid('id').defaultRandom().primaryKey(),
    caseId: uuid('case_id')
        .notNull()
        .references(() => cases.id),
        
    // Court and filing information
    courtName: text('court_name').notNull(),        // Name of the court
    courtDistrict: text('court_district'),          // Judicial district
    courtRoom: text('court_room'),                  // Specific courtroom or chamber
    filingNumber: text('filing_number'),            // Court's case number
    jurisdiction: text('jurisdiction').notNull(),    // Territorial jurisdiction
    
    // Judicial officers
    judgeName: text('judge_name'),                  // Current judge
    courtClerk: text('court_clerk'),                // Court clerk/secretary
    
    // Critical dates
    filingDate: timestamp('filing_date'),           // When case was filed
    admissionDate: timestamp('admission_date'),     // When court accepted case
    serviceDate: timestamp('service_date'),         // When defendants were served
    firstHearingDate: timestamp('first_hearing_date'),
    nextHearingDate: timestamp('next_hearing_date'),
    
    // Procedural information
    proceedingType: text('proceeding_type').notNull(),  // Type of legal proceeding
    currentStage: text('current_stage').notNull(),      // Current stage in process
    
    // Related proceedings with explicit AnyPgColumn type
    parentProceedingId: uuid('parent_proceeding_id')
        .references((): AnyPgColumn => litigationDetails.id, { onDelete: 'set null' }),
    relationshipType: text('relationship_type'),         // How it relates to parent
    
    // Financial tracking
    claimAmount: numeric('claim_amount', { precision: 15, scale: 2 }), // Amount in dispute
    courtFees: numeric('court_fees', { precision: 10, scale: 2 }),     // Fees paid to court
    
    // Counter columns for performance
    hearingsCount: numeric('hearings_count').default('0'),
    motionsCount: numeric('motions_count').default('0'),
    submissionsCount: numeric('submissions_count').default('0'),
    evidenceCount: numeric('evidence_count').default('0'),
    
    // Status flags
    hasInjunction: boolean('has_injunction').default(false),    // Temporary orders
    isAppealable: boolean('is_appealable').default(true),       // Can be appealed
    isUnderAppeal: boolean('is_under_appeal').default(false),   // Currently appealed
    
    // Important deadlines
    nextDeadline: timestamp('next_deadline'),
    responseDeadline: timestamp('response_deadline'),
    appealDeadline: timestamp('appeal_deadline'),
    
    // Court requirements
    specialInstructions: text('special_instructions'),  // Court's specific requirements
    requiredDocuments: text('required_documents'),      // Documents needed by court
    
    // Time tracking specific to court
    totalCourtHours: numeric('total_court_hours', { precision: 10, scale: 2 }).default('0'),
    totalPreparationHours: numeric('total_preparation_hours', { precision: 10, scale: 2 }).default('0'),
    
    // Audit trail
    createdAt: timestamp('created_at').defaultNow().notNull(),
    updatedAt: timestamp('updated_at').defaultNow().notNull(),
    createdBy: uuid('created_by').notNull().references(() => profiles.id),
    updatedBy: uuid('updated_by').notNull().references(() => profiles.id),
    version: numeric('version').default('1')
});

// Define the relationships
export const litigationDetailsRelations = relations(litigationDetails, ({ one, many }) => ({
    // Self-referential relationships
    parentProceeding: one(litigationDetails),
    childProceedings: many(litigationDetails),
    
    // Other relationships
    case: one(cases, {
        fields: [litigationDetails.caseId],
        references: [cases.id],
    }),
    createdByUser: one(profiles, {
        fields: [litigationDetails.createdBy],
        references: [profiles.id],
    }),
    updatedByUser: one(profiles, {
        fields: [litigationDetails.updatedBy],
        references: [profiles.id],
    })
}));

// Type definitions for TypeScript
export type LitigationDetail = typeof litigationDetails.$inferSelect;
export type NewLitigationDetail = typeof litigationDetails.$inferInsert;